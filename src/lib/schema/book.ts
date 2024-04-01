import { z } from 'zod';

export const BookSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  cover: z.object({
    small: z.string().optional(),
    medium: z.string()
  }),
  publishDate: z.date().optional(),
  description: z.string().optional()
});

export type Book = z.infer<typeof BookSchema>;
