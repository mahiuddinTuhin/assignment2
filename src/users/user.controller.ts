/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import { userServices } from "./users.services";
import { usersZSchema } from "./users.zod.validation";

const createUser = async (req: Request, res: Response) => {
  const body = req.body;
  try {
    const zResult = usersZSchema.safeParse(body);

    if (!zResult.success) {
      return res.status(400).json({
        success: false,
        message: "Data validation failed",
        data: zResult.error,
      });
    }

    const result = await userServices.createUser(body);

    const { password, _id, ...filteredData } = result.toObject();

    return res.status(200).json({
      success: true,
      message: "User created successfully!",
      data: filteredData,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: "Failed to create user.",
      error: error.message,
    });
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUser();
    return res.status(200).json({
      success: true,
      message: "Users fetched successfully!",
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return res.status(200).json({
      success: false,
      message: "Failed to fetched users!",
      error: error.message,
    });
  }
};

const findUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.uid;
    const result = await userServices.findUserById(id);
    return res.status(200).json({
      success: true,
      message: "User fetched successfully!",
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return res.status(404).json({
      success: false,
      message: "Failed to retrieve user data",
      data: error.message,
    });
  }
};

const deleteUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.uid;
    const result = await userServices.deleteUserById(id);
    return res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      data: null,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: "Failed to delete data",
      data: error.message,
    });
  }
};

const updateUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.uid;
    const data = req.body;

    const result = await userServices.updateUserById(id, data);

    return res.status(200).json({
      success: true,
      message: "User updated successfully!",
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: "Failed to update user data",
      error: error.message,
    });
  }
};

const deleteAllUser = async (req: Request, res: Response) => {
  try {
    console.log("hittt");
    const result = await userServices.deleteAllUser();
    res.status(200).json({ result });
  } catch (error: unknown) {
    res.status(500).json({ message: error });
  }
};

export const userController = {
  getAllUser,
  createUser,
  findUserById,
  deleteUserById,
  updateUserById,
  deleteAllUser,
};
