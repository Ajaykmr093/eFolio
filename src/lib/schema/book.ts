import { z } from 'zod';
import { SellerSchema } from './seller';
import { AuthorSchema } from './author';

export const BookSchema = z.object({
  id: z.string(),
  title: z.string().min(3).max(250),
  coverUrl: z.string().min(3).max(250),
  publishDate: z.date(),
  publication: z.string().min(3).max(250),
  isbn: z.string().min(3).max(20),
  description: z.string().min(250).max(4096),
  language: z.string().min(2).max(50),
  totalPages: z
    .number()
    .positive()
    .default('' as unknown as number),
  sampleUrl: z.string().min(3).max(250),
  price: z
    .number()
    .positive()
    .default('' as unknown as number),
  discount: z
    .number()
    .min(0)
    .max(100)
    .positive()
    .default('' as unknown as number),
  bookUrl: z.string().min(3).max(250),
  bookType: z.string().min(2).max(10),
  seller: SellerSchema,
  author: AuthorSchema
});

export type Book = z.infer<typeof BookSchema>;
