import { TUser } from "./users.interface";
import { User } from "./users.model";

/* creating user services */
const createUser = async (data: TUser) => {
  try {
    const isExisted = await User.findOne({
      $or: [{ userId: data.userId }, { username: data.username }],
    });

    if (isExisted) {
      throw new Error("User id or username already existed.");
    }
    console.log("before creating user");
    const result = await User.create(data);
    console.log("after creating user");

    return result;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error);
  }
};

/* get all user services */
const getAllUser = async () => {
  const result = await User.aggregate([
    {
      $project: {
        password: 0,
        _id: 0,
      },
    },
  ]);
  return result;
};

const findUserById = async (id: string) => {
  const result = await User.aggregate([
    { $match: { userId: parseInt(id) } },
    {
      $project: {
        password: 0,
        _id: 0,
      },
    },
  ]);
  console.log(result);
  if (result.length > 0) {
    return result[0];
  } else {
    throw new Error("Failed to get data!");
  }
};

const deleteUserById = async (id: string) => {
  // const isExisted = await User.findOne({ userId: id });
  // if (!isExisted) {
  //   return false;
  // }
  const result = await User.findOneAndDelete({ userId: id });

  if (!result) {
    throw new Error("User not found");
  }
  return result;
};

const updateUserById = async (id: string, data: TUser) => {
  const isExisted = await User.findOne({ userId: parseInt(id) });
  if (!isExisted) {
    throw new Error("User not existed!");
  }
  const result = await User.findOneAndUpdate({ userId: parseInt(id) }, data, {
    new: true,
  });
  if (!result) {
    throw new Error("Failed to update data!.");
  }
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
