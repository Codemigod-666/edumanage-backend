import dotenv from "dotenv";

dotenv.config();

export const environment = process.env.NODE_ENV as string;
export const PORT = process.env.PORT as string;
export const access_secret = process.env.JWT_SECRET as string;
export const refresh_secret = process.env.JWT_SECRET as string;

export const db = {
  dbURI: process.env.DATABASE_URL as string,
};

export const corsURL = process.env.CORS_URL as string;
