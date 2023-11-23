import { TUser } from "./users.interface";
import { User } from "./users.model";

const getAllUser = async () => {
  const result = await User.find();
  return result;
};

const createUser = async (data: TUser) => {
  const isExisted = await User.findOne({ userId: data.userId });
  if (isExisted) {
    return "user id already existed";
  }
  const user = new User(data);

  const result = await user.save();
  return result;
};

const findUserById = async (id: string) => {
  const result = await User.findOne({ userId: id });
  return result;
};

const deleteUserById = async (id: string) => {
  const result = await User.deleteOne({ userId: id });
  console.log(result);
  return result;
};

const updateUserById = async (id: string, data: TUser) => {
  const result = await User.updateOne({ id }, data);
  console.log(result);
  return result;
};

const deleteAllUser = async () => {
  const result = await User.deleteMany({});
  return result;
};

export const userServices = {
  getAllUser,
  createUser,
  findUserById,
  deleteUserById,
  updateUserById,
  deleteAllUser,
};
