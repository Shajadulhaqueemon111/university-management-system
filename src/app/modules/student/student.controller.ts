import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await StudentServices.getAllStudentFromDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Students are retrive succcessfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const getSingleStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { _id } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(_id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Students are retrive succcessfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteSingleStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { _id } = req.params;
    const result = await StudentServices.deleteSingleStudentFromDB(_id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Students deleted succcessfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const updateSingleStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { _id } = req.params;
    const updateData = req.body;
    const result = await StudentServices.updateSingleStudentFromDB(
      _id,
      updateData,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Students updated succcessfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
export const StudentController = {
  // createStudent,
  getAllStudents,
  getSingleStudents,
  deleteSingleStudents,
  updateSingleStudents,
};
