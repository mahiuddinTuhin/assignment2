import express from "express";
import { userController } from "./orders.controller";

const users = express.Router();

/* 1. Create a new order */
users.put("/", userController.createOrder);

export const ordersRoutes = users;
