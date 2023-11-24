/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import { userServices } from "./users.services";
import { usersZSchema } from "./users.zod.validation";
import { User } from "./users.model";

/* creat user controller */
const createUser = async (req: Request, res: Response) => {
  console.log("create user hit");
  const body = req.body;
  try {
    const existed = await User.isExisted(Number(body.userId));
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
    const zod = usersZSchema.safeParse(body);

    if (!zod.success) {
      return res.status(400).json({
        success: false,
        message: "Data validation failed",
        data: zod.error,
      });
    }

    /* creating user */
    const result = await userServices.createUser(body);

    /* filtering password and -id  */
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

/* get all user controller */
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

/* finding user by id controller*/
const findUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;

    const existed = await User.isExisted(Number(id));
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

/* updating user by id controller*/
const updateUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const data = req.body;

    const existed = await User.isExisted(Number(id));
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

    const zod = usersZSchema.safeParse(data);
    console.log(zod);
    if (!zod.success) {
      return res.status(400).json({
        success: false,
        message: "Data validation failed",
        data: zod.error,
      });
    }

    /* updating existing field */
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

/* deleting user by id controller */
const deleteUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;

    const existed = await User.isExisted(Number(id));
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

/* delete all user controller */
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
