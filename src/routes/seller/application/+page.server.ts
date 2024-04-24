import { fail, message, superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { redirect, type Actions } from '@sveltejs/kit';
import { BecomeSellerSchema } from '$lib/schema/Seller';
import { db } from '$lib/server/db/surreal';
import { uploadFile } from '$lib/helpers/uploadFile';
import type { SellerApplication } from '$lib/schema/SellerApplication';

export const load = (async ({ locals }) => {
  const form = await superValidate(zod(BecomeSellerSchema));
  const uid = locals.user!.id;
  const st = `SELECT * FROM ONLY applies_to_become WHERE in = $uid LIMIT 1;`;
  const result = await db.query<[SellerApplication | null]>(st, { uid });
  const application = result[0];
  return { form, application };
}) satisfies PageServerLoad;

export const actions = {
  apply: async ({ locals, request }) => {
    const form = await superValidate(request, zod(BecomeSellerSchema));
    if (!form.valid) return fail(400, { form });

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
