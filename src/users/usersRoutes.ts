import express, { Request, Response } from "express";

const users = express.Router();

users.get("/", (req: Request, res: Response) => {
  res.send("User get routing working");
});

export const userRouter = users;
