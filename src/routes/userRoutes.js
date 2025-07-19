"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const userRouter = express_1.default.Router();
userRouter.route("/register").post(userController_1.registerUser);
userRouter.route("/login").post(userController_1.login);
userRouter.route("/logout").post(userController_1.logout);
userRouter.route("/get-all-users").get(userController_1.getUsers);
userRouter.route("/get-user-by-email").get(userController_1.getUserData);
userRouter.route("/update-user-by-email").put(userController_1.updateUser);
userRouter.route("/delete-user-by-email").delete(userController_1.deleteUser);
exports.default = userRouter;
