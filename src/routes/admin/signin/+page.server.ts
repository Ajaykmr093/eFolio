import { redirect, type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { message, superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { db } from '$lib/server/db/surreal';
import { AdminLoginSchema } from '$lib/schema/admin';

export const load = (async () => {
  const form = await superValidate(zod(AdminLoginSchema));
  return { form };
}) satisfies PageServerLoad;

export const actions = {
  default: async ({ request, cookies }) => {
    const form = await superValidate(request, zod(AdminLoginSchema));
    if (!form.valid) return fail(400, { form });

    try {
      const { username, password } = form.data;
      const token = await db.signin({ scope: 'admin', username, password });
      cookies.set('adminToken', token, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        priority: 'high'
      });
    } catch (err) {
      const invalidErrMsg = 'Invalid credentials.';
      if ((err as Error).message.includes(invalidErrMsg)) {
        return message(form, { type: 'error', text: invalidErrMsg }, { status: 401 });
      }
      throw err;
    }

    return redirect(303, '/admin');
  }
} satisfies Actions;
