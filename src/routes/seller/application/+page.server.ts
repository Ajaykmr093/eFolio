import { fail, message, superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { redirect, type Actions } from '@sveltejs/kit';
import { SubmitSellerApplicationSchema } from '$lib/schema/seller';
import { db } from '$lib/server/db/surreal';
import { unlink } from 'fs/promises';
import { uploadFile } from '$lib/helpers/uploadFile';

export const load = (async ({ locals }) => {
  const form = await superValidate(zod(SubmitSellerApplicationSchema));
  const uid = locals.user!.id;

  const st = `
    $res = SELECT status, remark FROM ONLY applies_to_become WHERE in = $uid LIMIT 1;
    $res['status'];
    $res['remark'];
  `;

  const result = await db.query<[null, string | null, string | null]>(st, { uid });
  const applicationStatus = result[1];
  const remark = result[2];

  return { form, applicationStatus, remark };
}) satisfies PageServerLoad;

export const actions = {
  apply: async ({ locals, request }) => {
    const form = await superValidate(request, zod(SubmitSellerApplicationSchema));
    if (!form.valid) return fail(400, { form });

    let documentPath: string | undefined;

    try {
      const documentPath = await uploadFile(form.data.document, 'document/');
      const { email, name, password } = form.data;
      const vars = { name, email, password, user: locals.user?.id, doc: documentPath };
      await db.signup({ scope: 'seller', ...vars });
    } catch (err) {
      const credsErrMsg = 'Invalid credentials.';
      const existsErrMsg = 'Seller profile already exists.';
      const errMsg = (err as Error).message;
      if (errMsg.includes(existsErrMsg)) {
        return message(form, { type: 'error', text: existsErrMsg }, { status: 401 });
      } else if (errMsg.includes(credsErrMsg)) {
        return message(form, { type: 'error', text: credsErrMsg }, { status: 401 });
      }

      if (documentPath) await unlink(documentPath);
      throw err;
    }

    return redirect(303, '#');
  },

  reapply: async ({ locals }) => {
    const st = 'delete applies_to_become where in = $uid';
    db.query(st, { uid: locals.user!.id });
    return redirect(303, '#');
  }
} satisfies Actions;
