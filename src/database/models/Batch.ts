import { model, Schema } from "mongoose";
import { Batch } from "../../types/App";

export const DOCUMENT_NAME = "Batch";
export const COLLECTION_NAME = "batches";

const schema = new Schema<Batch>(
  {
    name: {
      type: String,
      trim: true,
      maxlength: 200,
      required: true,
    },
    students: {
      type: Number,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

schema.index({ name: 1 }, { unique: true });

export const BatchModel = model<Batch>("Batch", schema);
