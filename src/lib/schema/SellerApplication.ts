import { z } from 'zod';
import { UserSchema } from './User';
import { SellerSchema } from './Seller';

export type SellerApplication = z.infer<typeof SellerApplicationSchema>;

export const SellerApplicationSchema = z.object({
  id: z.string(),
  document: z.string(),
  applicationStatus: z.enum(['pending', 'approved', 'rejected']),
  applicationDate: z.date(),
  remark: z.string(),
  user: z.string().or(UserSchema),
  seller: z.string().or(SellerSchema)
});
