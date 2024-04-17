import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { db } from '$lib/surreal';
import { unlink } from 'fs/promises';
import type { PathLike } from 'fs';

import { SearchAuthorSchema, AddAuthorSchema } from '$lib/schema/author';
import { AddBookSchema } from '$lib/schema/book';

export const load = (async () => {
  const addBookForm = await superValidate(zod(AddBookSchema));
  const searchAuthorForm = await superValidate(zod(SearchAuthorSchema));
  const addAuthorForm = await superValidate(zod(AddAuthorSchema));
  return { addBookForm, searchAuthorForm, addAuthorForm };
}) satisfies PageServerLoad;

export const actions = {
  add: async ({ request }) => {
    const addBookForm = await superValidate(request, zod(AddBookSchema));

    if (!addBookForm.valid) {
      return fail(400, { addBookForm });
    }

    let coverPath: PathLike | undefined;
    let bookPath: PathLike | undefined;
    let sampleBookPath: PathLike | undefined;

    const { pricing, author, book, publication, resources } = addBookForm.data;

    try {
      coverPath = `uploads/covers/${crypto.randomUUID()}.${resources.cover.name.split('.').pop()}`;
      const coverBuffer = await resources.cover.arrayBuffer();
      await Bun.write(coverPath, coverBuffer);

      sampleBookPath = `uploads/samples/${crypto.randomUUID()}.${resources.sampleBook.name.split('.').pop()}`;
      const sampleBookBuffer = await resources.sampleBook.arrayBuffer();
      await Bun.write(sampleBookPath, sampleBookBuffer);

      bookPath = `uploads/books/${crypto.randomUUID()}.${resources.book.name.split('.').pop()}`;
      const bookBuffer = await resources.book.arrayBuffer();
      await Bun.write(bookPath, bookBuffer);

      const st = `
        {
          let $b = create only book content {
            title: $book.title,
            description: $book.description,
            coverUrl: $coverPath,
            publishDate: $publication.date,
            publication: $publication.name,
            isbn: $publication.isbn,
            totalPages: $book.totalPages
            language: $book.language,
            sampleUrl: $sampleBookPath
          };
          let $seller = $b.seller;
          relate $seller -> sells -> $b content {
            in: $seller.id,
            out: $b.id,
            price: $pricing.price,
            discount: $pricing.discount,
            bookUrl: $bookPath
          };
        }
      `;

      await db.query(st, {
        pricing,
        book,
        publication,
        author,
        coverPath,
        sampleBookPath,
        bookPath
      });

      return message(addBookForm, {
        status: 'success',
        text: 'Book posted successfully.',
        data: null
      });
    } catch (err) {
      console.error(err);
      if (coverPath) await unlink(coverPath);
      if (bookPath) await unlink(bookPath);
      if (sampleBookPath) await unlink(sampleBookPath);
      throw new Error('Failed to post book.');
    }
  }
};
