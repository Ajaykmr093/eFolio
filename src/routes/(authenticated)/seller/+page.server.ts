import { db } from '$lib/surreal';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Book } from '$lib/schema/book';

export const load = (async ({ locals }) => {
  const seller = locals.user!.seller_profile;

  try {
    const st = 'SELECT * FROM book WHERE seller = $seller;';
    const result = await db.query<[Book[]]>(st, { seller });
    const entries = result[0];
    return { entries };
  } catch (err) {
    console.error(err);
    console.log('Failed to query seller book entries.');
    return error(500, 'Somthing went wrong.');
  }
}) satisfies PageServerLoad;
