/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';

import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { academicSemisterServices } from './academicSemister.service';
const createAcademicSemister = catchAsync(async (req, res, next) => {
  //   const { password, student: studentData } = req.body;
  //direct patay ta cayla
  // const studentData = req.body;

  const result = await academicSemisterServices.createAcademicSemisterIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semister is created successfully',
    data: result,
  });
});

export const academicSemisterController = {
  createAcademicSemister,
};
