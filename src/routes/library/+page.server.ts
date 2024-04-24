import type { Book } from '$lib/schema/Book';
import { db } from '$lib/server/db/surreal';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
  const st = `
    $res = SELECT ->bought->book[*] as result FROM ONLY $uid LIMIT 50;
    return $res.result;
  `;
  const result = await db.query<[null, Book[]]>(st, { uid: locals.user.id });
  const userBoughtBooks = result[1];
  return { userBoughtBooks };
}) satisfies PageServerLoad;
