import { Document } from "mongoose";

interface Education {
  degree: string;
  institution: string;
  year: number;
}

export interface Company {
  name: string;
  website: string;
  industry: string;
}

interface Token {
  token: string;
  createdAt?: Date;
}

interface Experience {
  title: string;
  company: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
}

export interface IUser extends Document {
  _id: string;
  email: string;
  password: string;
  name: string;
  role: "admin" | "jobseeker" | "employer" | "superadmin";
  phone?: string;
  location?: string;
  skills?: string[];
  interests?: string[];
  experience?: Experience[];
  education?: Education[];
  resumeUrl?: string;
  company?: Company[];
  refreshTokens?: Token[];
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candadatePassword: string): Promise<boolean>;
}
