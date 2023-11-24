"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordersController = void 0;
const orders_services_1 = require("./orders.services");
const orders_zod_validation_1 = require("./orders.zod.validation");
const users_model_1 = require("../users/users.model");
/* creat user controller */
const createOrder = async (req, res) => {
    const body = req.body;
    const userId = req.baseUrl.split("/")[3];
    try {
        /* checking user available or not */
        const existed = await users_model_1.User.isExisted(Number(userId));
        if (!existed) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!",
                },
            });
        }
        /* checking zod validation */
        const zod = orders_zod_validation_1.orderZodSchema.safeParse(body);
        if (!zod.success) {
            return res.status(400).json({
                success: false,
                message: "Data validation failed",
                data: zod.error,
            });
        }
        /* checking empty object */
        if (Object.values(body).length === 0 || !body) {
            return res.status(400).json({
                success: false,
                message: "Empty object",
            });
        }
        /* creating user */
        const result = await orders_services_1.ordersServices.createOrder(body, parseInt(userId));
        if (!result) {
            return res.status(400).json({
                success: false,
                message: "Internal server error.",
                error: "Failed to create orders."
            });
        }
        return res.status(200).json({
            success: true,
            message: "Order created successfully!",
            data: null,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        console.log(error);
        res.send(error);
    }
};
/* get all user controller */
const getAllOrdersById = async (req, res) => {
    try {
        const userId = req.baseUrl.split("/")[3];
        /* checking user available or not */
        const existed = await users_model_1.User.isExisted(Number(userId));
        if (!existed) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!",
                },
            });
        }
        /* finding orders by id */
        const result = await orders_services_1.ordersServices.getAllOrdersById(Number(userId));
        return res.status(200).json({
            success: true,
            message: "Order fetched successfully!",
            data: result[0],
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        const status = error.errors.status;
        const message = error.errors.message;
        return res.status(status).json({
            success: false,
            status,
            message,
        });
    }
};
// 3. Calculate Total Price of Orders for a Specific User
const getTotalPriceById = async (req, res) => {
    try {
        const userId = req.baseUrl.split("/")[3];
        /* checking user available or not */
        const existed = await users_model_1.User.isExisted(Number(userId));
        if (!existed) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!",
                },
            });
        }
        /* finding total price by id */
        const result = await orders_services_1.ordersServices.getTotalPriceById(userId);
        return res.status(200).json({
            success: true,
            message: "Total price calculated successfully!",
            data: result[0],
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        const status = error.errors.status;
        const message = error.errors.message;
        return res.status(status).json({
            success: false,
            status,
            message,
        });
    }
};
exports.ordersController = {
    getAllOrdersById,
    getTotalPriceById,
    createOrder,
};
