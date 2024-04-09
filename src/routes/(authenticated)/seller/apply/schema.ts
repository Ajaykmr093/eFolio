import { SellerSchema } from '$lib/schema/seller';
import { z } from 'zod';

export const SellerApplicationSchema = SellerSchema.omit({ id: true }).extend({
  document: z.instanceof(File),
  password: z.string()
});
