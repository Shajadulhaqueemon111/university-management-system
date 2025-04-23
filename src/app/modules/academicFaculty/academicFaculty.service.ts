import { TacademicFaculty } from './academicFaculty.interface';
import AcademicFaculty from './academicFaculty.model';

const createAcademicFacultyIntoDB = async (payload: TacademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const getAllAcademicFacultyIntoDB = async () => {
  const result = await AcademicFaculty.find();
  return result;
};

const getSingleAcademicFacultyIntoDB = async (_id: string) => {
  const result = await AcademicFaculty.findOne({ _id });
  return result;
};
const updateAcademicFacultyIntoDB = async (
  _id: string,
  payload: Partial<TacademicFaculty>,
) => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id }, payload, {
    new: true,
  });
  return result;
};

export const academicFacaultyService = {
  createAcademicFacultyIntoDB,
  getAllAcademicFacultyIntoDB,
  getSingleAcademicFacultyIntoDB,
  updateAcademicFacultyIntoDB,
};
