import { TacademicSemister } from '../academicSemister/academicSemister.interface';
import { User } from './user.models';

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },

    {
      id: 1,
      _id: 0,
    },
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastStudent?.id ? lastStudent.id : undefined;
};
export const generateStudentId = async (payload: TacademicSemister) => {
  if (!payload) {
    throw new Error('Semester is required to generate student ID');
  }
  let curentId = (0).toString(); //by default 0000
  const lastStudentId = await findLastStudentId();
  const lastStudentSemisterCode = lastStudentId?.substring(4, 6);
  const lastStudentYear = lastStudentId?.substring(0, 4);
  const currentSemisterCode = payload.code;
  const currentYear = payload.year;
  if (
    lastStudentId &&
    lastStudentSemisterCode === currentSemisterCode &&
    lastStudentYear === currentYear
  ) {
    curentId = lastStudentId.substring(6);
  }

  let incrementId = (Number(curentId) + 1).toString().padStart(4, '0');
  incrementId = `${payload.year}${payload.code}${incrementId}`;
  return incrementId;
};
//generate faculty id
const findLastFacultyId = async () => {
  const lastFaculty = await User.findOne(
    {
      role: 'faculty',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastFaculty?.id ? lastFaculty?.id : undefined;
};

export const genarateFacultyId = async () => {
  let curentId = (0).toString();
  const lastFacultyId = await findLastFacultyId();

  if (lastFacultyId) {
    curentId = lastFacultyId.substring(2);
  }

  const incrementFacultyId = (Number(curentId) + 1).toString().padStart(4, '0');
  const newFacultyId = `F-${incrementFacultyId}`;
  return newFacultyId;
};

//create Admin id
const findLastAdminId = async () => {
  const lastAdmin = await User.findOne(
    {
      role: 'admin',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastAdmin?.id ? lastAdmin?.id : undefined;
};

export const genarateAdminId = async () => {
  let curentId = (0).toString();
  const lastAdminId = await findLastAdminId();

  if (lastAdminId) {
    curentId = lastAdminId.substring(2);
  }

  const incrementAdminId = (Number(curentId) + 1).toString().padStart(4, '0');
  const newAdminId = `F-${incrementAdminId}`;
  return newAdminId;
};
