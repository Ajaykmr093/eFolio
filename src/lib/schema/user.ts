import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  name: z.object({
    first: z.string().max(20),
    last: z.string().max(20),
    full: z.string().max(40)
  }),
  email: z.string().email().max(50),
  username: z.string().min(4),
  password: z.string().min(4),
  created_at: z.date(),
  is_seller: z.boolean()
});

export type User = z.infer<typeof UserSchema>;
