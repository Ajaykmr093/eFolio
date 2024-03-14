import { z } from 'zod';

export const schema = z.object({
	uid: z.string(),
	password: z.string().min(4, 'Too short'),
	remember: z.boolean()
  });