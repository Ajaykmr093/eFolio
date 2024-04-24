import { z } from 'zod';

export type Seller = z.infer<typeof SellerSchema>;

export const SellerSchema = z.object({
  id: z.string(),
  name: z.string().max(40),
  email: z.string().email().max(50)
});

export const BecomeSellerSchema = SellerSchema.omit({ id: true }).extend({
  document: z.instanceof(File),
  password: z.string()
});
