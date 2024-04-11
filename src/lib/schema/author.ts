import { z } from 'zod';

export const AuthorSchema = z.object({
  id: z.string(),
  name: z.string().max(40),
  about: z.string().max(4096),
  is_verified: z.boolean()
});
