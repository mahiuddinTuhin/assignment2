import { z } from "zod";
const passwordRegex = /^(?=.*[!@#$%^&*])[\w!@#$%^&*]{6,}$/;
const nameRegex = /^[A-Za-z -]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const usersZSchema = z.object({
  /* user id */
  userId: z.number().positive(),

  /* username */
  username: z
    .string()
    .trim()
    .min(3, { message: "Username can't be less then 3 characters." })
    .max(20, { message: "Username can't be more then 20 characters." }),

  /* password */
  password: z
    .string()
    .min(6, { message: "Password can't be less then 3 characters." })
    .regex(passwordRegex, {
      message: "Password must contain special characters.",
    }),

  /* fullname */
  fullName: z
    .object({
      firstName: z
        .string()
        .trim()
        .min(3, { message: "FirstName must be 3 or more characters long" })
        .regex(nameRegex, {
          message: "Name can only contain letters, spaces, or hyphens",
        }),
      lastName: z
        .string()
        .trim()
        .min(3, { message: "LastName must be 3 or more characters long" })
        .regex(nameRegex, {
          message: "Name can only contain letters, spaces, or hyphens",
        }),
    })
    .required(),

  /* age */
  age: z.number().positive(),

  /* email */
  email: z
    .string()
    .email()
    .trim()
    .regex(emailRegex, { message: "Invalid email format" }),

  /* is active */
  isActive: z.boolean(),

  /* hobbies */
  hobbies: z.array(z.string()),

  /* address */
  address: z
    .object({
      street: z.string().trim(),
      city: z.string().trim(),
      country: z.string().trim(),
    })
    .required(),
});
