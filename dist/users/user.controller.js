"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const users_services_1 = require("./users.services");
const users_zod_validation_1 = require("./users.zod.validation");
const users_model_1 = require("./users.model");
/* creat user controller */
const createUser = async (req, res) => {
    console.log("create user hit");
    const body = req.body;
    try {
        const existed = await users_model_1.User.isExisted(Number(body.userId));
        if (existed) {
            return res.status(400).json({
                success: false,
                message: "User already existed.",
                error: {
                    code: 403,
                    description: "User already existed.",
                },
            });
        }
        /* checking zod validation */
        const zod = users_zod_validation_1.usersZSchema.safeParse(body);
        if (!zod.success) {
            return res.status(400).json({
                success: false,
                message: "Data validation failed",
                data: zod.error,
            });
        }
        /* creating user */
        const result = await users_services_1.userServices.createUser(body);
        /* filtering password and -id  */
        const { password, _id, ...filteredData } = result.toObject();
        return res.status(200).json({
            success: true,
            message: "User created successfully!",
            data: filteredData,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: "Failed to create user.",
            error: error.message,
        });
    }
};
/* get all user controller */
const getAllUser = async (_req, res) => {
    try {
        const result = await users_services_1.userServices.getAllUser();
        return res.status(200).json({
            success: true,
            message: "Users fetched successfully!",
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        return res.status(200).json({
            success: false,
            message: "Failed to fetched users!",
            error: error.message,
        });
    }
};
/* finding user by id controller*/
const findUserById = async (req, res) => {
    try {
        const id = req.params.userId;
        const existed = await users_model_1.User.isExisted(Number(id));
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
        const result = await users_services_1.userServices.findUserById(id);
        return res.status(200).json({
            success: true,
            message: "User fetched successfully!",
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        return res.status(404).json({
            success: false,
            message: "Failed to retrieve user data",
            data: error.message,
        });
    }
};
/* updating user by id controller*/
const updateUserById = async (req, res) => {
    try {
        const id = req.params.userId;
        const data = req.body;
        const existed = await users_model_1.User.isExisted(Number(id));
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
        const zod = users_zod_validation_1.usersZSchema.safeParse(data);
        console.log(zod);
        if (!zod.success) {
            return res.status(400).json({
                success: false,
                message: "Data validation failed",
                data: zod.error,
            });
        }
        /* updating existing field */
        const result = await users_services_1.userServices.updateUserById(id, data);
        return res.status(200).json({
            success: true,
            message: "User updated successfully!",
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: "Failed to update user data",
            error: error.message,
        });
    }
};
/* deleting user by id controller */
const deleteUserById = async (req, res) => {
    try {
        const id = req.params.userId;
        const existed = await users_model_1.User.isExisted(Number(id));
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
        const result = await users_services_1.userServices.deleteUserById(id);
        if (!result) {
            return res.status(400).json({
                success: false,
                message: "Internal Server error",
                error: "Failed to delete the user!"
            });
        }
        return res.status(200).json({
            success: true,
            message: "User deleted successfully!",
            data: null,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: "Failed to delete data",
            data: error.message,
        });
    }
};
/* delete all user controller */
const deleteAllUser = async (_req, res) => {
    try {
        console.log("hittt");
        const result = await users_services_1.userServices.deleteAllUser();
        res.status(200).json({ result });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
};
exports.userController = {
    getAllUser,
    createUser,
    findUserById,
    deleteUserById,
    updateUserById,
    deleteAllUser,
};
