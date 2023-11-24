"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orders = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const orders_schema_1 = require("./orders.schema");
exports.Orders = mongoose_1.default.model("Orders", orders_schema_1.ordersSchema);
