import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import AcademicDepartment from './academicDepartment.model';

const createAcademicDepartmentIntoDB = catchAsync(async (req, res) => {
  const result = await AcademicDepartment.create(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic department created succesfully',
    data: result,
  });
});

export const AcademicDepartmentService = {
  createAcademicDepartmentIntoDB,
};
