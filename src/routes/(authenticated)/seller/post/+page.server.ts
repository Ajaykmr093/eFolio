import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';
import { SellerBookPostSchema } from './schema';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { db } from '$lib/surreal';
import type { Book } from '$lib/schema/book';
import { unlink } from 'fs/promises';
import { isRedirect, redirect } from '@sveltejs/kit';

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
    let sampleBookPath;

    try {
      coverPath = `uploads/covers/${crypto.randomUUID()}.${form.data.cover.name.split('.').pop()}`;
      const coverBuffer = await form.data.cover.arrayBuffer();
      await Bun.write(coverPath, coverBuffer);

      sampleBookPath = `uploads/samples/${crypto.randomUUID()}.${form.data.sample_book.name.split('.').pop()}`;
      const sampleBookBuffer = await form.data.book.arrayBuffer();
      await Bun.write(sampleBookPath, sampleBookBuffer);

      bookPath = `uploads/books/${crypto.randomUUID()}.${form.data.book.name.split('.').pop()}`;
      const bookBuffer = await form.data.book.arrayBuffer();
      await Bun.write(bookPath, bookBuffer);

      const book: Book = {
        title: form.data.title,
        description: form.data.description,
        publish_date: form.data.publish_date,
        cover_url: coverPath,
        price: form.data.price,
        discount: form.data.discount,
        sample_url: sampleBookPath,
        book_url: bookPath,
        language: form.data.language
      };

      const st = 'create only book content $book;';
      await db.query(st, { book });
      return redirect(303, '/seller');
    } catch (err) {
      if (isRedirect(err)) throw err;
      console.error(err);
      console.log('Failed to post book.');
      if (coverPath) await unlink(coverPath);
      if (bookPath) await unlink(bookPath);
      return message(form, 'Somthing went wrong.', { status: 500 });
    }
  }
};
