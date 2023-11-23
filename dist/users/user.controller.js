"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const users_services_1 = require("./users.services");
const reponse_1 = require("../utils/reponse");
const getAllUser = async (req, res) => {
    try {
        const result = await users_services_1.userServices.getAllUser();
        res.status(400).json(result);
    }
    catch (error) {
        res.status(200).json(error);
    }
};
const createUser = async (req, res) => {
    try {
        const body = req.body;
        const result = await users_services_1.userServices.createUser(body);
        res.status(400).json(result);
    }
    catch (error) {
        res.status(200).json(error);
    }
};
const findUserById = async (req, res) => {
    try {
        const id = req.params.uid;
        const result = await users_services_1.userServices.findUserById(id);
        res.status(400).json(result);
    }
    catch (error) {
        res.status(200).json(error);
    }
};
const deleteUserById = async (req, res) => {
    try {
        const id = req.params.uid;
        const result = await users_services_1.userServices.deleteUserById(id);
        return res.status(400).json(result);
    }
    catch (error) {
        res.status(200).json(error);
    }
};
const updateUserById = async (req, res) => {
    try {
        const id = req.params.uid;
        const data = req.body;
        const result = await users_services_1.userServices.updateUserById(id, data);
        const status = 200;
        const message = "Successfully update data.";
        (0, reponse_1.responseMessage)(res, status, message, result);
    }
    catch (error) {
        const status = 400;
        const message = "failed to update data";
        (0, reponse_1.responseMessage)(res, status, message, error);
    }
};
const deleteAllUser = async (req, res) => {
    console.log("hittt");
    try {
        const result = await users_services_1.userServices.deleteAllUser();
        res.status(400).json(result);
    }
    catch (error) {
        res.status(200).json(error);
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
