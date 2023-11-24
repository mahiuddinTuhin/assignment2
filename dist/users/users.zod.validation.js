"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersZSchema = void 0;
const zod_1 = require("zod");
const passwordRegex = /^(?=.*[!@#$%^&*])[\w!@#$%^&*]{6,}$/;
const nameRegex = /^[A-Za-z -]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
exports.usersZSchema = zod_1.z.object({
    /* user id */
    userId: zod_1.z.number().positive(),
    /* username */
    username: zod_1.z
        .string()
        .trim()
        .min(3, { message: "Username can't be less then 3 characters." })
        .max(20, { message: "Username can't be more then 20 characters." }),
    /* password */
    password: zod_1.z
        .string()
        .min(6, { message: "Password can't be less then 3 characters." })
        .regex(passwordRegex, {
        message: "Password must contain special characters.",
    }),
    /* fullname */
    fullName: zod_1.z
        .object({
        firstName: zod_1.z
            .string()
            .trim()
            .min(3, { message: "FirstName must be 3 or more characters long" })
            .regex(nameRegex, {
            message: "Name can only contain letters, spaces, or hyphens",
        }),
        lastName: zod_1.z
            .string()
            .trim()
            .min(3, { message: "LastName must be 3 or more characters long" })
            .regex(nameRegex, {
            message: "Name can only contain letters, spaces, or hyphens",
        }),
    })
        .required(),
    /* age */
    age: zod_1.z.number().positive(),
    /* email */
    email: zod_1.z
        .string()
        .email()
        .trim()
        .regex(emailRegex, { message: "Invalid email format" }),
    /* is active */
    isActive: zod_1.z.boolean(),
    /* hobbies */
    hobbies: zod_1.z.array(zod_1.z.string()),
    /* address */
    address: zod_1.z
        .object({
        street: zod_1.z.string().trim(),
        city: zod_1.z.string().trim(),
        country: zod_1.z.string().trim(),
    })
        .required(),
});
