import { Request, Response } from 'express';
import { StudentServices } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    //direct patay ta cayla
    // const studentData = req.body;

    // call service function to send this data
    const result = await StudentServices.createStudentIntoDB(studentData);

    // send response
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentFromDB();

    res.status(200).json({
      success: true,
      message: 'Students are retrive succcessfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Retrive data Something went wrong',
    });
  }
};
const getSingleStudents = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(_id);

    res.status(200).json({
      success: true,
      message: 'Single Students are retrive succcessfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Single Retrive data Something went wrong',
    });
  }
};
export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudents,
};
