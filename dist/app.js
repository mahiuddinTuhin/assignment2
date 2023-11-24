"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const usersRoutes_1 = require("./users/usersRoutes");
const ordersRoutes_1 = require("./orders/ordersRoutes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/users", usersRoutes_1.userRouter);
app.use("/api/users/:userId/orders/", ordersRoutes_1.ordersRoutes);
app.all("/", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running well.",
    });
});
app.all("/*", (_req, res) => {
    res.status(500).json({
        success: false,
        message: "Incorrect route!",
    });
});
exports.default = app;
