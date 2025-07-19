"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserData = exports.getUsers = exports.logout = exports.login = exports.registerUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const User_1 = require("../database/models/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const utils_1 = require("../utils");
const confit_1 = require("../../confit");
exports.registerUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { name, email, password } = req.body;
    // normalize the email
    const normalizedEmail = email.toLowerCase();
    if (!name || !email || !password) {
        res.status(400).json({ message: "Please fill all the required fields" });
        throw new Error("Please fill all the required fields");
    }
    // if the user with that email already exists
    const userExists = yield User_1.User.findOne({ email: normalizedEmail });
    if (userExists) {
        res.status(400).json({ message: "User Already Exists" });
        throw new Error("User Already Exists");
    }
    const user = yield User_1.User.create({
        email: normalizedEmail,
        name,
        password, //hashed password
        role: "jobseeker",
    });
    // access token and refresh token logic
    const accessToken = (0, utils_1.generateAccessToken)(user._id, user.role);
    const refreshToken = (0, utils_1.generateRefreshToken)(user._id, user.role);
    (_a = user.refreshTokens) === null || _a === void 0 ? void 0 : _a.push({ token: refreshToken });
    yield user.save();
    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        accessToken,
        refreshToken,
    });
}));
exports.login = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { email, password } = req.body;
    const normalizedEmail = email.toLowerCase();
    // check if user exists and comapre the passwords
    const user = yield User_1.User.findOne({ email: normalizedEmail });
    if (!user) {
        res.sendStatus(401);
        throw new Error("Invalid Credentials");
    }
    const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        res.sendStatus(401);
        throw new Error("Invalid Credentials");
    }
    // generate the new access and refresh token
    const accessToken = (0, utils_1.generateAccessToken)(user._id, user.role);
    const refreshToken = (0, utils_1.generateRefreshToken)(user._id, user.role);
    // send the response
    (_a = user.refreshTokens) === null || _a === void 0 ? void 0 : _a.push({ token: refreshToken });
    yield user.save();
    // save into cookie
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: confit_1.environment === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    // send the response
    res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        accessToken,
    });
}));
exports.logout = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.refreshToken;
    if (!token) {
        res.status(204); // user already logged out
        return;
    }
    const user = yield User_1.User.findOne({ "refreshTokens.token": token });
    if (!user) {
        res.clearCookie("refreshTokens", {
            httpOnly: true,
            sameSite: "strict",
            secure: confit_1.environment === "production",
        });
        res.status(204); // user already logged out
        return;
    }
    user.refreshTokens = (_b = user.refreshTokens) === null || _b === void 0 ? void 0 : _b.filter((rt) => rt.token !== token);
    yield user.save();
    res.clearCookie("refreshTokens", {
        httpOnly: true,
        sameSite: "strict",
        secure: confit_1.environment === "production",
    });
    res.sendStatus(204);
    return;
}));
exports.getUsers = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.User.find({});
    if (!user) {
        res.sendStatus(400);
        throw new Error("User not found");
    }
    const mappedData = user.map((item) => ({
        name: item.name,
        email: item.email,
    }));
    res.status(200).json(mappedData);
    return;
}));
exports.getUserData = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const normalizedEmail = email.toLowerCase();
    const userExists = yield User_1.User.findOne({ email: normalizedEmail });
    if (!userExists) {
        res.sendStatus(400);
        throw new Error("User not found");
    }
    res.status(200).json({ data: userExists });
    return;
}));
exports.updateUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { email } = _a, data = __rest(_a, ["email"]);
    const normalizedEmail = email.toLowerCase();
    const userExists = yield User_1.User.findOne({ email: normalizedEmail });
    if (!userExists) {
        res.sendStatus(400);
        throw new Error("User not found");
    }
    const updatedUser = yield User_1.User.findOneAndUpdate({ email: normalizedEmail }, { $set: data }, { new: true });
    res.status(200).json({ data: updatedUser });
    return;
}));
exports.deleteUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const normalizedemail = email.toLowerCase();
    const userExists = yield User_1.User.findOne({ email: normalizedemail });
    if (!userExists) {
        res.sendStatus(400);
        throw new Error("User not found");
    }
    const deletedUser = yield User_1.User.findOneAndDelete({ email: normalizedemail });
    res.status(200).json({ data: deletedUser });
    return;
}));
