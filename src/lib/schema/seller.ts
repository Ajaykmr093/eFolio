import { z } from 'zod';

export const SellerSchema = z.object({
  id: z.string(),
  name: z.string().max(40),
  email: z.string().email().max(50),
});

export type Seller = z.infer<typeof SellerSchema>;
