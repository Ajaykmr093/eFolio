import { z } from 'zod';

export type User = z.infer<typeof UserSchema>;

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
  seller_profile: z.string().optional()
});

export const SignupSchema = UserSchema.pick({
  username: true,
  email: true,
  password: true
}).extend({
  name: UserSchema.shape.name.omit({ full: true })
});

export const LoginSchema = UserSchema.pick({
  password: true
}).extend({
  uid: z.string(),
  remember: z.boolean()
});
