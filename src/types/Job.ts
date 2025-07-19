import { Company } from "./User";

interface SalaryRange {
  min: Number;
  max: Number;
}

export interface IJob {
  _id: string;
  title: string;
  description: string;
  recruiter: String;
  company: Company[];
  skills?: String[];
  tags?: String[];
  category?: String;
  role?: String;
  experienceLevel?: String;
  location?: String;
  jobType?: String;
  isRemote?: Boolean;
  salaryRange?: SalaryRange;
  viewsCount?: Number;
  applicantsCount?: Number;
  deadline: Date;
  createdAt: Date;
  updatedAt: Date;
}
