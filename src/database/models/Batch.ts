// import { model, Schema } from "mongoose";
// import { Batch } from "../../types/App";

// export const DOCUMENT_NAME = "Batch";
// export const COLLECTION_NAME = "batches";

// const schema = new Schema<Batch>(
//   {
//     name: {
//       type: String,
//       trim: true,
//       maxlength: 200,
//       required: true,
//     },
//     students: {
//       type: Number,
//       required: true,
//     },
//     startTime: {
//       type: String,
//       required: true,
//     },
//     endTime: {
//       type: String,
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// schema.index({ name: 1 }, { unique: true });

// export const BatchModel = model<Batch>("Batch", schema);

import { model, Schema } from "mongoose";
import { Batch } from "../../types/App";

export const DOCUMENT_NAME = "Batch";
export const COLLECTION_NAME = "batches";

export const schema = new Schema<Batch>(
  {
    tuition_id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    instructor: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    max_students: {
      type: Number,
      required: true,
      min: 1,
    },
    start_date: {
      type: String,
      required: true,
    },
    end_date: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Active",
    },
    schedule: {
      type: [String],
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      required: true,
    },
    start_time: {
      type: String,
      required: true,
    },
    end_time: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

schema.index({ instructor: 1 });
schema.index({ name: 1, subject: 1 });

export const BatchModel = model<Batch>(DOCUMENT_NAME, schema, COLLECTION_NAME);
