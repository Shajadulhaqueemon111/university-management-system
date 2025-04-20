import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';
// import studentValidationSchema from './student.validation';

// const createStudent = async (req: Request, res: Response) => {
//   try {
//     const { student: studentData } = req.body;
//     //direct patay ta cayla
//     // const studentData = req.body;
//     const { error, value } = studentValidationSchema.validate(studentData);
//     const result = await StudentServices.createStudentIntoDB(studentData);
//     console.log(error, value);
//     if (error) {
//       res.status(500).json({
//         success: false,
//         message: 'Something went wrong',
//         err: error.details,
//       });
//     }

//     // send response
//     res.status(200).json({
//       success: true,
//       message: 'Student is created successfully',
//       data: result,
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: 'student already exist',
//       err: err,
//     });
//   }
// };

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await StudentServices.getAllStudentFromDB();

    res.status(200).json({
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

    res.status(200).json({
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

    res.status(200).json({
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

    res.status(200).json({
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
