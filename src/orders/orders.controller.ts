/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import { ordersServices } from "./orders.services";
import { orderZodSchema } from "./orders.zod.validation";
import { User } from "../users/users.model";

/* creat user controller */
const createOrder = async (req: Request, res: Response) => {
  const body = req.body;
  const userId = req.baseUrl.split("/")[3];

  try {
    /* checking user available or not */
    const existed = await User.isExisted(Number(userId));
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

    /* checking zod validation */
    const zod = orderZodSchema.safeParse(body);

    if (!zod.success) {
      return res.status(400).json({
        success: false,
        message: "Data validation failed",
        data: zod.error,
      });
    }

    /* creating user */
    const result = await ordersServices.createOrder(body, parseInt(userId));

    return res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: null,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    res.send(error);
  }
};

/* get all user controller */
const getAllOrdersById = async (req: Request, res: Response) => {
  try {
    const userId = req.baseUrl.split("/")[3];

    /* checking user available or not */
    const existed = await User.isExisted(Number(userId));
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

    /* finding orders by id */
    const result = await ordersServices.getAllOrdersById(userId);
    return res.status(200).json({
      success: true,
      message: "Order fetched successfully!",
      data: result[0],
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const status = error.errors.status;
    const message = error.errors.message;
    return res.status(status).json({
      success: false,
      status,
      message,
    });
  }
};

// 3. Calculate Total Price of Orders for a Specific User
const getTotalPriceById = async (req: Request, res: Response) => {
  try {
    const userId = req.baseUrl.split("/")[3];

    /* checking user available or not */
    const existed = await User.isExisted(Number(userId));
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

    /* finding total price by id */
    const result = await ordersServices.getTotalPriceById(userId);
    return res.status(200).json({
      success: true,
      message: "Total price calculated successfully!",
      data: result[0],
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const status = error.errors.status;
    const message = error.errors.message;
    return res.status(status).json({
      success: false,
      status,
      message,
    });
  }
};

export const ordersController = {
  getAllOrdersById,
  getTotalPriceById,
  createOrder,
};
