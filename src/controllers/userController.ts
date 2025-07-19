import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { User } from "../database/models/User";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "../utils";
import { environment } from "../confit";

export const registerUser = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body;
    // normalize the email
    const normalizedEmail = email.toLowerCase();

    if (!name || !email || !password) {
      res.status(400).json({ message: "Please fill all the required fields" });
      throw new Error("Please fill all the required fields");
    }

    // if the user with that email already exists
    const userExists = await User.findOne({ email: normalizedEmail });
    if (userExists) {
      res.status(400).json({ message: "User Already Exists" });
      throw new Error("User Already Exists");
    }

    const user = await User.create({
      email: normalizedEmail,
      name,
      password, //hashed password
      role: "jobseeker",
    });

    // access token and refresh token logic
    const accessToken = generateAccessToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id, user.role);

    user.refreshTokens?.push({ token: refreshToken });
    await user.save();

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      accessToken,
      refreshToken,
    });
  }
);

export const login = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    const normalizedEmail = email.toLowerCase();
    // check if user exists and comapre the passwords
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      res.sendStatus(401);
      throw new Error("Invalid Credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.sendStatus(401);
      throw new Error("Invalid Credentials");
    }

    // generate the new access and refresh token
    const accessToken = generateAccessToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id, user.role);
    // send the response
    user.refreshTokens?.push({ token: refreshToken });
    await user.save();

    // save into cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: environment === "production",
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
  }
);

export const logout = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const token = req.cookies?.refreshToken;
    if (!token) {
      res.status(204); // user already logged out
      return;
    }

    const user = await User.findOne({ "refreshTokens.token": token });
    if (!user) {
      res.clearCookie("refreshTokens", {
        httpOnly: true,
        sameSite: "strict",
        secure: environment === "production",
      });
      res.status(204); // user already logged out
      return;
    }

    user.refreshTokens = user.refreshTokens?.filter((rt) => rt.token !== token);
    await user.save();
    res.clearCookie("refreshTokens", {
      httpOnly: true,
      sameSite: "strict",
      secure: environment === "production",
    });
    res.sendStatus(204);
    return;
  }
);

export const getUsers = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const user = await User.find({});
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
  }
);

export const getUserData = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.body;
    const normalizedEmail = email.toLowerCase();

    const userExists = await User.findOne({ email: normalizedEmail });
    if (!userExists) {
      res.sendStatus(400);
      throw new Error("User not found");
    }

    res.status(200).json({ data: userExists });
    return;
  }
);

export const updateUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { email, ...data } = req.body;
    const normalizedEmail = email.toLowerCase();

    const userExists = await User.findOne({ email: normalizedEmail });
    if (!userExists) {
      res.sendStatus(400);
      throw new Error("User not found");
    }

    const updatedUser = await User.findOneAndUpdate(
      { email: normalizedEmail },
      { $set: data },
      { new: true }
    );

    res.status(200).json({ data: updatedUser });
    return;
  }
);

export const deleteUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.body;
    const normalizedemail = email.toLowerCase();

    const userExists = await User.findOne({ email: normalizedemail });
    if (!userExists) {
      res.sendStatus(400);
      throw new Error("User not found");
    }

    const deletedUser = await User.findOneAndDelete({ email: normalizedemail });

    res.status(200).json({ data: deletedUser });
    return;
  }
);
