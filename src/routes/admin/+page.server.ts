import type { SellerApplication } from '$lib/schema/SellerApplication';
import { db } from '$lib/server/db/surreal';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
  const st = `
    SELECT *, in[*] AS user, out[*] AS seller OMIT in, out
    FROM applies_to_become WHERE applicationStatus = 'pending';
  `;
  const result = await db.query<[SellerApplication[]]>(st);
  const applications = result[0];
  return { applications };
}) satisfies PageServerLoad;

export const actions: Actions = {
  approve: async ({ request }) => {
    await approveOrReject(request, 'approved');
  },
  reject: async ({ request }) => {
    await approveOrReject(request, 'rejected');
  }
};

async function approveOrReject(request: Request, action: string) {
  const data = await request.formData();
  const id = data.get('id');
  const remark = data.get('remark');

  const st = `update $id set remark = $remark, applicationStatus = $action`;
  await db.query(st, { id, remark, action });
  return redirect(303, '#');
}
