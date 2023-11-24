import { TUser } from "./users.interface";
import { User } from "./users.model";

/* 1. Create a new user service */
const createUser = async (data: TUser) => {
  try {
    /* checking if user id or username already existed or not */
    const isExisted = await User.findOne({
      $or: [{ userId: data.userId }, { username: data.username }],
    });

    if (isExisted) {
      throw new Error("User id or username already existed.");
    }

    const result = await User.create(data);

    return result;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error);
  }
};

/* 2. Retrieve a list of all users service */
const getAllUser = async () => {
  try {
    const result = await User.aggregate([
      {
        $project: {
          password: 0,
          isActive: 0,
          hobbies: 0,
          orders: 0,
          userId: 0,

          _id: 0,
        },
      },
    ]);
    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error);
  }
};

/* 3. Retrieve a specific user by ID service */
const findUserById = async (id: string) => {
  try {
    const result = await User.aggregate([
      { $match: { userId: parseInt(id) } },
      {
        $project: {
          password: 0,
          _id: 0,
          orders: 0,
        },
      },
    ]);

    if (result.length > 0) {
      return result[0];
    } else {
      throw new Error("Failed to get data!");
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error);
  }
};

/* 4. Update user information service*/
const updateUserById = async (id: string, data: TUser) => {
  try {
    const result = await User.findOneAndUpdate({ userId: parseInt(id) }, data, {
      new: true,
    });

    console.log(result);
    if (!result) {
      throw new Error("User not found!");
    }
    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error);
  }
};

/* 5. Delete a user service */
const deleteUserById = async (id: string) => {
  try {
    const result = await User.findOneAndDelete({ userId: id });

    if (!result) {
      throw new Error("User not found");
    }
    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error);
  }
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
