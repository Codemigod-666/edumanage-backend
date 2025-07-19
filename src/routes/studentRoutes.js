"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const studentController_1 = require("../controllers/studentController");
const studentRouter = express_1.default.Router();
studentRouter.route("/get-all-students").get(studentController_1.getAllStudents);
studentRouter.route("/get-student").post(studentController_1.getStudentDetails);
studentRouter.route("/add-student").post(studentController_1.addStudent);
studentRouter.route("/update-student/:_id").put(studentController_1.updateStudent);
studentRouter.route("/delete-student/:_id").delete(studentController_1.deleteStudent);
exports.default = studentRouter;
