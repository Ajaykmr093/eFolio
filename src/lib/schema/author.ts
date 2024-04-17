import { z } from 'zod';

export const AuthorSchema = z.object({
  id: z.string(),
  name: z.string().max(40),
  about: z.string().max(4096),
  is_verified: z.boolean()
});

export const AddAuthorSchema = AuthorSchema.pick({
  name: true,
  about: true
});

export const SearchAuthorSchema = z.object({
  q: z.string()
});
