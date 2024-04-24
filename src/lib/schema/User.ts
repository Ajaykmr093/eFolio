import { z } from 'zod';

export type User = z.infer<typeof UserSchema>;

export const UserSchema = z.object({
  id: z.string(),
  name: z.object({
    first: z.string().min(1).max(20),
    last: z.string().min(1).max(20),
    full: z.string().min(2).max(40)
  }),
  email: z.string().email().max(50),
  username: z.string().min(4).max(30),
  password: z.string().min(4).max(20),
  createdAt: z.date(),
  isAdmin: z.boolean()
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
