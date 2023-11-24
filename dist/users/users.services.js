"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const users_model_1 = require("./users.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
/* 1. Create a new user service */
const createUser = async (data) => {
    try {
        /* checking if user id or username already existed or not */
        const isExisted = await users_model_1.User.findOne({
            $or: [{ userId: data.userId }, { username: data.username }],
        });
        if (isExisted) {
            throw new Error("User id or username already existed.");
        }
        /* encrypting the password with bcrypt */
        const hashedPass = await bcrypt_1.default.hash(data.password, 10);
        data.password = hashedPass;
        /* finally creating user */
        const result = await users_model_1.User.create(data);
        return result;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        throw new Error(error);
    }
};
/* 2. Retrieve a list of all users service */
const getAllUser = async () => {
    try {
        const result = await users_model_1.User.aggregate([
            {
                $project: {
                    password: 0,
                    isActive: 0,
                    hobbies: 0,
                    orders: 0,
                    userId: 0,
                    _id: 0,
                },
            },
        ]);
        return result;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        throw new Error(error);
    }
};
/* 3. Retrieve a specific user by ID service */
const findUserById = async (id) => {
    try {
        const result = await users_model_1.User.aggregate([
            { $match: { userId: parseInt(id) } },
            {
                $project: {
                    password: 0,
                    _id: 0,
                    orders: 0,
                },
            },
        ]);
        if (result.length > 0) {
            return result[0];
        }
        else {
            throw new Error("Failed to get data!");
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        throw new Error(error);
    }
};
/* 4. Update user information service*/
const updateUserById = async (id, data) => {
    try {
        /* encrypting the password with bcrypt */
        const hashedPass = await bcrypt_1.default.hash(data.password, 10);
        data.password = hashedPass;
        const result = await users_model_1.User.findOneAndUpdate({ userId: parseInt(id) }, data, {
            new: true,
        })
            .select("-orders -password -_id")
            .sort({ createdAt: -1 });
        console.log(result);
        if (!result) {
            throw new Error("User not found!");
        }
        return result;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        throw new Error(error);
    }
};
/* 5. Delete a user service */
const deleteUserById = async (id) => {
    try {
        const result = await users_model_1.User.findOneAndDelete({ userId: id });
        if (!result) {
            throw new Error("User not found");
        }
        return result;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        throw new Error(error);
    }
};
const deleteAllUser = async () => {
    const result = await users_model_1.User.deleteMany({});
    return result;
};
exports.userServices = {
    getAllUser,
    createUser,
    findUserById,
    deleteUserById,
    updateUserById,
    deleteAllUser,
};
