import mongoose from "mongoose";
import { userSchema } from "./users.schema";

export const User = mongoose.model("Users", userSchema);
