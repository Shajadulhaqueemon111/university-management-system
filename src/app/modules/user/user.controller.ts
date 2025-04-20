import { NextFunction, Request, Response } from 'express';
// import { userZodValidationSchema } from './user.validation';
import { UserService } from './user.service';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: studentData } = req.body;
    //direct patay ta cayla
    // const studentData = req.body;
    // const { error, value } = userZodValidationSchema.(studentData);
    const result = await UserService.createStudentIntoDB(password, studentData);
    // console.log(error, value);
    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'Something went wrong',
    //     err: error.details,
    //   });
    // }

    // send response
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const UserController = {
  createStudent,
};
