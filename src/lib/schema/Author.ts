import { z } from 'zod';

export type Author = z.infer<typeof AuthorSchema>;

export const AuthorSchema = z.object({
  id: z.string(),
  name: z.string().min(2).max(40),
  about: z.string().min(50).max(4096),
  photo: z.string().min(3).max(250),
  isVerified: z.boolean()
});

export const AddAuthorSchema = AuthorSchema.pick({
  name: true,
  about: true
}).extend({
  photo: z.instanceof(File)
});

export const SearchAuthorSchema = z.object({
  q: z.string().min(3)
});
