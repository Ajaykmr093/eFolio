import { z } from 'zod';

export type Admin = z.infer<typeof AdminSchema>;

export const AdminSchema = z.object({
  id: z.string(),
  username: z.string().min(4).max(30),
  password: z.string().min(4).max(20)
});

export const AdminLoginSchema = AdminSchema.omit({ id: true });
