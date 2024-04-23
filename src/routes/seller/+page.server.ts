import type { PageServerLoad } from './$types';
import type { Book } from '$lib/schema/book';
import { db } from '$lib/server/db/surreal';

export const load = (async ({ locals }) => {
  const st = `
    SELECT price, discount, out.title AS title, out.coverUrl AS coverUrl, meta::id(out.id) AS id
    FROM (SELECT value ->sells FROM only $seller);
  `;
  const result = await db.query<[Book[]]>(st, { seller: locals.user?.seller_profile });
  const entries = result[0];
  return { entries };
}) satisfies PageServerLoad;
