import { TacademicSemister } from './academicSemister.interface';
import AcademicSemisterModel from './acdemicSemister.model';

const createAcademicSemisterIntoDB = async (payload: TacademicSemister) => {
  //semister name and code jodi same hoy tahole mapper ar maddoma error diba
  type TacademicSemisterNameCodeMapper = {
    [key: string]: string;
  };
  const academicSemisterNameCodeMapper: TacademicSemisterNameCodeMapper = {
    Autumn: '01',
    Fall: '02',
    Summer: '03',
  };

  if (academicSemisterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid Semister Code');
  }
  const result = await AcademicSemisterModel.create(payload);
  return result;
};

export const academicSemisterServices = {
  createAcademicSemisterIntoDB,
};
