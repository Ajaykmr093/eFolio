import { z } from 'zod';

export const BookSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  cover_url: z.string(),
  publish_date: z.date().optional(),
  description: z.string().optional(),
  language: z.string().optional(),
  sample_url: z.string().optional(),
  price: z.number().optional(),
  discount: z.number().min(0).max(100).optional(),
  book_url: z.string().optional(),
  seller_id: z.string().optional()
});

export type Book = z.infer<typeof BookSchema>;
