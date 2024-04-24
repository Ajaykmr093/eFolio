import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
  return { user: locals.user, isSeller: locals.isSeller };
}) satisfies LayoutServerLoad;
