import express from "express";
import {
  addStudent,
  deleteStudent,
  getAllStudents,
  getStudentDetails,
  updateStudent,
} from "../controllers/studentController";

const studentRouter = express.Router();

studentRouter.route("/get-all-students").get(getAllStudents);
studentRouter.route("/get-student").post(getStudentDetails);
studentRouter.route("/add-student").post(addStudent);
studentRouter.route("/update-student/:_id").put(updateStudent);
studentRouter.route("/delete-student/:_id").delete(deleteStudent);

export default studentRouter;
