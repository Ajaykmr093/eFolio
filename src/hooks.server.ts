import { logout } from '$lib/logout';
import type { User } from '$lib/schema/user';
import { db } from '$lib/surreal';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

// Authentication and Authorization
const auth = (async ({ event, resolve }) => {
  const { cookies, locals } = event;
  const token = cookies.get('token');

  const secureRoute = event.route.id?.includes('(authenticated)');
  const authRoute = event.url.pathname.includes('/auth');
  const logoutRoute = event.url.pathname.includes('/auth/logout');

  if (!token) {
    if (!secureRoute) return await resolve(event);
    else return redirect(303, '/auth/login');
  }

  if (authRoute && !logoutRoute) {
    return redirect(303, '/');
  }

  const authenticated = await db.authenticate(token).catch(async () => {
    if (secureRoute) await logout(locals, cookies);
  });

  if (authenticated) {
    if (!event.locals.user) {
      const user = (await db.info()) as User;
      event.locals.user = user;
    }
  } else {
    await logout(locals, cookies);
  }

  return await resolve(event);
}) satisfies Handle;

export const handle = sequence(auth);
