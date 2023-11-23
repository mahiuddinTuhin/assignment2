"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseMessage = void 0;
const responseMessage = (res, status, message, data) => {
    res.status(status).json({
        success: status === 200 ? true : false,
        message,
        data: data,
    });
};
exports.responseMessage = responseMessage;
