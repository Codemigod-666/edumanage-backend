import expressAsyncHandler from "express-async-handler";
import { StudentModel } from "../database/models/Student";
import { Request, Response } from "express";

export const getAllStudents = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    if (req) {
      console.log("request");
    }
    const students = await StudentModel.find();
    res.status(200).json({ data: students });
  }
);

export const getStudentDetails = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { _id } = req.body;
    const student = await StudentModel.findOne({ _id });
    console.log(student);
    res.status(200).json({ data: student });
  }
);

export const addStudent = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    // check if the request is authorized
    const student = await StudentModel.create(req.body);
    await student.save();
    res.status(201).json({ data: student });
  }
);

export const updateStudent = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    // find student with particular id and update
    const { _id } = req.params;
    const data = req.body;
    // check if student exists
    const studentExists = await StudentModel.findOne({ _id });
    if (!studentExists) {
      res.sendStatus(400);
      throw new Error("Student not found");
    }
    const updatedStudent = await StudentModel.findOneAndUpdate(
      { _id },
      { $set: data },
      { new: true }
    );
    res.status(200).json({ data: updatedStudent });
  }
);

export const deleteStudent = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    // find student with particular id and delete
    const { _id } = req.params;
    // check if student exists
    const studentExists = await StudentModel.findOne({ _id });
    if (!studentExists) {
      res.sendStatus(400);
      throw new Error("Student not found");
    }
    const deletedStudent = await StudentModel.findOneAndDelete({ _id });
    res.status(200).json({ data: deletedStudent });
  }
);
