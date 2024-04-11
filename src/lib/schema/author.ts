import { z } from 'zod';

export const AuthorSchema = z.object({
  id: z.string(),
  name: z.string(),
  cover: z.object({
    small: z.string(),
    medium: z.string()
  })
});
