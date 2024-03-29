import { z } from 'zod';

export const BookSchema = z.object({
  id: z.string(),
  title: z.string(),
  cover: z.object({
    small: z.string(),
    medium: z.string()
  }),
  publishDate: z.date().optional(),
  genre: z.string().optional(),
  pageCount: z.number().optional(),
  description: z.string().optional(),
  price: z.number().optional()
});

export type Book = z.infer<typeof BookSchema>;
