import { z } from 'zod';

export const BookSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  cover_url: z.string(),
  publish_date: z.date().optional(),
  description: z.string().optional()
});

export type Book = z.infer<typeof BookSchema>;
