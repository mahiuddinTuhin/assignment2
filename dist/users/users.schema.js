"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
const users_model_1 = require("./users.model");
// import { User } from "./users.model";
exports.userSchema = new mongoose_1.Schema({
    userId: {
        type: Number,
        required: [true, "Must need an user ID"],
        unique: true,
    },
    username: {
        type: String,
        index: { unique: true },
        required: [true, "Must need an username"],
        trim: true,
        minlength: [3, "User Name should contain minimum 3 character."],
        maxlength: [20, "User Name should not have more then 20 character."],
        validate: {
            validator: (value) => {
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
                validator: (value) => {
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
                validator: (value) => {
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
            validator: (value) => {
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
            validator: (value) => {
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
            validator: (value) => {
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
}, { versionKey: false });
/* making static method */
exports.userSchema.statics.isExisted = async function (id) {
    const existed = await users_model_1.User.findOne({ userId: id });
    return existed ? true : false;
};
