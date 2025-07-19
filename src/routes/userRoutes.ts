import express from "express";
import {
  deleteUser,
  getUserData,
  getUsers,
  login,
  logout,
  registerUser,
  updateUser,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(login);
userRouter.route("/logout").post(logout);
userRouter.route("/get-all-users").get(getUsers);
userRouter.route("/get-user-by-email").get(getUserData);
userRouter.route("/update-user-by-email").put(updateUser);
userRouter.route("/delete-user-by-email").delete(deleteUser);

export default userRouter;
