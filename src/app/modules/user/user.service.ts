import config from '../../config';
import AcademicSemister from '../academicSemister/acdemicSemister.model';
import { TStudent } from '../student/student.interface';
import StudentModel from '../student/student.modules';
import { TUser } from './user.interface';
import { User } from './user.models';
import { generateStudentId } from './user.utils';

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

  //set manually genarated id
  userData.id = await generateStudentId(admissionSemester);
  const newUser = await User.create(userData);

  if (Object.keys(newUser).length) {
    //set id,_id as user
    payload.id = newUser.id;
    payload.user = newUser._id; //reffrence id
    const newStudent = await StudentModel.create(payload); //call the studentModel

    return newStudent;
  }
};

export const UserService = {
  createStudentIntoDB,
};
