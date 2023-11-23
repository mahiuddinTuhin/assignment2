import { Request, Response } from "express";
import { userServices } from "./users.services";
import { responseMessage } from "../utils/reponse";

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUser();
    res.status(400).json(result);
  } catch (error) {
    res.status(200).json(error);
  }
};

const createUser = async (req: Request, res: Response) => {
  const body = req.body;
  try {
    const result = await userServices.createUser(body);

    res.status(200).json({
      success: true,
      message: "Successfully created the student data.",
      data: result,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const findUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.uid;
    const result = await userServices.findUserById(id);
    res.status(400).json(result);
  } catch (error) {
    res.status(200).json(error);
  }
};

const deleteUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.uid;
    const result = await userServices.deleteUserById(id);
    return res.status(400).json(result);
  } catch (error) {
    res.status(200).json(error);
  }
};

const updateUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.uid;
    const data = req.body;

    const result: unknown = await userServices.updateUserById(id, data);
    const status: number = 200;
    const message: string = "Successfully update data.";
    responseMessage(res, status, message, result);
  } catch (error) {
    const status: number = 400;
    const message: string = "failed to update data";
    responseMessage(res, status, message, error);
  }
};

const deleteAllUser = async (req: Request, res: Response) => {
  try {
    console.log("hittt");
    const result = await userServices.deleteAllUser();
    res.status(500).json({ result });
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
