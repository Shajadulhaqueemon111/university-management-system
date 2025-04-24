/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from 'mongoose';
import { TStudent } from './student.interface';
import StudentModel from './student.modules';
import AppError from '../../errors/AppErrors';
import httpStatus from 'http-status';
import { User } from '../user/user.models';
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
const deleteSingleStudentFromDB = async (id: string) => {
  // const result = await StudentModel.findByIdAndDelete({ _id });
  const session = await mongoose.startSession();

  try {
    const isExitsStudent = await StudentModel.findOne({ id });
    if (!isExitsStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Student not Found');
    }
    session.startTransaction();

    const deletedStudent = await StudentModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Faild To delete student');
    }
    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Faild to delete user');
    }

    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
  }
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
