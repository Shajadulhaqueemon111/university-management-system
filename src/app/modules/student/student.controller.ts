/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { promise } from 'zod';

const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err: any) => next(err));
  };
};
const getAllStudents: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await StudentServices.getAllStudentFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students are retrive succcessfully',
    data: result,
  });
});
const getSingleStudents: RequestHandler = catchAsync(async (req, res, next) => {
  const { _id } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(_id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Students are retrive succcessfully',
    data: result,
  });
});

const deleteSingleStudents: RequestHandler = catchAsync(
  async (req, res, next) => {
    const { _id } = req.params;
    const result = await StudentServices.deleteSingleStudentFromDB(_id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Students deleted succcessfully',
      data: result,
    });
  },
);
const updateSingleStudents: RequestHandler = catchAsync(
  async (req, res, next) => {
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
  },
);
export const StudentController = {
  // createStudent,
  getAllStudents,
  getSingleStudents,
  deleteSingleStudents,
  updateSingleStudents,
};
