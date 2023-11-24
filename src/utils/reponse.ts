import { Response } from "express";

export const responseMessage = (
  res: Response,
  status: number,
  message: string,
  data: unknown,
) => {
  res.status(status).json({
    success: status === 200 ? true : false,
    message,
    data: data,
  });
};
