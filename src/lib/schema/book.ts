import { z } from 'zod';
import { AuthorSchema } from './author';
import { SellerSchema } from './seller';

export const BookSchema = z.object({
  id: z.string(),
  title: z.string(),
  cover: z.object({
    small: z.string(),
    medium: z.string(),
    large: z.string()
  }).optional(),
  author: AuthorSchema.optional(),
  authorId: z.string().optional(),
  seller: SellerSchema.optional(),
  sellerId: z.string().optional(),
  publishDate: z.date().optional(),
  genre: z.string().optional(),
  pageCount: z.number().optional(),
  description: z.string().optional(),
  price: z.number().optional()
});

export type Book = z.infer<typeof BookSchema>;
