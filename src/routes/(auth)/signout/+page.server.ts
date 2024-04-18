import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  redirect(303, '/');
};

export const actions = {
  default: async ({ cookies }) => {
    cookies.delete('token', { path: '/' });
  }
} satisfies Actions;
