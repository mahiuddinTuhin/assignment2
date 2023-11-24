"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordersRoutes = void 0;
const express_1 = __importDefault(require("express"));
const orders_controller_1 = require("./orders.controller");
const users = express_1.default.Router();
/* 1. Create a new order */
users.put("/", orders_controller_1.ordersController.createOrder);
/* 2.  Retrieve all orders for a specific user*/
users.get("/", orders_controller_1.ordersController.getAllOrdersById);
/* 3. Calculate Total Price of Orders for a Specific User */
users.get("/total-price", orders_controller_1.ordersController.getTotalPriceById);
exports.ordersRoutes = users;
