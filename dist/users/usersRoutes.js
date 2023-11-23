"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const users = express_1.default.Router();
users.get("/", user_controller_1.userController.getAllUser);
users.get("/:uid", user_controller_1.userController.findUserById);
users.delete("/:uid", user_controller_1.userController.deleteUserById);
users.post("/", user_controller_1.userController.createUser);
users.put("/:uid", user_controller_1.userController.updateUserById);
users.delete("/all", user_controller_1.userController.deleteAllUser);
exports.userRouter = users;
