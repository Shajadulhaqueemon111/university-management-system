/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, RequestHandler, Response } from 'express';

import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { academicSemisterServices } from './academicSemister.service';
const createAcademicSemister: RequestHandler = catchAsync(
  async (req, res, next) => {
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
  },
);
//get single semister
const getAllAcdemicSingleSemister: RequestHandler = catchAsync(
  async (req, res, next) => {
    const { semisterId } = req.params;
    const result =
      await academicSemisterServices.getSingleSemisterIntoDB(semisterId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Allsingle Semister is rettrive successfully',
      data: result,
    });
  },
);

const getAllAcademicSemister = catchAsync(async (req, res, next) => {
  const result = await academicSemisterServices.getAllAcademicSemisterIntoDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Allsingle Semister is rettrive successfully',
    data: result,
  });
});
//update academic semister
const updateAcdemicSemister: RequestHandler = catchAsync(
  async (req, res, next) => {
    const { semisterId } = req.params;
    const result = await academicSemisterServices.updateAcademicSemisterIntoDB(
      semisterId,
      req.body,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Updated Semister data is  successfully',
      data: result,
    });
  },
);
export const academicSemisterController = {
  createAcademicSemister,
  getAllAcdemicSingleSemister,
  getAllAcademicSemister,
  updateAcdemicSemister,
};
