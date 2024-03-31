import { redirect, type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/surreal';
import { message, setError, superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { signupSchema } from './schema';
import { z } from 'zod';

type Email = z.infer<typeof signupSchema.shape.email>;

export const load = (async () => {
  const form = await superValidate(zod(signupSchema));
  return { form };
}) satisfies PageServerLoad;

export const actions = {
  default: async ({ locals, request }) => {
    if (locals.user) redirect(303, '/');

    const form = await superValidate(request, zod(signupSchema));
    if (!form.valid) return fail(400, { form });

    const { username, password, first_name, last_name, email } = form.data;
    const name = {
      first: first_name,
      last: last_name,
      full: `${first_name} ${last_name}`
    };

    const st = 'SELECT email FROM ONLY user WHERE email = type::string($email) LIMIT 1';

    let query;
    try {
      query = await db.query<[Email]>(st, { email });
    } catch (err) {
      console.error(err);
      console.log('Failed to query email.');
      return message(form, 'Somthing went wrong.', { status: 500 });
    }

    const exists = query[0];
    if (exists) return setError(form, 'email', 'Email already exists.');

    try {
      await db.signup({ scope: 'user', name, email, username, password });
    } catch (err) {
      console.error(err);
      console.log('Signup failed.');
      return message(form, 'Somthing went wrong.', { status: 500 });
    }

    redirect(303, '/auth/login');
  }
} satisfies Actions;
