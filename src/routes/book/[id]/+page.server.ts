import type { Book } from '$lib/schema/book';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db/surreal';

export const load = (async ({ params }) => {
  const st = `
    SELECT price, discount, out.title AS title, out.coverUrl AS coverUrl, out.publishDate as publishDate,
     out.description as description, out.language as language, out.bookType as bookType, out.totalPages as totalPages,
     out.publication as publication, out.author.name as author.name, out.author.id as author.id, meta::id(out.id) AS id
    FROM only (SELECT value <-sells[0] FROM only $bookId);
  `;
  const bookId = `book:${params.id}`;
  const result = await db.query<[Book]>(st, { bookId });
  const book = result[0];

  const st2 = `
    select price, discount, out.title AS title, out.coverUrl AS coverUrl, meta::id(out.id) AS id
    from (select value <-sells[0] from (SELECT id FROM book WHERE author = $authorId and id != $bookId limit 10));
  `;
  const result2 = await db.query<[Book[]]>(st2, { authorId: book.author.id, bookId });
  const moreByAuthor = result2[0];

  // const st3 = `throw 'not implemented';`;
  // const result3 = await db.query<[Book[]]>(st3, { bookId });
  // const recommendation = result3[0];
  return { book, moreByAuthor };
}) satisfies PageServerLoad;
