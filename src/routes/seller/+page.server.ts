import type { PageServerLoad } from './$types';
import type { Book } from '$lib/schema/Book';
import { db } from '$lib/server/db/surreal';

export const load = (async () => {
  const st = `SELECT * from book where seller = fn::approved_seller_from_auth();`;
  const result = await db.query<[Book[]]>(st);
  const entries = result[0];
  return { entries };
}) satisfies PageServerLoad;
