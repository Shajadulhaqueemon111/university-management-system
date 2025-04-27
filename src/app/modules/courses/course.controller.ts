import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { courseServices } from './course.service';
import httpStatus from 'http-status';
const createCourse = catchAsync(async (req, res) => {
  const result = await courseServices.createCourseIntoDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'course is created successfully',
    data: result,
  });
});
const getAllCourse = catchAsync(async (req, res) => {
  const result = await courseServices.getAllCoursesIntoDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'course is created successfully',
    data: result,
  });
});
const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await courseServices.getSingleCoursesIntoDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'course is created successfully',
    data: result,
  });
});
const deletedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await courseServices.deleteCourseIntoDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'course is created successfully',
    data: result,
  });
});

export const courseController = {
  createCourse,
  getAllCourse,
  getSingleCourse,
  deletedCourse,
};
