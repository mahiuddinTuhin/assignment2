"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordersServices = void 0;
const users_model_1 = require("../users/users.model");
/* 1. Create a new user service */
const createOrder = async (data, id) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const result = await users_model_1.User.aggregate([
            {
                $match: { userId: id },
            },
            {
                $addFields: {
                    orders: {
                        $ifNull: ["$orders", { $literal: [] }],
                    },
                },
            },
            {
                $addFields: {
                    orders: {
                        $concatArrays: ["$orders", [{ ...data }]],
                    },
                },
            },
            {
                $merge: {
                    into: "users",
                    whenMatched: "merge",
                    whenNotMatched: "insert",
                },
            },
        ]);
        return result;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        return error;
    }
};
/* 2. Retrieve a list of all users service */
const getAllOrdersById = async (id) => {
    // const user = await User.isUserExisted(parseInt(id));
    try {
        const result = await users_model_1.User.aggregate([
            {
                $match: { userId: id },
            },
            {
                $project: {
                    // userId: 0,
                    // userName:0
                    orders: {
                        $map: {
                            input: "$orders",
                            as: "order",
                            in: {
                                productName: "$$order.productName",
                                price: "$$order.price",
                                quantity: "$$order.quantity",
                            },
                        },
                    },
                    _id: 0,
                    // "orders.description": 0,
                },
            },
            {
                $match: {
                    "orders.productName": { $exists: true },
                },
            },
        ]);
        return result;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        return error;
    }
};
/* 3. Calculate Total Price of Orders for a Specific User */
const getTotalPriceById = async (id) => {
    try {
        const result = await users_model_1.User.aggregate([
            {
                $match: { userId: parseInt(id) },
            },
            {
                $unwind: "$orders",
            },
            {
                $group: {
                    _id: "$_id",
                    totalPrice: { $sum: "$orders.price" },
                },
            },
            {
                $project: {
                    _id: 0,
                    totalPrice: {
                        $round: ["$totalPrice", 2],
                    },
                },
            },
        ]);
        return result;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        return error;
    }
};
exports.ordersServices = {
    getAllOrdersById,
    createOrder,
    getTotalPriceById,
};
