import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { SearchAuthorSchema, AddAuthorSchema, AuthorSchema } from '$lib/schema/Author';
import { AddBookSchema } from '$lib/schema/Book';
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

    const { pricing, author, book, publication, resources } = form.data;

    const coverPath = await uploadFile(resources.cover, 'cover/');
    const bookPath = await uploadFile(resources.book, 'book/');
    const sampleBookPath = await uploadFile(resources.sampleBook, 'sample/');
    const bookType = path.extname(bookPath);

    const data = {
      ...book,
      ...pricing,
      isbn: publication.isbn,
      publication: publication.name,
      publishDate: publication.date,
      author,
      bookType,
      coverUrl: coverPath,
      sampleUrl: sampleBookPath,
      bookUrl: bookPath
    };

    const st = `create only book content $data return value id;`;
    const res = await db.query<[string]>(st, { data });
    const result = res[0];

    return message(form, { type: 'success', data: { result } });
  },

  addAuthor: async ({ request, fetch }) => {
    const form = await superValidate(request, zod(AddAuthorSchema));
    if (!form.valid) return fail(400, { form });

    const photoPath = await uploadFile(form.data.photo, 'author/');
    const { name, about } = form.data;
    const res = await fetch('/author', {
      method: 'post',
      body: JSON.stringify({ name, about, photo: photoPath })
    });
    const data = await res.json();

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
