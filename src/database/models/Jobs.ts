// import { model, Schema } from "mongoose";
// import { companySchema } from "./User";
// import { IJob } from "../../types/Job";

// export const DOCUMENT_NAME = "Job";
// export const COLLECTION_NAME = "jobs";

// const SalaryRangeSchema = new Schema(
//   {
//     min: {
//       type: Number,
//       required: true,
//     },
//     max: {
//       type: Number,
//       required: true,
//     },
//   },
//   {
//     _id: false,
//   }
// );

// const schema = new Schema<IJob>(
//   {
//     title: {
//       type: String,
//       trim: true,
//       maxlength: 200,
//       required: true,
//     },
//     description: {
//       type: String,
//       trim: true,
//     },
//     //linked to the user model
//     recruiter: {
//       type: Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     company: [companySchema],
//     skills: {
//       type: [String],
//       default: [],
//     },
//     tags: {
//       type: [String],
//       default: [],
//     },
//     category: {
//       type: String,
//       trim: true,
//     },
//     role: {
//       type: String,
//       trim: true,
//     },
//     experienceLevel: {
//       type: String,
//       trim: true,
//     },
//     location: {
//       type: String,
//       trim: true,
//     },
//     jobType: {
//       type: String,
//       trim: true,
//     },
//     isRemote: {
//       type: Boolean,
//       default: false,
//     },
//     salaryRange: SalaryRangeSchema,
//     viewsCount: {
//       type: Number,
//       default: 0,
//     },
//     applicantsCount: {
//       type: Number,
//       default: 0,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// schema.index({ title: "text", description: "text" });
// schema.index({ location: "text" });

// export const JobModel = model<IJob>(DOCUMENT_NAME, schema, COLLECTION_NAME);
