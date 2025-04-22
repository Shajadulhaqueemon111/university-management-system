import { Types } from 'mongoose';

export type Guardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNumber: string;
  motherName: string;
  motherOccupation: string;
  motherContactNumber: string;
};

export type UserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type localGuardian = {
  name: string;
  occupation: string;
  contactNumber: string;
};
export type TStudent = {
  user: Types.ObjectId;
  id: string;
  password: string;
  name: UserName;
  gender: 'male' | 'female' | 'other';
  deathOfBirth: Date;
  email: string;
  contactNumber: string;
  emergencyContactNumber: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  parmanentAddress: string;
  guardian: Guardian;
  localGuardian: localGuardian;
  admissionSemester: Types.ObjectId;
  profileImage?: string;

  isDeleted: boolean;
};
