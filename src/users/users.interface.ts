import { Model } from "mongoose";

export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: {
    street: string;
    city: string;
    country: string;
  };
};

/* making static method */
export interface IUserStaticModel extends Model<TUser> {
  isExisted(id: number): Promise<TUser | null>;
}
