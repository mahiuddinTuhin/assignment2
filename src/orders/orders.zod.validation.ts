import { z } from "zod";

export const orderZodSchema = z.object({
  productName: z.string(),
  price: z.number().nonnegative(),
  quantity: z.number(),
  category: z.string(),
  description: z.string(),
  manufacturer: z.string(),
  ratings: z.number().min(0).max(5).nonnegative(),
  inStock: z.boolean(),
});
