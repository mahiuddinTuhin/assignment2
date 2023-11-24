import mongoose from "mongoose";
import { userSchema } from "./users.schema";
import { IUserStaticModel, TUser } from "./users.interface";

export const User = mongoose.model<TUser, IUserStaticModel>(
  "Users",
  userSchema
);
