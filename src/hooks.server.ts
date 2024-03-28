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

  const authenticated = await db.authenticate(token).catch(async (err) => {
    console.error(err);
    console.log('Failed to authentacate user token.');
    if (secureRoute) return await logout(locals, cookies);
  });

  if (authenticated) {
    if (!event.locals.user) {
      const user = (await db.info().catch(async (err) => {
        console.error(err);
        console.log('Failed to get uesr info from token.');
        if (secureRoute) return await logout(locals, cookies);
      })) as User;
      event.locals.user = user;
    }
  } else {
    await logout(locals, cookies);
  }

  const sellerRoute = event.url.pathname.includes('/seller');
  const sellerApplicationRoute = event.url.pathname.includes('/seller/apply');
  const isSeller = event.locals.user?.seller_id != undefined;

  if (sellerRoute && !sellerApplicationRoute && !isSeller) {
    return redirect(303, '/seller/apply');
  }

  if (sellerApplicationRoute && isSeller) {
    return redirect(303, '/seller');
  }

  return await resolve(event);
}) satisfies Handle;

export const handle = sequence(auth);
