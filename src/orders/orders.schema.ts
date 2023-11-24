import { Schema } from "mongoose";

import { TOrders } from "./orders.interface";

export const ordersSchema = new Schema<TOrders>(
  {
    price: {
      type: Number,
      // required: [true, "Must need a price"],
      unique: true,
    },
    productName: {
      type: String,
      // required: [true, "Must need an product Name"],
      trim: true,
      minlength: [3, "User Name should contain minimum 3 character."],
      maxlength: [20, "User Name should not have more then 20 character."],
    },
    quantity: {
      type: Number,
      // required: [true, "Must need quantity."],
    },
    category: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    manufacturer: {
      type: String,
      trim: true,
    },
    ratings: {
      type: Number,
    },
    inStock: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false },
);
