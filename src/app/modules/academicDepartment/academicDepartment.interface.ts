import { ObjectId } from 'mongoose';

export type TAcademicDepartment = {
  id: string;
  name: string;
  academicfaculty: ObjectId;
  createdAt: string;
  updatedAt: string;
};
