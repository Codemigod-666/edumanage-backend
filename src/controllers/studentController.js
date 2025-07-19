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
exports.deleteStudent = exports.updateStudent = exports.addStudent = exports.getStudentDetails = exports.getAllStudents = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Student_1 = require("../database/models/Student");
exports.getAllStudents = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const students = yield Student_1.StudentModel.find();
    res.status(200).json({ data: students });
}));
exports.getStudentDetails = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.body;
    const student = yield Student_1.StudentModel.findOne({ _id });
    console.log(student);
    res.status(200).json({ data: student });
}));
exports.addStudent = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // check if the request is authorized
    const student = yield Student_1.StudentModel.create(req.body);
    yield student.save();
    res.status(201).json({ data: student });
}));
exports.updateStudent = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // find student with particular id and update
    const { _id } = req.params;
    const data = req.body;
    // check if student exists
    const studentExists = yield Student_1.StudentModel.findOne({ _id });
    if (!studentExists) {
        res.sendStatus(400);
        throw new Error("Student not found");
    }
    const updatedStudent = yield Student_1.StudentModel.findOneAndUpdate({ _id }, { $set: data }, { new: true });
    res.status(200).json({ data: updatedStudent });
}));
exports.deleteStudent = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // find student with particular id and delete
    const { _id } = req.params;
    // check if student exists
    const studentExists = yield Student_1.StudentModel.findOne({ _id });
    if (!studentExists) {
        res.sendStatus(400);
        throw new Error("Student not found");
    }
    const deletedStudent = yield Student_1.StudentModel.findOneAndDelete({ _id });
    res.status(200).json({ data: deletedStudent });
}));
