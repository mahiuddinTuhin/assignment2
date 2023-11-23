import express from "express";
import { userController } from "./user.controller";

const users = express.Router();

users.get("/", userController.getAllUser);
users.get("/:uid", userController.findUserById);
users.delete("/:uid", userController.deleteUserById);
users.post("/", userController.createUser);
users.put("/:uid", userController.updateUserById);
users.delete("/all", userController.deleteAllUser);

export const userRouter = users;
