import mongoose from 'mongoose';
import config from '../../config';
import AcademicSemister from '../academicSemister/acdemicSemister.model';
import { TStudent } from '../student/student.interface';
import StudentModel from '../student/student.modules';
import { TUser } from './user.interface';
import { User } from './user.models';
import { generateStudentId } from './user.utils';
import AppError from '../../errors/AppErrors';
import httpStatus from 'http-status';
const createStudentIntoDB = async (password: string, payload: TStudent) => {
  //create user object
  const userData: Partial<TUser> = {};

  //use default password

  userData.password = password || (config.default_pass as string);

  //set user role
  userData.role = 'student';

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
    const newUser = await User.create([userData], { session }); //useing moongose session and startTransection arry system

    if (!newUser.length) {
      //set id,_id as user
      throw new AppError(httpStatus.BAD_REQUEST, 'Faild to create user');
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reffrence id
    const newStudent = await StudentModel.create(payload); //call the studentModel

    return newStudent;
  } catch (err) {
    console.log(err);
  }
};

export const UserService = {
  createStudentIntoDB,
};
