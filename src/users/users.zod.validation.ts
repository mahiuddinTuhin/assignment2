import { z } from "zod";

export const usersZSchema = z
  .object({
    userId: z.number(),
    username: z.string().trim(),
    password: z.string(),
    fullName: z
      .object({
        firstName: z
          .string()
          .trim()
          .min(3, { message: "FirstName must be 3 or more characters long" }),
        lastName: z
          .string()
          .trim()
          .min(3, { message: "LastName must be 3 or more characters long" }),
      })
      .required(),
    age: z.number().positive(),
    email: z.string().email().trim(),
    isActive: z.boolean(),
    hobbies: z.array(z.string()),
    address: z
      .object({
        street: z.string().trim(),
        city: z.string().trim(),
        country: z.string().trim(),
      })
      .required(),
  })
  .required();
