import type { Book } from '$lib/schema/book';
import { db } from '$lib/server/surreal';
import type { PageServerLoad } from './$types';

export const load = (async () => {
  let recentBooks: Book[] = [];
  try {
    const st = `
      {
        let $a = select posted_at, out as book from sell;
        let $b = select * from $a order by posted_at desc;
        return $b.book[*];
      }
    `;
    const res = await db.query<[Book[]]>(st);
    recentBooks = res[0];
  } catch (err) {
    console.error(err);
    console.log('Failed to query books');
  }
  return {
    recentBooks
  };
}) satisfies PageServerLoad;
