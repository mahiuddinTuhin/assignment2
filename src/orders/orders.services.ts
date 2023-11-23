import { User } from "../users/users.model";
import { TOrders } from "./orders.interface";

interface CustomError {
  success: boolean;
  status: number;
  message: string;
}
class NotFoundError extends Error {
  errors: CustomError;

  constructor(errors: CustomError) {
    super();
    this.errors = errors;
  }
}
const isExisted = async (id: number) => {
  return await User.findOne({ userId: id });
};

/* 1. Create a new user service */
const createOrder = async (data: TOrders, id: number) => {
  const user = await isExisted(id);

  if (!user) {
    const errors = {
      success: false,
      status: 404,
      message: "User not found!",
    };

    throw new NotFoundError(errors);
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error;
  }
};

/* 2. Retrieve a list of all users service */
const getAllOrdersById = async (id: string) => {
  const user = await isExisted(parseInt(id));

  if (!user) {
    const errors = {
      success: false,
      status: 404,
      message: "User not found!",
    };
    throw new NotFoundError(errors);
  }

  try {
    const result = await User.aggregate([
      {
        $match: { userId: parseInt(id) },
      },
      // {
      //   $project: {
      //     orders: 1,
      //     _id: 0,
      //   },
      // },
      // {
      //   $unwind: "$orders",
      // },

      // {
      //   $group: {
      //     _id: "$orders",
      //   },
      // },
      {
        $project: {
          orders: 1,
          _id: 0,
        },
      },
    ]);
    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error;
  }
};

/* 3. Calculate Total Price of Orders for a Specific User */
const getTotalPriceById = async (id: string) => {
  const user = await isExisted(parseInt(id));

  if (!user) {
    const errors = {
      success: false,
      status: 404,
      message: "User not found!",
    };
    throw new NotFoundError(errors);
  }

  try {
    const result = await User.aggregate([
      {
        $match: { userId: parseInt(id) },
      },
      {
        $unwind: "$orders",
      },
      {
        $group: {
          _id: "$_id",
          totalPrice: { $sum: "$orders.price" },
        },
      },
      {
        $project: {
          _id: 0,
          totalPrice: {
            $round: ["$totalPrice", 2],
          },
        },
      },
    ]);
    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error;
  }
};
export const ordersServices = {
  getAllOrdersById,
  createOrder,
  getTotalPriceById,
};
