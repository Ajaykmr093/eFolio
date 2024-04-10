import { fail, message, superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { SellerApplicationSchema } from './schema';
import { redirect, type Actions } from '@sveltejs/kit';
import { db } from '$lib/surreal';

export const load = (async ({ locals }) => {
  const form = await superValidate(zod(SellerApplicationSchema));
  const uid = locals.user!.id;

  const st = `
    $res = SELECT application_status, remark FROM ONLY applies_to_become WHERE in = $uid LIMIT 1;
    $res['application_status'];
    $res['remark'];
  `;
  const result = await db.query<[null, string, string]>(st, { uid });
  return { form, applicationStatus: result[1], remark: result[2] };
}) satisfies PageServerLoad;

export const actions = {
  apply: async ({ locals, request }) => {
    const form = await superValidate(request, zod(SellerApplicationSchema));

    if (!form.valid) {
      return fail(400, { form });
    }

    let documentPath: string;

    try {
      documentPath = `uploads/documents/${crypto.randomUUID()}.${form.data.document.name.split('.').pop()}`;
      const documentBuffer = await form.data.document.arrayBuffer();
      await Bun.write(documentPath, documentBuffer);

      const { email, name, password } = form.data;
      const vars = { name, email, password, user: locals.user?.id, doc: documentPath };
      const token = await db.signup({ scope: 'seller', ...vars });
      if (!token) return message(form, 'Authentication failed.', { status: 401 });
    } catch (err) {
      const credsErrMsg = 'Invalid credentials.';
      const existsErrMsg = 'Seller profile already exists.';
      const errMsg = (err as Error).message;
      if (errMsg.includes(existsErrMsg)) {
        return message(form, existsErrMsg, { status: 401 });
      } else if (errMsg.includes(credsErrMsg)) {
        return message(form, credsErrMsg, { status: 401 });
      } else {
        console.error(err);
        console.log('Signup failed.');
        return message(form, 'Somthing went wrong.', { status: 500 });
      }
    }

    return redirect(303, '#');
  },

  reapply: async ({ locals }) => {
    const st = 'delete applies_to_become where in = $uid';
    db.query(st, { uid: locals.user!.id });
    return redirect(303, '#');
  }
} satisfies Actions;
