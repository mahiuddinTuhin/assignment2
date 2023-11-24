import { z } from "zod";

export const orderZodSchema = z.object({
  productName: z.string().optional(),
  price: z.number().nonnegative().optional(),
  quantity: z.number().optional(),
  category: z.string().optional(),
  description: z.string().optional(),
  manufacturer: z.string().optional(),
  ratings: z.number().min(0).max(5).nonnegative().optional(),
  inStock: z.boolean().optional(),
});
