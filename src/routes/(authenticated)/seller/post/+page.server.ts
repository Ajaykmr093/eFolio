import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';
import { SellerBookPostSchema } from './schema';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { db } from '$lib/surreal';
import type { Book } from '$lib/schema/book';
import { unlink } from 'fs/promises';
import { redirect } from '@sveltejs/kit';

export const load = (async () => {
  return { form: await superValidate(zod(SellerBookPostSchema)) };
}) satisfies PageServerLoad;

export const actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, zod(SellerBookPostSchema));

    if (!form.valid) {
      return fail(400, { form });
    }

    let coverPath;
    let bookPath;

    try {
      coverPath = `uploads/covers/${crypto.randomUUID()}.${form.data.cover.name.split('.').pop()}`;
      const coverBuffer = await form.data.cover.arrayBuffer();
      await Bun.write(coverPath, coverBuffer);

      bookPath = `uploads/books/${crypto.randomUUID()}.${form.data.book.name.split('.').pop()}`;
      const bookBuffer = await form.data.book.arrayBuffer();
      await Bun.write(bookPath, bookBuffer);

      const book: Book = {
        title: form.data.title,
        description: form.data.description,
        publish_date: form.data.publishDate,
        cover_url: coverPath
      };

      const sell = {
        price: form.data.price,
        discount: form.data.discount,
        book_url: bookPath
      };

      const st = `
        {
          let $book = create only book content {
            title: $bookInfo.title,
            description: $bookInfo.description,
            publish_date: $bookInfo.publish_date,
            cover_url: $bookInfo.cover_url
          };

          let $bookRecord = $book.id;
          let $sellerRecord = $auth.seller_id;

          let $sellRecord = relate only $sellerRecord->sell->$bookRecord CONTENT {
              price: $sellInfo.price,
              discount: $sellInfo.discount,
              book_url: $sellInfo.book_url,
              in: $sellerRecord,
              out: $bookRecord
          };

          return None;
        };
      `;
      const vars = { bookInfo: book, sellInfo: sell };
      await db.query(st, vars);
      return redirect(303, '/seller');
    } catch (err) {
      console.error(err);
      console.log('Failed to post book.');
      if (coverPath) await unlink(coverPath);
      if (bookPath) await unlink(bookPath);
      return message(form, 'Somthing went wrong.', { status: 500 });
    }
  }
};
