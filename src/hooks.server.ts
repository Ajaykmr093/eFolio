import { logout } from '$lib/logout';
import { db } from '$lib/surreal';
import type { User } from '$types';
import { redirect, type Handle, error } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

// Authentication and Authorization
const auth = (async ({ event, resolve }) => {
	const { cookies } = event;
	const token = cookies.get('token');

	const secureRoute = event.route.id?.includes('(authenticated)');
	const authRoute = event.url.pathname.includes('/auth');

	if (token && secureRoute) {
		const authenticated = await db.authenticate(token).catch(async () => {
			await logout(event);
		});

		if (authenticated) {
			if (!event.locals.user) {
				const user = (await db.info().catch(() => {
					error(500, 'Something wrong with database connection.');
				})) as User;
				event.locals.user = user;
			}
		} else {
			await logout(event);
		}
	}

	if (secureRoute) {
		if (!event.locals.user || !token) {
			await logout(event);
		}
	}

	if (authRoute && token) {
		redirect(303, '/');
	}

	const response = await resolve(event);
	return response;
}) satisfies Handle;

const logoutHook = (async ({ event, resolve }) => {
	const logoutRoute = event.url.pathname.includes('/logout');
	if (logoutRoute) return await logout(event);
	const response = await resolve(event);
	return response;
}) satisfies Handle;

export const handle = sequence(auth, logoutHook);
