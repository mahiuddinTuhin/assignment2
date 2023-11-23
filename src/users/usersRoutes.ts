import express from "express";
import { userController } from "./user.controller";

const users = express.Router();

/* 1. Create a new user */
users.post("/", userController.createUser);

/* 2. Retrieve a list of all users */
users.get("/", userController.getAllUser);

/* 3. Retrieve a specific user by ID */
users.get("/:userId", userController.findUserById);

/* 4. Update user information */
users.put("/:userId", userController.updateUserById);

/* 5. Delete a user */
users.delete("/:userId", userController.deleteUserById);

/* delete all users */
users.delete("/all-users", userController.deleteAllUser);

export const userRouter = users;
