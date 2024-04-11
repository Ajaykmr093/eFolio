import type { Book } from '$lib/schema/book';
import { db } from '$lib/surreal';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
  try {
    const st = `
      SELECT
        price,
        discount,
        out.title AS title,
        out.cover_url AS cover_url,
        out.publish_date as publish_date,
        out.description as description,
        out.language as language,
        meta::id(out.id) AS id
      FROM only (SELECT value <-sells[0] FROM only $bookId);
    `;
    const result = await db.query<[Book]>(st, { bookId: `book:${params.id}` });
    const book = result[0];
    return { book };
  } catch (err) {
    console.error(err);
    console.log('Failed to query seller book entries.');
    return error(500, 'Somthing went wrong.');
  }
}) satisfies PageServerLoad;
