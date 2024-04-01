import { z } from 'zod';

export const SellerSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email('Invalid email'),
  photo: z.string().optional(),
  is_verified: z.boolean()
});

export type Seller = z.infer<typeof SellerSchema>;
