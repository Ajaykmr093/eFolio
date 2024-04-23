import { db } from "$lib/server/db/surreal";

export async function isSellerApproved(uid: string) {
  const st = `SELECT value status FROM ONLY applies_to_become WHERE in = $uid LIMIT 1;`;
  const result = await db.query<[string]>(st, { uid });
  return result[0] == 'approved';
}
