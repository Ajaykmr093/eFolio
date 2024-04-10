import { z } from 'zod';
import { SellerSchema } from './seller';

export const BookSchema = z.object({
  id: z.string(),
  title: z.string().max(250),
  cover_url: z.string().max(250),
  publish_date: z.date(),
  description: z.string().max(4096),
  language: z.string().max(50),
  sample_url: z.string().max(250),
  price: z.number(),
  discount: z.number().min(0).max(100),
  book_url: z.string().max(250),
  seller: SellerSchema
});

export type Book = z.infer<typeof BookSchema>;
