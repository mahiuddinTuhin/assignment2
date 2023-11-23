"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersZSchema = void 0;
const zod_1 = require("zod");
exports.usersZSchema = zod_1.z
    .object({
    userId: zod_1.z.number(),
    username: zod_1.z.string().trim(),
    password: zod_1.z.string(),
    fullName: zod_1.z
        .object({
        firstName: zod_1.z
            .string()
            .trim()
            .min(5, { message: "Must be 5 or more characters long" }),
        lastName: zod_1.z
            .string()
            .trim()
            .max(5, { message: "Must be 5 or fewer characters long" }),
    })
        .required(),
    age: zod_1.z.number().positive(),
    email: zod_1.z.string().email().trim(),
    isActive: zod_1.z.boolean(),
    hobbies: zod_1.z.array(zod_1.z.string()),
    address: zod_1.z
        .object({
        street: zod_1.z.string().trim(),
        city: zod_1.z.string().trim(),
        country: zod_1.z.string().trim(),
    })
        .required(),
})
    .required();
