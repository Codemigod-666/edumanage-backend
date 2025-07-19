"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentModel = exports.schema = exports.COLLECTION_NAME = exports.DOCUMENT_NAME = void 0;
const mongoose_1 = require("mongoose");
exports.DOCUMENT_NAME = "Student";
exports.COLLECTION_NAME = "students";
exports.schema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
});
exports.schema.index({ _id: 1, email: 1 });
exports.schema.index({ status: 1 });
exports.StudentModel = (0, mongoose_1.model)(exports.DOCUMENT_NAME, exports.schema, exports.COLLECTION_NAME);
