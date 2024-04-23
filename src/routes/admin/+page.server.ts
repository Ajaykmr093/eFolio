import type { SellerApplication } from '$lib/schema/seller';
import { db } from '$lib/server/db/surreal';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
  const st = `
    select id, out.name as name, out.email as email, document
    from applies_to_become where status = 'pending';
  `;
  const result = await db.query<[SellerApplication[]]>(st);
  const applications = result[0];
  console.log(applications);
  return { applications };
}) satisfies PageServerLoad;

export const actions: Actions = {
  approve: async ({ request }) => {
    await approveOrReject(request, 'approve');
  },
  reject: async ({ request }) => {
    await approveOrReject(request, 'reject');
  }
};

async function approveOrReject(request: Request, action: string) {
  const data = await request.formData();
  const id = data.get('id');
  const remark = data.get('remark');

  const st = `update $id set remark = $remark, status = $action`;
  await db.query(st, { id, remark, action });
  return redirect(303, '#');
}
