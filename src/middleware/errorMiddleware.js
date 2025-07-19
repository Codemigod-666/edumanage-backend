"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const confit_1 = require("../../confit");
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.json({
        message: err.message,
        stack: confit_1.environment === "production" ? null : err.stack,
    });
};
exports.default = errorHandler;
