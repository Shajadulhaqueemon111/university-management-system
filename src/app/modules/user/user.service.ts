import config from '../../config';
import { Student } from '../student/student.interface';
import StudentModel from '../student/student.modules';
import { TUser } from './user.interface';
import { User } from './user.models';

const createStudentIntoDB = async (password: string, studentData: Student) => {
  //create user object
  const userData: Partial<TUser> = {};

  //use default password

  userData.password = password || (config.default_pass as string);

  //set user role
  userData.role = 'student';

  //set manually genarated id
  userData.id = '004987586';
  const newUser = await User.create(userData);

  if (Object.keys(newUser).length) {
    //set id,_id as user
    studentData.id = newUser.id;
    studentData.user = newUser._id; //reffrence id
    const newStudent = await StudentModel.create(studentData); //call the studentModel

    return newStudent;
  }
};

export const UserService = {
  createStudentIntoDB,
};
