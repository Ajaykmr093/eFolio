import { fail, message, superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { SellerApplicationSchema } from './schema';
import { redirect, type Actions } from '@sveltejs/kit';
import { db } from '$lib/surreal';

export const load = (async () => {
  const form = await superValidate(zod(SellerApplicationSchema));
  return { form };
}) satisfies PageServerLoad;

export const actions = {
  default: async ({ locals, request }) => {
    const form = await superValidate(request, zod(SellerApplicationSchema));
    if (!form.valid) return fail(400, { form });

    const { email, name, photo } = form.data;
    const user = locals.user;

    let token: string;
    try {
      token = await db.signup({ scope: 'seller', name, email, photo, user });
    } catch (err) {
      console.error(err);
      console.log('Signup failed.');
      return message(form, 'Somthing went wrong.', { status: 500 });
    }

    if (!token) return message(form, 'Authentication failed.', { status: 401 });

    return redirect(303, '/seller');
  }
} satisfies Actions;
