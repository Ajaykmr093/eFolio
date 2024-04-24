import type { Book } from '$lib/schema/Book';
import { db } from '$lib/server/db/surreal';
import type { PageServerLoad } from './$types';

export const load = (async () => {
  const st = `
      SELECT * FROM book ORDER BY createdAt DESC LIMIT 20;
      SELECT * FROM book ORDER BY RAND() LIMIT 20;
      SELECT * FROM book ORDER BY publishDate DESC LIMIT 20;
      SELECT * FROM book ORDER BY publishDate ASC LIMIT 20;
      $randAuthor = SELECT id, name FROM ONLY author ORDER BY RAND() LIMIT 1;
      RETURN $randAuthor.name;
      SELECT * FROM book WHERE author = $randAuthor.id;
    `;
  const result = await db.query<[Book[], Book[], Book[], Book[], null, string, Book[]]>(st);
  const [
    newlyAddedBooks,
    randomlySelectedBooks,
    newlyPublishedBooks,
    oldBooks,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _,
    randomAuthorName,
    booksByRandomAuthor
  ] = result;

  return {
    newlyAddedBooks,
    randomlySelectedBooks,
    newlyPublishedBooks,
    oldBooks,
    randomAuthorName,
    booksByRandomAuthor
  };
}) satisfies PageServerLoad;
