import { SellerSchema } from "$lib/schema/seller";

export const SellerApplicationSchema = SellerSchema.omit({ id: true });