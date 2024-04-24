import { redirect, type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { message, superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { LoginSchema } from '$lib/schema/User';
import { db } from '$lib/server/db/surreal';

export const load = (async () => {
  const form = await superValidate(zod(LoginSchema));
  return { form };
}) satisfies PageServerLoad;

export const actions = {
  default: async ({ request, cookies }) => {
    const form = await superValidate(request, zod(LoginSchema));
    if (!form.valid) return fail(400, { form });

    try {
      const { uid, password, remember } = form.data;
      const token = await db.signin({ scope: 'user', uid, password });
      const maxAge = remember ? 60 * 60 * 24 * 7 : undefined;
      cookies.set('token', token, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: maxAge,
        priority: 'high'
      });
    } catch (err) {
      const invalidErrMsg = 'Invalid credentials.';
      if ((err as Error).message.includes(invalidErrMsg)) {
        return message(form, { type: 'error', text: invalidErrMsg }, { status: 401 });
      }
      throw err;
    }

    return redirect(303, '/');
  }
} satisfies Actions;
