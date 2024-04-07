import { BookSchema } from '$lib/schema/book';
import { z } from 'zod';

export const SellerBookPostSchema = BookSchema.omit({
  sample_url: true,
  cover_url: true,
  book_url: true,
  seller_id: true,
  id: true
}).extend({
  cover: z.instanceof(File),
  book: z.instanceof(File),
  sample_book: z.instanceof(File)
});

export type SellerBookPost = z.infer<typeof SellerBookPostSchema>;
