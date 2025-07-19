import { model, Schema } from "mongoose";
import { IUser } from "../../types/User";
import bcryptjs from "bcryptjs";

export const DOCUMENT_NAME = "User";
export const COLLECTION_NAME = "users";

const educationSchema = new Schema(
  {
    degree: { type: String },
    institution: { type: String },
    year: { type: Number },
  },
  {
    _id: false,
  }
);

export const companySchema = new Schema(
  {
    name: { type: String },
    website: { type: String },
    industry: { type: String },
  },
  {
    _id: false,
  }
);

const experienceSchema = new Schema(
  {
    title: { type: String },
    company: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    description: { type: String },
  },
  {
    _id: false,
  }
);

const tokenSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    _id: false,
  }
);

export const schema = new Schema<IUser>(
  {
    name: {
      type: String,
      trim: true,
      maxlength: 200,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      sparse: true, //allows null
      trim: true,
      // select: false,
      required: true,
    },
    password: {
      type: String,
      // select: false,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    location: {
      type: String,
      trim: true,
      default: "",
    },
    skills: {
      type: [String],
      default: [],
    },
    interests: {
      type: [String],
      default: [],
    },
    experience: {
      type: [experienceSchema],
      default: [],
    },
    education: {
      type: [educationSchema],
      default: [],
    },
    resumeUrl: {
      type: String,
      trim: true,
      default: "",
    },
    company: {
      type: [companySchema],
      default: [],
    },
    refreshTokens: {
      type: [tokenSchema],
      default: [],
    },
  },
  { timestamps: true }
);

schema.index({ _id: 1, status: 1 });
schema.index({ status: 1 });

// hash the password before saving
schema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
  next();
});

schema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcryptjs.compare(candidatePassword, this.password);
};

//defined the User model finally with all the necessary names
export const User = model<IUser>(DOCUMENT_NAME, schema, COLLECTION_NAME);
