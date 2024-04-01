import { z } from 'zod';

export const SellerBookPostSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  cover: z.instanceof(File),
  publishDate: z.date(),
  price: z.number(),
  discount: z.number().min(0).max(100),
  book: z.instanceof(File)
});

export type SellerBookPost = z.infer<typeof SellerBookPostSchema>;
