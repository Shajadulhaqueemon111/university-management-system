/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
// import { userZodValidationSchema } from './user.validation';
import { UserService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
const createStudent = catchAsync(async (req, res, next) => {
  const { password, student: studentData } = req.body;
  //direct patay ta cayla
  // const studentData = req.body;

  const result = await UserService.createStudentIntoDB(password, studentData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created successfully',
    data: result,
  });
});

export const UserController = {
  createStudent,
};
