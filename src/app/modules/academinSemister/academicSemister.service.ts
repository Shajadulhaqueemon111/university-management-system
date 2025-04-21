import { TacademicSemister } from './academicSemister.interface';
import AcademicSemisterModel from './acdemicSemister.model';

const createAcademicSemisterIntoDB = async (payload: TacademicSemister) => {
  const result = await AcademicSemisterModel.create(payload);
  return result;
};

export const academicSemisterServices = {
  createAcademicSemisterIntoDB,
};
