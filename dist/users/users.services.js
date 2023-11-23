"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const users_model_1 = require("./users.model");
const getAllUser = async () => {
    const result = await users_model_1.User.find();
    return result;
};
const createUser = async (data) => {
    const isExisted = await users_model_1.User.findOne({ userId: data.userId });
    if (isExisted) {
        return "user id already existed";
    }
    const user = new users_model_1.User(data);
    const result = await user.save();
    return result;
};
const findUserById = async (id) => {
    const result = await users_model_1.User.findOne({ userId: id });
    return result;
};
const deleteUserById = async (id) => {
    const result = await users_model_1.User.deleteOne({ userId: id });
    console.log(result);
    return result;
};
const updateUserById = async (id, data) => {
    const result = await users_model_1.User.updateOne({ id }, data);
    console.log(result);
    return result;
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
