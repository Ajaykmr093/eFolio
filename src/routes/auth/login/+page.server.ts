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
  default: async ({ locals, request, cookies }) => {
    if (locals.user) redirect(303, '/');

    const form = await superValidate(request, zod(loginSchema));
    if (!form.valid) return fail(400, { form });

    const { uid, password, remember } = form.data;

    try {
      const token = await db.signin({ scope: 'user', uid, password });
      if (!token) message(form, 'Authentication failed.', { status: 401 });

      const maxAge = remember ? 60 * 60 * 24 * 7 : undefined;
      cookies.set('token', token, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
        maxAge: maxAge,
        priority: 'high'
      });
    } catch (err) {
      if ((err as Error).message.includes('No record was returned')) {
        return message(form, 'Invalid credentials.', { status: 401 });
      }
      return message(form, 'Somthing went wrong.', { status: 500 });
    }

    redirect(303, '/');
  }
} satisfies Actions;
