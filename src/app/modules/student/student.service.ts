/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from 'mongoose';
import { TStudent } from './student.interface';
import StudentModel from './student.modules';
import AppError from '../../errors/AppErrors';
import httpStatus from 'http-status';
import { User } from '../user/user.models';

const getAllStudentFromDB = async (query: Record<string, unknown>) => {
  console.log('base query', query);

  const queryObj = { ...query };
  //searching functinoality
  const studentSearchAbleField = ['email', 'name.firstName', 'presentAddress'];
  let searchTerm = '';
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }
  //filterring
  const excludeFields = ['searchTerm', 'sort'];
  excludeFields.forEach((el) => delete queryObj[el]);
  console.log(query, queryObj);
  const searchQuery = StudentModel.find({
    $or: studentSearchAbleField.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });
  const filterQuery = searchQuery
    .find(queryObj)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicfaculty',
      },
    });

  let sort = '-createdAt';
  if (query.sort) {
    sort = query.sort as string;
  }
  const sortQuery = await filterQuery.sort(sort);
  return sortQuery;
};
const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id })
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
    throw new AppError(httpStatus.BAD_REQUEST, 'Faild to delete student');
  }
};
const updateSingleStudentFromDB = async (
  id: string,
  payload: Partial<TStudent>,
) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;
  const modifiedUpdateData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  //  student non-premitive data dynamicaly update functino
  if (name && Object.keys(name).length) {
    for (const [keys, value] of Object.entries(name)) {
      modifiedUpdateData[`name.${keys}`] = value;
    }
  }
  //Localguardian non premitive data dynamicaly update functino
  if (guardian && Object.keys(guardian).length) {
    for (const [keys, value] of Object.entries(guardian)) {
      modifiedUpdateData[`guardian.${keys}`] = value;
    }
  }
  //guardian non premitive data update dynamicaly functino
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [keys, value] of Object.entries(localGuardian)) {
      modifiedUpdateData[`localGuardian.${keys}`] = value;
    }
  }

  const result = await StudentModel.findOneAndUpdate(
    { id }, // just the ID, not { _id }
    modifiedUpdateData, // the actual data to update
    {
      new: true, // return the updated document
      runValidators: true,
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
