"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const users = express_1.default.Router();
/* 3. Retrieve a specific user by ID */
users.get("/:userId", user_controller_1.userController.findUserById);
/* 1. Create a new user */
users.post("/", user_controller_1.userController.createUser);
/* 2. Retrieve a list of all users */
users.get("/", user_controller_1.userController.getAllUser);
/* 4. Update user information */
users.put("/:userId", user_controller_1.userController.updateUserById);
/* 5. Delete a user */
users.delete("/:userId", user_controller_1.userController.deleteUserById);
/* delete all users */
users.delete("/all-users", user_controller_1.userController.deleteAllUser);
exports.userRouter = users;
