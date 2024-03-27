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

    try {
      const { email, name, photo } = form.data;
      const user = locals.user;

      const token = await db.signup({ scope: 'seller', name, email, photo, user });
      if (!token) return message(form, 'Authentication failed.', { status: 401 });
    } catch (err) {
      console.error(err);
      return message(form, 'Somthing went wrong.', { status: 500 });
    }

    return redirect(303, '/seller');
  }
} satisfies Actions;
