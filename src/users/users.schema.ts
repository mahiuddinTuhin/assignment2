import { Schema } from "mongoose";
import { TUser } from "./users.interface";

export const userSchema = new Schema<TUser>({
  userId: {
    type: Number,
    required: [true, "Must need an user ID"],
    trim: true,
    unique: true,
  },
  username: {
    type: String,
    unique: true,
    required: [true, "Must need an username"],
    trim: true,
    minlength: [3, "User Name should contain minimum 3 character."],
    maxlength: [20, "User Name should not have more then 20 character."],
    validate: {
      validator: (value: string) => {
        const spaceFound = /\s/g;
        if (spaceFound?.test(value)) {
          return false;
        }
      },
      message: "Do not use space inside username.",
    },
  },
  password: {
    type: String,
    required: [true, "Must need a password"],
    trim: true,
    minlength: [3, "Password should contain minimum 3 character."],
  },
  fullName: {
    firstName: {
      type: String,
      required: [true, "Must need a First name"],
      trim: true,
      minlength: [3, "First name should contain minimum 3 character."],
      validate: {
        validator: (value: string) => {
          const nameRegex = /^[A-Za-z]+$/;
          if (!nameRegex.test(value)) {
            return false;
          }
        },
        message: "Name must contains only letter.",
      },
    },
    lastName: {
      type: String,
      required: [true, "Must need an Last Name"],
      trim: true,
      minlength: [3, "Last Name should contain minimum 3 character."],
      validate: {
        validator: (value: string) => {
          const nameRegex = /^[A-Za-z]+$/;
          if (!nameRegex.test(value)) {
            return false;
          }
        },
        message: "Name must contains only letter.",
      },
    },
  },
  age: {
    type: Number,
    required: [true, "Must need age."],
    validate: {
      validator: (value: number) => {
        const ageRegex = /^(0?[1-9]|[1-9][0-9])$/;

        if (!ageRegex.test(String(value))) {
          return false;
        }
      },
      message: "Invalid age!",
    },
  },
  email: {
    type: String,
    required: [true, "Must need an email."],
    trim: true,
    validate: {
      validator: (value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return false;
        }
      },
      message: "Invalid email!",
    },
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  hobbies: {
    type: [
      {
        type: String,
        minlength: [3, "Hobby should have at least 3 characters"],
        trim: true,
      },
    ],

    validate: {
      validator: (value: string[]) => {
        return value.length >= 1;
      },
      message: "At least one hobby is required",
    },
  },
  address: {
    street: {
      type: String,
      required: [true, "Must need street address"],
      trim: true,
      minlength: [3, "Street name should contain minimum 3 character."],
    },
    city: {
      type: String,
      required: [true, "Must need city name"],
      trim: true,
      minlength: [3, "City name should contain minimum 3 character."],
    },
    country: {
      type: String,
      required: [true, "Must need Country name"],
      trim: true,
      minlength: [3, "Country name should contain minimum 3 character."],
    },
  },
});
