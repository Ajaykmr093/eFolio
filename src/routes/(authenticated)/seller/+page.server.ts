import type { Seller } from '$lib/schema/seller';
import { db } from '$lib/surreal';
import type { PageServerLoad } from './$types';
import type { SellerBookEntry } from './schema';

export const load = (async ({ locals }) => {
  const seller_id = locals.user?.seller_id;

  try {
    const st = 'SELECT * FROM ONLY $seller_id';
    const query = await db.query<[Seller]>(st, { seller_id });
    const seller = query[0];
    try {
      const st = `
        {
          let $a = SELECT ->sell[*] as entries omit entries.in from only $seller_id;
          let $b = SELECT *, out.id as book.id, out.title as book.title, out.cover as book.cover omit out from $a.entries;
          return $b;
        }
      `;
      const query = await db.query<[SellerBookEntry[]]>(st, { seller_id });
      const entries = query[0];
      return { entries, isVerified: seller?.is_verified };
    } catch (err) {
      console.error(err);
      console.log('Failed to query seller book entries.');
    }
  } catch (err) {
    console.error(err);
    console.log('Failed to query seller account.');
  }
}) satisfies PageServerLoad;
