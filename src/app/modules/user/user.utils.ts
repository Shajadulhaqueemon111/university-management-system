import { TacademicSemister } from '../academicSemister/academicSemister.interface';

export const generateStudentId = (payload: TacademicSemister) => {
  if (!payload) {
    throw new Error('Semester is required to generate student ID');
  }
  const curentId = (0).toString();
  let incrementId = (Number(curentId) + 1).toString().padStart(4, '0');
  incrementId = `${payload.year}${payload.code}${incrementId}`;
  return incrementId;
};
