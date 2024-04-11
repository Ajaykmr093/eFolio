import { z } from 'zod';
import { SellerSchema } from './seller';
import { AuthorSchema } from './author';

export const BookSchema = z.object({
  id: z.string(),
  title: z.string().max(250),
  cover_url: z.string().max(250),
  publish_date: z.date(),
  publication: z.string().max(250),
  isbn: z.string().max(20),
  description: z.string().max(4096),
  language: z.string().max(50),
  total_pages: z.number(),
  sample_url: z.string().max(250),
  price: z.number(),
  discount: z.number().min(0).max(100),
  book_url: z.string().max(250),
  book_type: z.string().max(10),
  seller: SellerSchema,
  author: AuthorSchema
});

export type Book = z.infer<typeof BookSchema>;
