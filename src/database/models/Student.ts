import { model, Schema } from "mongoose";
import { Student } from "../../types/App";

export const DOCUMENT_NAME = "Student";
export const COLLECTION_NAME = "students";

export const schema = new Schema<Student>(
  {
    tuition_id: {
      type: String,
      required: true,
    },
    first_name: {
      type: String,
      trim: true,
      maxlength: 200,
      required: true,
    },
    last_name: {
      type: String,
      trim: true,
      maxlength: 200,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    date_of_birth: {
      type: String,
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
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    batch: {
      type: String,
      required: true,
    },
    class: {
      type: String,
      required: true,
    },
    admission_date: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    guardian_name: {
      type: String,
      required: true,
    },
    guardian_phone: {
      type: String,
      required: true,
    },
    relation: {
      type: String,
      required: true,
    },
    emergency_contact: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

schema.index({ _id: 1, email: 1 });
schema.index({ status: 1 });

export const StudentModel = model<Student>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);
