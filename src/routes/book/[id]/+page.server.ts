import type { Book } from '$lib/schema/Book';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db/surreal';

export const load = (async ({ params }) => {
  const st = `
    LET $book = (SELECT *, author[*] FROM ONLY $bookId);
    RETURN $book;
    SELECT *, author[*] FROM book WHERE author = $book.author.id AND id != $bookId LIMIT 10;
  `;
  const bookId = params.id;
  const result = await db.query<[null, Book, Book[]]>(st, { bookId });
  const book = result[1];
  const moreByAuthor = result[2];
  return { book, moreByAuthor };
}) satisfies PageServerLoad;
