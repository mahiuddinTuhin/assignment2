import express, { Request, Response } from "express";
import cors from "cors";
import { userRouter } from "./users/usersRoutes";
import { ordersRoutes } from "./orders/ordersRoutes";
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/users", userRouter);

app.use("/api/users/:userId/orders/", ordersRoutes);

app.all("/*", (req: Request, res: Response) => {
  res.status(500).json({
    success: false,
    message: "Incorrect route!",
  });
});

export default app;
