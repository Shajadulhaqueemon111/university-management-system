/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

//avoide repitation of try catch ,use CatchAsync

const getAllStudents: RequestHandler = catchAsync(async (req, res, next) => {
  console.log(req.query);
  const result = await StudentServices.getAllStudentFromDB(req.query);
  // console.log(result);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students are retrive succcessfully',
    data: result,
  });
});
const getSingleStudents: RequestHandler = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Students are retrive succcessfully',
    data: result,
  });
});

const deleteSingleStudents: RequestHandler = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;
    const result = await StudentServices.deleteSingleStudentFromDB(id);

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
    const { id } = req.params;
    const { student } = req.body;
    const result = await StudentServices.updateSingleStudentFromDB(id, student);

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
