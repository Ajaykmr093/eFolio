import { UserSchema } from '$lib/schema/user';
import { z } from 'zod';

export const loginSchema = UserSchema.pick({ password: true }).extend({
  uid: z.string(),
  remember: z.boolean()
});
