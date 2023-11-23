import { User } from "../users/users.model";
import { TOrders } from "./orders.interface";

/* 1. Create a new user service */
const createOrder = async (data: TOrders, id: number) => {
  try {
    const result = await User.aggregate([
      {
        $match: { userId: id },
      },
      {
        $addFields: {
          orders: {
            $ifNull: ["$orders", { $literal: [] }],
          },
        },
      },
      {
        $addFields: {
          orders: {
            $concatArrays: ["$orders", [{ ...data }]],
          },
        },
      },
      {
        $merge: {
          into: "users",
          whenMatched: "merge",
          whenNotMatched: "insert",
        },
      },
    ]);
    console.log(result);

    return result;
  } catch (error) {
    return error;
  }
};

/* 2. Retrieve a list of all users service */
const getAllUser = async () => {
  try {
    const result = await User.aggregate([
      {
        $project: {
          password: 0,
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
const updateUserById = async (id: string, data: TOrders) => {
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
  createOrder,
  findUserById,
  deleteUserById,
  updateUserById,
  deleteAllUser,
};
