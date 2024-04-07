import type { Seller } from '$lib/schema/seller';
import { db } from '$lib/surreal';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Book } from '$lib/schema/book';

export const load = (async ({ locals }) => {
  const seller_id = locals.user?.seller_id;

  try {
    const st = 'SELECT * FROM ONLY $seller_id';
    const query = await db.query<[Seller]>(st, { seller_id });
    const seller = query[0];
    try {
      const st = 'SELECT * FROM book WHERE seller_id = $seller_id';
      const query = await db.query<[Book[]]>(st, { seller_id });
      const entries = query[0];
      return { entries, isVerified: seller?.is_verified };
    } catch (err) {
      console.error(err);
      console.log('Failed to query seller book entries.');
      return error(500, 'Somthing went wrong.');
    }
  } catch (err) {
    console.error(err);
    console.log('Failed to query seller account.');
    return error(500, 'Somthing went wrong.');
  }
}) satisfies PageServerLoad;
