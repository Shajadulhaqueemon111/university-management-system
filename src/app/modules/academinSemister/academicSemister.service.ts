import { academicSemisterNameCodeMapper } from './academicSemister.const';
import { TacademicSemister } from './academicSemister.interface';
import AcademicSemisterModel from './acdemicSemister.model';

const createAcademicSemisterIntoDB = async (payload: TacademicSemister) => {
  //semister name and code jodi same hoy tahole mapper ar maddoma error diba

  if (academicSemisterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid Semister Code');
  }
  const result = await AcademicSemisterModel.create(payload);
  return result;
};

//get single semister
const getSingleSemisterIntoDB = async (_id: string) => {
  const result = await AcademicSemisterModel.findOne({ _id });
  return result;
};

//getAllAcademic semister

const getAllAcademicSemisterIntoDB = async () => {
  const result = await AcademicSemisterModel.find();
  return result;
};

const updateAcademicSemisterIntoDB = async (
  _id: string,
  payload: Partial<TacademicSemister>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemisterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error('Invalid Semister Code');
  }

  const result = await AcademicSemisterModel.findOneAndUpdate(
    { _id },
    payload,
    {
      new: true,
    },
  );
  return result;
};
export const academicSemisterServices = {
  createAcademicSemisterIntoDB,
  getSingleSemisterIntoDB,
  getAllAcademicSemisterIntoDB,
  updateAcademicSemisterIntoDB,
};
