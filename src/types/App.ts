import { Document } from "mongoose";

// Student Interface
export interface Student extends Document {
  _id: string;
  first_name: string;
  last_name: string;
  gender: "male" | "female";
  date_of_birth: string;
  email: string;
  phone: string;
  batch: string;
  class: string;
  admission_date: string;
  status: string;
  guardian_name: string;
  guardian_phone: string;
  relation: string;
  emergency_contact: string;
}

// export interface AttendanceRecord {
//   id: string;
//   studentId: string;
//   studentName: string;
//   date: string;
//   status: "present" | "absent" | "late";
//   batch: string;
// }

// export interface FeesRecord {
//   id: string;
//   studentId: string;
//   studentName: string;
//   batch: string;
//   amount: number;
//   dueDate: string;
//   status: "paid" | "pending" | "overdue";
//   paidDate?: string;
//   paidAmount?: number;
// }

// export interface Batch {
//   id: string;
//   name: string;
//   students: number;
//   startTime: string;
//   endTime: string;
// }

// export interface DashboardStats {
//   totalStudents: number;
//   attendancePercentage: number;
//   pendingFees: number;
//   totalRevenue: number;
// }
