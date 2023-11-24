"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderZodSchema = void 0;
const zod_1 = require("zod");
exports.orderZodSchema = zod_1.z.object({
    productName: zod_1.z.string().optional(),
    price: zod_1.z.number().nonnegative().optional(),
    quantity: zod_1.z.number().optional(),
    category: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    manufacturer: zod_1.z.string().optional(),
    ratings: zod_1.z.number().min(0).max(5).nonnegative().optional(),
    inStock: zod_1.z.boolean().optional(),
});
