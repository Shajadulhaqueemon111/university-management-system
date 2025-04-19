import { Student } from './student.interface';
import StudentModel from './student.modules';

const createStudentIntoDB = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};

const getAllStudentFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};
const getSingleStudentFromDB = async (_id: string) => {
  const result = await StudentModel.findOne({ _id });
  return result;
};
const deleteSingleStudentFromDB = async (_id: string) => {
  const result = await StudentModel.findByIdAndDelete({ _id });
  return result;
};
const updateSingleStudentFromDB = async (
  _id: string,
  updateData: Partial<Student>,
) => {
  const result = await StudentModel.findByIdAndUpdate(
    _id, // just the ID, not { _id }
    updateData, // the actual data to update
    {
      new: true, // return the updated document
      runValidators: true, // ensure validation runs
    },
  );

  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteSingleStudentFromDB,
  updateSingleStudentFromDB,
};
