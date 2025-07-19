"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsURL = exports.db = exports.refresh_secret = exports.access_secret = exports.PORT = exports.environment = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.environment = process.env.NODE_ENV;
exports.PORT = process.env.PORT;
exports.access_secret = process.env.JWT_SECRET;
exports.refresh_secret = process.env.JWT_SECRET;
exports.db = {
    dbURI: process.env.DATABASE_URL,
};
exports.corsURL = process.env.CORS_URL;
