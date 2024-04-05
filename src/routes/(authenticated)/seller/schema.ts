import { BookSchema } from '$lib/schema/book';
import { z } from 'zod';

export const SellerBookEntrySchema = z.object({
  book: BookSchema.pick({ title: true, cover_url: true, id: true }),
  price: z.number(),
  discount: z.number(),
  id: z.string()
});

export type SellerBookEntry = z.infer<typeof SellerBookEntrySchema>;
