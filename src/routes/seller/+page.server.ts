import type { PageServerLoad } from './$types';
import type { Book } from '$lib/schema/book';
import { db } from '$lib/server/db/surreal';

export const load = (async () => {
  const st = `
    SELECT price, discount, out.title AS title, out.coverUrl AS coverUrl, meta::id(out.id) AS id
    FROM (SELECT value ->sells FROM only $auth.seller_profile);
  `;
  const result = await db.query<[Book[]]>(st);
  const entries = result[0];
  return { entries };
}) satisfies PageServerLoad;
