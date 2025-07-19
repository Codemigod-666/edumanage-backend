"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobModel = exports.COLLECTION_NAME = exports.DOCUMENT_NAME = void 0;
const mongoose_1 = require("mongoose");
const User_1 = require("./User");
exports.DOCUMENT_NAME = "Job";
exports.COLLECTION_NAME = "jobs";
const SalaryRangeSchema = new mongoose_1.Schema({
    min: {
        type: Number,
        required: true,
    },
    max: {
        type: Number,
        required: true,
    },
}, {
    _id: false,
});
const schema = new mongoose_1.Schema({
    title: {
        type: String,
        trim: true,
        maxlength: 200,
        required: true,
    },
    description: {
        type: String,
        trim: true,
    },
    //linked to the user model
    recruiter: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    company: [User_1.companySchema],
    skills: {
        type: [String],
        default: [],
    },
    tags: {
        type: [String],
        default: [],
    },
    category: {
        type: String,
        trim: true,
    },
    role: {
        type: String,
        trim: true,
    },
    experienceLevel: {
        type: String,
        trim: true,
    },
    location: {
        type: String,
        trim: true,
    },
    jobType: {
        type: String,
        trim: true,
    },
    isRemote: {
        type: Boolean,
        default: false,
    },
    salaryRange: SalaryRangeSchema,
    viewsCount: {
        type: Number,
        default: 0,
    },
    applicantsCount: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});
schema.index({ title: "text", description: "text" });
schema.index({ location: "text" });
exports.JobModel = (0, mongoose_1.model)(exports.DOCUMENT_NAME, schema, exports.COLLECTION_NAME);
