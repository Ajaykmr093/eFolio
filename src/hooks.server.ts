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
        if (secureRoute) await logout(locals, cookies);
      })) as User;
      event.locals.user = user;
    }
  } else {
    await logout(locals, cookies);
  }

  const sellerRoute = event.url.pathname.includes('/seller');
  const sellerApplicationRoute = event.url.pathname.includes('/seller/application');
  const isSeller = event.locals.user?.seller_profile != undefined;

  let isVerified = false;
  try {
    const st = `
      $res = SELECT application_status FROM ONLY applies_to_become WHERE in = $uid LIMIT 1;
      $res['application_status'] == 'approved';
    `;
    const result = await db.query<[null, boolean]>(st, { uid: event.locals.user!.id });
    isVerified = result[1];
  } catch (error) {
    console.error(error);
    console.log('Failed to verify seller status.');
  }

  if (sellerRoute && !sellerApplicationRoute && (!isSeller || !isVerified)) {
    return redirect(303, '/seller/application');
  }

  return await resolve(event);
}) satisfies Handle;

export const handle = sequence(auth);
