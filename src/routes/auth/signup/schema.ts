import { z } from 'zod';

export const schema = z.object({
	first_name: z.string().min(2, 'Too short'),
	last_name: z.string().min(2, 'Too short'),
	email: z.string().email('Invalid email'),
	username: z.string().min(4, 'Too short'),
	password: z.string().min(4, 'Too short')
  });