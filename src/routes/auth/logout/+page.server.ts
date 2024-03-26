import { logout } from '$lib/logout';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  redirect(302, '/');
};

export const actions = {
  default: async ({ locals, cookies }) => await logout(locals, cookies)
} satisfies Actions;
