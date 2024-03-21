import { z } from 'zod';

export const UserSchema = z.object({
	id: z.string(),
	name: z.object({
		first: z.string().min(2, 'Too short'),
		last: z.string().min(2, 'Too short'),
		full: z.string()
	}),
	email: z.string().email('Invalid email'),
	username: z.string().min(4, 'Too short'),
	password: z.string().optional(),
	created_at: z.date()
});

export type User = z.infer<typeof UserSchema>;
