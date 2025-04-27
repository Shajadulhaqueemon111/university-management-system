import { Types } from 'mongoose';

export type TPreRequisiteCourses = {
  course: Types.ObjectId;
  isDeleted: boolean;
};

export type TCourses = {
  title: string;
  prefix: string;
  code: number;
  credites: number;
  preRequisiteCourses: [];
  createdAt: string;
  updatedAt: string;
};
