import { z } from 'zod';

export const loginSchema = z.object({
  uid: z.string(),
  password: z.string().min(4, 'Too short'),
  remember: z.boolean()
});
