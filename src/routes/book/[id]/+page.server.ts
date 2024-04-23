import type { Book } from '$lib/schema/book';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db/surreal';

export const load = (async ({ params }) => {
  const st = `
    SELECT price, discount, out.title AS title, out.coverUrl AS coverUrl, out.publishDate as publishDate,
     out.description as description, out.language as language, out.bookType as bookType, out.totalPages as totalPages,
     out.publication as publication, out.author.name as author.name, out.author.id as author.id, meta::id(out.id) AS id
    FROM only (SELECT VALUE <-sells[0] FROM only $bookId);
    
    SELECT price, discount, out.title AS title, out.coverUrl AS coverUrl, meta::id(out.id) AS id
    FROM (SELECT VALUE <-sells[0] FROM (SELECT id FROM book WHERE author = $authorId AND id != $bookId LIMIT 10));
  `;
  const bookId = `book:${params.id}`;
  const result = await db.query<[Book, Book[]]>(st, { bookId });
  const book = result[0];
  const moreByAuthor = result[1];
  return { book, moreByAuthor };
}) satisfies PageServerLoad;
