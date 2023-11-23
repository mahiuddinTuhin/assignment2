import express from "express";
import cors from "cors";
import { userRouter } from "./users/usersRoutes";
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/users", userRouter);

export default app;
