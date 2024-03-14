import { redirect, type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/surreal';
import { message, setError, superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { schema } from './schema';

export const load = (async () => {
	const form = await superValidate(zod(schema));
	return { form };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ locals, request }) => {
		if (locals.user) redirect(303, '/');

		const form = await superValidate(request, zod(schema));
		if (!form.valid) return fail(400, { form });

		const { username, password, first_name, last_name, email } = form.data;
		const name = {
			first: first_name,
			last: last_name,
			full: `${first_name} ${last_name}`
		};

		type EmailLookup = {
			email: string;
		};

		try {
			const st = 'SELECT email FROM ONLY user WHERE email = type::string($email) LIMIT 1';
			const query = await db.query<[EmailLookup]>(st, { email });
			const exists = query[0];
			if (exists) return setError(form, 'email', 'Email already exists.');
		} catch (err) {
			return message(form, 'Somthing went wrong.', { status: 500 });
		}

		try {
			await db.signup({ scope: 'user', name, email, username, password });
		} catch (err) {
			return message(form, 'Somthing went wrong.', { status: 500 });
		}

		redirect(303, '/auth/login');
	}
} satisfies Actions;
