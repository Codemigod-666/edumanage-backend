import jwt from "jsonwebtoken";
import { access_secret, refresh_secret } from "../../confit";
import dotenv from "dotenv";

dotenv.config();

export const generateAccessToken = (id: String, role: String) => {
  return jwt.sign({ id, role }, access_secret, { expiresIn: "15m" });
};

export const generateRefreshToken = (id: String, role: String) => {
  return jwt.sign({ id, role }, refresh_secret, { expiresIn: "7d" });
};
