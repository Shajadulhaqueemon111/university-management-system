import { TAcademicDepartment } from './academicDepartment.interface';
import AcademicDepartment from './academicDepartment.model';

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);

  return result;
};

const getAllAcademicDepartmentIntoDB = async () => {
  const result = await AcademicDepartment.find();
  return result;
};

const getSingleAcademicDepartmentIntoDB = async (_id: string) => {
  const result = await AcademicDepartment.findOne({ _id });
  return result;
};

const updatedAcademicDepartmentIntoDB = async (
  _id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartment.findOneAndUpdate({ _id }, payload, {
    new: true,
  });
  return result;
};
export const AcademicDepartmentService = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentIntoDB,
  getSingleAcademicDepartmentIntoDB,
  updatedAcademicDepartmentIntoDB,
};
