import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { academicFacaultyService } from './academicFaculty.service';
import httpStatus from 'http-status';
const cerateAcademicFaculty = catchAsync(async (req, res) => {
  const result = await academicFacaultyService.createAcademicFacultyIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty Created Successfully',
    data: result,
  });
});

const getAllAcademicFaculty = catchAsync(async (req, res) => {
  const result = await academicFacaultyService.getAllAcademicFacultyIntoDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty retrive is Successfully',
    data: result,
  });
});

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result =
    await academicFacaultyService.getSingleAcademicFacultyIntoDB(facultyId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Academic Faculty Retrive Successfully',
    data: result,
  });
});
const updateAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await academicFacaultyService.updateAcademicFacultyIntoDB(
    facultyId,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Academic Faculty Retrive Successfully',
    data: result,
  });
});

export const AcademicFacultyController = {
  cerateAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
