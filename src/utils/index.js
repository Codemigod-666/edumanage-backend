"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const confit_1 = require("../../confit");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const generateAccessToken = (id, role) => {
    return jsonwebtoken_1.default.sign({ id, role }, confit_1.access_secret, { expiresIn: "15m" });
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (id, role) => {
    return jsonwebtoken_1.default.sign({ id, role }, confit_1.refresh_secret, { expiresIn: "7d" });
};
exports.generateRefreshToken = generateRefreshToken;
