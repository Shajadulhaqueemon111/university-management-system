/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from 'mongoose';
import config from '../../config';
import AcademicSemister from '../academicSemister/acdemicSemister.model';
import { TStudent } from '../student/student.interface';
import StudentModel from '../student/student.modules';
import { TUser } from './user.interface';
import { User } from './user.models';
import {
  genarateAdminId,
  genarateFacultyId,
  generateStudentId,
} from './user.utils';
import AppError from '../../errors/AppErrors';
import httpStatus from 'http-status';
import { Faculty } from '../faculty/faculty.modle';
import AcademicDepartment from '../academicDepartment/academicDepartment.model';
import { TFaculty } from '../faculty/faculty.interface';
import { Admin } from '../admin/admin.modle';
import { verifyToken } from '../Auth/auth.utils';
const createStudentIntoDB = async (password: string, payload: TStudent) => {
  //create user object
  const userData: Partial<TUser> = {};

  //use default password

  userData.password = password || (config.default_password as string);

  //set user role
  userData.role = 'student';
  //set user email
  userData.email = payload.email;
  //find academic semister  info
  const admissionSemester = await AcademicSemister.findById(
    payload.admissionSemester,
  );

  if (!admissionSemester) {
    throw new Error(
      `Admission semester with ID ${payload.admissionSemester} not found`,
    );
  }

  const session = await mongoose.startSession();
  //set manually genarated id
  try {
    session.startTransaction();
    userData.id = await generateStudentId(admissionSemester);
    //create a user use(transaction-1)
    const newUser = await User.create([userData], { session }); //useing moongose session and startTransection arry system

    if (!newUser.length) {
      //set id,_id as user
      throw new AppError(httpStatus.BAD_REQUEST, 'Faild to create user');
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reffrence id
    //create a student use(transaction-2)
    const newStudent = await StudentModel.create([payload], { session }); //call the studentModel
    if (!newStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Faild to create Student');
    }
    await session.commitTransaction();
    session.endSession();
    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Faild to create Student');
  }
};

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'faculty';
  //set faculty email
  userData.email = payload.email;
  // find academic department info
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(400, 'Academic department not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await genarateFacultyId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //create a faculty
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a faculty (transaction-2)

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};
//create admin
const createAdminIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set admin role
  userData.role = 'admin';
  //set admin email
  userData.email = payload.email;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await genarateAdminId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const getMe = async (userId: string, role: string) => {
  let result = null;
  if (role === 'student') {
    result = await StudentModel.findOne({ id: userId }).populate('user');
  }
  if (role === 'admin') {
    result = await Admin.findOne({ id: userId }).populate('user');
  }
  if (role === 'faculty') {
    result = await Faculty.findOne({ id: userId }).populate('user');
  }
  // const result = await;
  // return result;
  return result;
};
export const UserService = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
  getMe,
};
