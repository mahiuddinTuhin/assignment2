"use strict";
// import { Model } from "mongoose";
// import { TUser } from "./users.interface";
// import { userSchema } from "./users.schema";
// import { User } from "./users.model";
// /* user not found class and interface */
// export interface TCustomError {
//   success: boolean;
//   status: number;
//   message: string;
// }
// export class NotFoundError extends Error {
//   errors: TCustomError;
//   constructor(errors: TCustomError) {
//     super();
//     this.errors = errors;
//   }
// }
// export interface TStaticsMethods extends Model<TUser> {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   isUserExisted(id: number): Promise<TCustomError | any | null>;
// }
// userSchema.static("isUserExisted", async function isUserExisted(id: number) {
//   console.log("inside isUserExisted");
//   const user = await User.findOne({ userId: id });
//   const errors: TCustomError = {
//     success: false,
//     status: 404,
//     message: "User not found!",
//   };
//   if (!user) {
//     throw new NotFoundError(errors);
//   }
// });
