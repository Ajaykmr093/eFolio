import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { unlink } from 'fs/promises';
import type { PathLike } from 'fs';

import { SearchAuthorSchema, AddAuthorSchema, AuthorSchema } from '$lib/schema/author';
import { AddBookSchema } from '$lib/schema/book';
import { db } from '$lib/server/db/surreal';
import { uploadFile } from '$lib/helpers/uploadFile';
import path from 'path';
import { z } from 'zod';

export const load = (async () => {
  const addBookForm = await superValidate(zod(AddBookSchema));
  const searchAuthorForm = await superValidate(zod(SearchAuthorSchema));
  const addAuthorForm = await superValidate(zod(AddAuthorSchema));
  return { addBookForm, searchAuthorForm, addAuthorForm };
}) satisfies PageServerLoad;

export const actions = {
  add: async ({ request }) => {
    const form = await superValidate(request, zod(AddBookSchema));
    if (!form.valid) return fail(400, { form });

    let coverPath: PathLike | undefined;
    let bookPath: PathLike | undefined;
    let sampleBookPath: PathLike | undefined;
    const { pricing, author, book, publication, resources } = form.data;
    let result: string | undefined;

    try {
      coverPath = await uploadFile(resources.cover, 'cover/');
      bookPath = await uploadFile(resources.book, 'book/');
      sampleBookPath = await uploadFile(resources.sampleBook, 'sample/');
      const bookType = path.extname(bookPath);
      const vars = { pricing, book, publication, author, coverPath, sampleBookPath, bookPath, bookType };

      console.log(vars);

      const st = `
        {
          let $b = create only book content {
            title: $book.title,
            bookType: $bookType,
            description: $book.description,
            coverUrl: $coverPath,
            publishDate: $publication.date,
            publication: $publication.name,
            isbn: $publication.isbn,
            totalPages: $book.totalPages,
            language: $book.language,
            sampleUrl: $sampleBookPath,
            author: $author
          };
          let $seller = $b.seller;
          relate $seller -> sells -> $b content {
            in: $seller.id,
            out: $b.id,
            price: $pricing.price,
            discount: $pricing.discount,
            bookUrl: $bookPath
          };
          return meta::id($b.id);
        }
      `;

      const res = await db.query<[string]>(st, { ...vars });
      result = res[0];
    } catch (err) {
      if (coverPath) await unlink(coverPath);
      if (bookPath) await unlink(bookPath);
      if (sampleBookPath) await unlink(sampleBookPath);
      throw err;
    }

    return message(form, { type: 'success', data: { result } });
  },

  addAuthor: async ({ request, fetch, locals }) => {
    const form = await superValidate(request, zod(AddAuthorSchema));
    if (!form.valid) return fail(400, { form });

    let photoPath: PathLike | undefined;
    let data;

    try {
      photoPath = await uploadFile(form.data.photo, 'author/');
      const { name, about } = form.data;
      const res = await fetch('/author', {
        method: 'post',
        body: JSON.stringify({ name, about, photo: photoPath, added_by: locals.user?.seller_profile })
      });
      data = await res.json();
    } catch (error) {
      if (photoPath) await unlink(photoPath);
      throw error;
    }

    const parsedData = AuthorSchema.parse(data);
    return message(form, { type: 'success', data: { result: parsedData.id } });
  },

  searchAuthor: async ({ request, fetch }) => {
    const form = await superValidate(request, zod(SearchAuthorSchema));
    if (!form.valid) return fail(400, { form });
    const res = await fetch(`/author?q=${form.data.q}`);
    const data = await res.json();
    const parsedData = z.array(AuthorSchema).parse(data);
    return message(form, { type: 'success', data: { result: parsedData } });
  }
};
