import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { User } from "../database/models/User";
// import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "../utils/index";
import { environment } from "../confit";

// export const registerUser = expressAsyncHandler(
//   async (req: Request, res: Response): Promise<void> => {
//     const { name, email, password, role, tuition_id } = req.body;
//     const normalizedemail = email.toLowerCase();

//     if (!name || !email || !password) {
//       res.status(400);
//       throw new Error("Please fill all the required fields");
//     }

//     // password validatoin:
//     if (password.length < 5) {
//       res.status(400);
//       throw new Error("Password must be at least 8 characters long");
//     }

//     // if the user with that email already exists
//     const userExists = await User.findOne({ email: normalizedemail });
//     if (userExists) {
//       res.status(400);
//       throw new Error("User Already Exists");
//     }

//     const user = await User.create({
//       name,
//       email: normalizedemail,
//       password,
//       role: role || "admin",
//       tuition_id,
//     });

//     const accessToken = generateAccessToken(user._id, user.role);
//     const refreshToken = generateRefreshToken(user._id, user.role);

//     user.refreshTokens?.push({ token: refreshToken });
//     await user.save();

//     res.cookie("refreshToken", refreshToken, {
//       httpOnly: true,
//       secure: environment === "production",
//       sameSite: "strict",
//       maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//     });

//     res.status(201).json({
//       success: true,
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       accessToken,
//       message: "User Registered Successfully",
//     });
//   }
// );

// export const login = expressAsyncHandler(
//   async (req: Request, res: Response): Promise<void> => {
//     const { email, password } = req.body;
//     const normalizedEmail = email.toLowerCase();
//     // check if user exists and comapre the passwords
//     const user = await User.findOne({ email: normalizedEmail });

//     if (!user) {
//       res.sendStatus(401);
//       throw new Error("Invalid Credentials");
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       res.sendStatus(401);
//       throw new Error("Invalid Credentials");
//     }

//     // generate the new access and refresh token
//     const accessToken = generateAccessToken(user._id, user.role);
//     const refreshToken = generateRefreshToken(user._id, user.role);
//     // send the response
//     user.refreshTokens?.push({ token: refreshToken });
//     await user.save();

//     // save into cookie
//     res.cookie("refreshToken", refreshToken, {
//       httpOnly: true,
//       secure: environment === "production",
//       sameSite: "strict",
//       maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//     });

//     // send the response
//     res.status(200).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       accessToken,
//     });
//   }
// );

export const registerUser = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { name, email, password, role = "admin", tuition_id } = req.body;
    const normalizedEmail = email?.toLowerCase();

    // Validation
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please fill all the required fields");
    }

    if (password.length < 8) {
      res.status(400);
      throw new Error("Password must be at least 8 characters long");
    }

    const userExists = await User.findOne({ email: normalizedEmail });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    // Validate tuition_id rules based on role
    if (role === "teacher" && !tuition_id) {
      res.status(400);
      throw new Error("Teacher must be assigned a tuition_id");
    }

    // Prevent tuition_id for super_admin
    const finalTuitionId =
      role === "super_admin"
        ? undefined
        : role === "teacher"
        ? tuition_id
        : undefined; // Admin will get tuition_id generated automatically

    const user = await User.create({
      name,
      email: normalizedEmail,
      password,
      role,
      tuition_id: finalTuitionId,
    });

    const accessToken = generateAccessToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id, user.role);

    user.refreshTokens?.push({ token: refreshToken });
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: environment === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({
      success: true,
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      tuition_id: user.tuition_id,
      accessToken,
      message: "User registered successfully",
    });
  }
);

export const login = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    const normalizedEmail = email.toLowerCase();

    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      res.status(401);
      throw new Error("Invalid Credentials");
    }

    // compare password is already done in the schema
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      res.status(401);
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
      role: user.role,
      tuition_id: user.tuition_id,
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
    // check if the request is authorized
    if (req) {
      console.log("Request");
    }
    const user = await User.find();
    if (!user) {
      res.sendStatus(400);
      throw new Error("User not found");
    }

    // const mappedData = user.map((item) => ({
    //   name: item.name,
    //   email: item.email,
    // }));

    res.status(200).json(user);
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
