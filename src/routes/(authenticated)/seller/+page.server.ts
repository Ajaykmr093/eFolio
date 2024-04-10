import { db } from '$lib/surreal';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Book } from '$lib/schema/book';

export const load = (async () => {
  try {
    const st = `
      SELECT
        price,
        discount,
        out.title AS title,
        out.cover_url AS cover_url
      FROM
        (SELECT value ->sells FROM only $auth.seller_profile);
    `;
    const result = await db.query<[Book[]]>(st);
    const entries = result[0];
    return { entries };
  } catch (err) {
    console.error(err);
    console.log('Failed to query seller book entries.');
    return error(500, 'Somthing went wrong.');
  }
}) satisfies PageServerLoad;
