import { db } from '$lib/db/surreal';
import type { User } from '$lib/schema/user';
import { type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const auth = (async ({ event, resolve }) => {
  const { cookies, locals } = event;

  const token = cookies.get('token');
  if (!token) return await resolve(event);

  const authenticated = await db.authenticate(token).catch(async (err) => {
    console.error(err);
    console.log('Failed to authentacate user token.');
  });

  if (!authenticated) {
    cookies.delete('token', { path: '/' });
    return await resolve(event);
  }

  const user = (await db.info().catch(async (err) => {
    console.error(err);
    console.log('Failed to get uesr info from token.');
    cookies.delete('token', { path: '/' });
  })) as User;
  locals.user = user;

  return await resolve(event);
}) satisfies Handle;

export const handle = sequence(auth);
