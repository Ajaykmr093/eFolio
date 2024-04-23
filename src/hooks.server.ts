import { db } from '$lib/server/db/surreal';
import type { User } from '$lib/schema/user';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const auth = (async ({ event, resolve }) => {
  const { cookies, locals } = event;

  const routeId = event.route.id;
  const token = cookies.get('token');
  let user: User | undefined;

  // If token exists then attach user from token to locals
  if (token) {
    const authenticated = await db.authenticate(token);
    if (!authenticated) cookies.delete('token', { path: '/' });
    user = (await db.info().catch(async () => {
      cookies.delete('token', { path: '/' });
    })) as User | undefined;
    locals.user = user;
  }

  if (routeId?.includes('(authenticated)')) {
    if (user == undefined) {
      return redirect(303, '/signin');
    }
  }

  if (routeId?.includes('(auth)')) {
    if (!routeId?.includes('/signout')) {
      if (user != undefined) {
        return redirect(303, '/');
      }
    }
  }

  if (routeId?.includes('seller')) {
    if (user == undefined) {
      return redirect(303, '/signin');
    } else if (!routeId?.includes('application')) {
      if (user?.seller_profile == undefined) {
        return redirect(303, '/seller/application');
      }
    }
  }

  if (routeId?.includes('book/add')) {
    if (user?.seller_profile == undefined) {
      return redirect(303, '/seller/application');
    }
  }

  if (routeId?.includes('admin')) {
    if (!user?.isAdmin) {
      return redirect(303, '/signin');
    }
  }
  return await resolve(event);
}) satisfies Handle;

export const handle = sequence(auth);
