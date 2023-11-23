import express from "express";
import { ordersController } from "./orders.controller";

const users = express.Router();

/* 1. Create a new order */
users.put("/", ordersController.createOrder);

/* 2.  Retrieve all orders for a specific user*/
users.get("/", ordersController.getAllOrdersById);

/* 3. Calculate Total Price of Orders for a Specific User */
users.get("/total-price", ordersController.getTotalPriceById);

export const ordersRoutes = users;
