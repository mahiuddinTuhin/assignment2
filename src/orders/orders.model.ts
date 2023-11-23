import mongoose from "mongoose";
import { ordersSchema } from "./orders.schema";

export const Orders = mongoose.model("Orders", ordersSchema);
