import { redirect, type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/surreal';
import { message, superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { loginSchema } from './schema';

export const load = (async () => {
  const form = await superValidate(zod(loginSchema));
  return { form };
}) satisfies PageServerLoad;

export const actions = {
  default: async ({ request, cookies }) => {
    const form = await superValidate(request, zod(loginSchema));

    if (!form.valid) {
      return fail(400, { form });
    }

    try {
      const { uid, password, remember } = form.data;
      const token = await db.signin({ scope: 'user', uid, password });
      if (!token) return message(form, 'Authentication failed.', { status: 401 });
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
        return message(form, invalidErrMsg, { status: 401 });
      } else {
        console.error(err);
        console.log('Signin failed.');
        return message(form, 'Somthing went wrong.', { status: 500 });
      }
    }

    return redirect(303, '/');
  }
} satisfies Actions;
