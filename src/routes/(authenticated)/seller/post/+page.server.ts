import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';
import { SellerBookPostSchema } from './schema';
import { fail, superValidate, withFiles } from 'sveltekit-superforms';
import { db } from '$lib/server/surreal';
import type { Book } from '$lib/schema/book';
import { unlink } from 'fs/promises';
import { redirect } from '@sveltejs/kit';

export const load = (async () => {
  return {
    form: await superValidate(zod(SellerBookPostSchema))
  };
}) satisfies PageServerLoad;

export const actions = {
  default: async ({ request, locals }) => {
    const form = await superValidate(request, zod(SellerBookPostSchema));

    if (!form.valid) {
      return fail(400, { form });
    }

    const coverPath = `uploads/covers/${form.data.cover.name}`;
    const coverBuffer = await form.data.cover.arrayBuffer();
    await Bun.write(coverPath, coverBuffer);

    const bookPath = `uploads/books/${form.data.book.name}`;
    const bookBuffer = await form.data.book.arrayBuffer();
    await Bun.write(bookPath, bookBuffer);

    const book: Book = {
      title: form.data.title,
      description: form.data.description,
      publishDate: form.data.publishDate,
      cover: {
        medium: coverPath
      }
    };

    try {
      const st = `
        {
          LET $bookRecord = CREATE ONLY book CONTENT {
            title: $book.title,
            description: $book.description,
            publish_date: $book.publishDate,
            cover: $book.cover
          };
          relate $seller->sell->$bookRecord CONTENT {
            price: $price,
            discount: $discount,
            book_url: $bookUrl,
            in: $seller,
            out: $bookRecord.id
          };
          return true;
        };
        `;

      const vars = {
        book,
        seller: locals.user?.seller_id,
        price: form.data.price,
        discount: form.data.discount / 100,
        bookUrl: bookPath
      };

      console.log(vars);

      await db.query<[boolean]>(st, vars);
    } catch (err) {
      console.error(err);
      console.log('Failed to create post.');
      await unlink(coverPath);
      await unlink(bookPath);
      return withFiles({ form });
    }

    return redirect(302, '/seller');
  }
};
