import { TStudent } from './student.interface';
import StudentModel from './student.modules';

const getAllStudentFromDB = async () => {
  const result = await StudentModel.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicfaculty',
      },
    });
  return result;
};
const getSingleStudentFromDB = async (_id: string) => {
  const result = await StudentModel.findOne({ _id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicfaculty',
      },
    });
  return result;
};
const deleteSingleStudentFromDB = async (_id: string) => {
  // const result = await StudentModel.findByIdAndDelete({ _id });
  const result = await StudentModel.updateOne({ _id }, { isDeleted: true });
  return result;
};
const updateSingleStudentFromDB = async (
  _id: string,
  updateData: Partial<TStudent>,
) => {
  const result = await StudentModel.findOneAndUpdate(
    { _id }, // just the ID, not { _id }
    updateData, // the actual data to update
    {
      new: true, // return the updated document
      runValidators: true, // ensure validation runs
    },
  );

  return result;
};

export const StudentServices = {
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteSingleStudentFromDB,
  updateSingleStudentFromDB,
};
