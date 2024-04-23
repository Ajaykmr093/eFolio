import { z } from 'zod';

export type Seller = z.infer<typeof SellerSchema>;
export type SellerApplication = z.infer<typeof SellerApplicationSchema>;

export const SellerSchema = z.object({
  id: z.string(),
  name: z.string().max(40),
  email: z.string().email().max(50)
});

export const SubmitSellerApplicationSchema = SellerSchema.omit({ id: true }).extend({
  document: z.instanceof(File),
  password: z.string()
});

export const SellerApplicationSchema = SellerSchema.extend({
  document: z.string(),
});
