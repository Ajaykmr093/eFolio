import { UserSchema } from '$lib/schema/user';
import { z } from 'zod';

export const signupSchema = UserSchema.pick({ email: true, username: true }).extend({
	first_name: z.string().min(2, 'Too short'),
	last_name: z.string().min(2, 'Too short'),
	password: z.string().min(4, 'Too short')
});
