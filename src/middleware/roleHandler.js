"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const roleHandler = (err, req, res, next) => {
    const data = req.body;
    if (data.role === "admin" || data.role === "superadmin") {
        next();
    }
    else {
        res.sendStatus(401);
        throw new mongoose_1.Error("Role Access not Provided");
    }
};
