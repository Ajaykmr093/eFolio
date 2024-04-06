import type { Book } from '$lib/schema/book';
import { db } from '$lib/surreal';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async () => {
  try {
    const st = `
      {
        let $a = select posted_at, out as book from sell;
        let $b = select * from $a order by posted_at desc;
        return $b.book[*];
      }
    `;
    const res = await db.query<[Book[]]>(st);
    const recentBooks = res[0];
    return { recentBooks };
  } catch (err) {
    console.error(err);
    console.log('Failed to query books');
    return error(500, "Somthing went wrong.");
  }
}) satisfies PageServerLoad;
