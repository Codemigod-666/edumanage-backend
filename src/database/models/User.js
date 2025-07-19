"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.schema = exports.companySchema = exports.COLLECTION_NAME = exports.DOCUMENT_NAME = void 0;
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.DOCUMENT_NAME = "User";
exports.COLLECTION_NAME = "users";
const educationSchema = new mongoose_1.Schema({
    degree: { type: String },
    institution: { type: String },
    year: { type: Number },
}, {
    _id: false,
});
exports.companySchema = new mongoose_1.Schema({
    name: { type: String },
    website: { type: String },
    industry: { type: String },
}, {
    _id: false,
});
const experienceSchema = new mongoose_1.Schema({
    title: { type: String },
    company: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    description: { type: String },
}, {
    _id: false,
});
const tokenSchema = new mongoose_1.Schema({
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
}, {
    _id: false,
});
exports.schema = new mongoose_1.Schema({
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
        type: [exports.companySchema],
        default: [],
    },
    refreshTokens: {
        type: [tokenSchema],
        default: [],
    },
}, { timestamps: true });
exports.schema.index({ _id: 1, status: 1 });
exports.schema.index({ status: 1 });
// hash the password before saving
exports.schema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password"))
            return next();
        const salt = yield bcryptjs_1.default.genSalt(10);
        this.password = yield bcryptjs_1.default.hash(this.password, salt);
        next();
    });
});
exports.schema.methods.comparePassword = function (candidatePassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return bcryptjs_1.default.compare(candidatePassword, this.password);
    });
};
//defined the User model finally with all the necessary names
exports.User = (0, mongoose_1.model)(exports.DOCUMENT_NAME, exports.schema, exports.COLLECTION_NAME);
