import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import Joi from 'joi';
const createStudent = async (req: Request, res: Response) => {
  try {
    const userNameSchema = Joi.object({
      firstName: Joi.string().trim().max(20).required().messages({
        'string.empty': 'First name is required',
        'string.max': 'First name must be at most 20 characters',
      }),
      middleName: Joi.string().allow(null, '').optional(),
      lastName: Joi.string().max(10).required().messages({
        'string.empty': 'Last name is required',
        'string.max': 'Last name must be at most 10 characters',
      }),
    });

    const guardianSchema = Joi.object({
      fatherName: Joi.string().required(),
      fatherOccupation: Joi.string().required(),
      fatherContactNumber: Joi.string().required(),
      motherName: Joi.string().required(),
      motherOccupation: Joi.string().required(),
      motherContactNumber: Joi.string().required(),
    });

    const localGuardianSchema = Joi.object({
      name: Joi.string().required(),
      occupation: Joi.string().required(),
      contactNumber: Joi.string().required(),
    });

    const studentValidationSchema = Joi.object({
      id: Joi.string().required(),
      name: userNameSchema.required(),
      gender: Joi.string().valid('male', 'female', 'other').required(),
      deathOfBirth: Joi.string().optional(),
      email: Joi.string().email().required(),
      contactNumber: Joi.string().required(),
      emergencyContactNumber: Joi.string().required(),
      bloodGroup: Joi.string()
        .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
        .required(),
      presentAddress: Joi.string().required(),
      parmanentAddress: Joi.string().required(),
      guardian: guardianSchema.required(),
      localGuardian: localGuardianSchema.required(),
      profileImage: Joi.string().uri().optional(),
      isActive: Joi.string().valid('active', 'blocked').optional(),
    });

    const { student: studentData } = req.body;
    //direct patay ta cayla
    // const studentData = req.body;
    const { error, value } = studentValidationSchema.validate(studentData);

    console.log(error, value);
    if (error) {
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
        err: error,
      });
    }
    const result = await StudentServices.createStudentIntoDB(studentData);

    // send response
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      err: err,
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
    res.status(500).json({
      success: false,
      message: 'Retrive data Something went wrong',
      err: err,
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
    res.status(500).json({
      success: false,
      message: 'Single Retrive data Something went wrong',
      err: err,
    });
  }
};

const deleteSingleStudents = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const result = await StudentServices.deleteSingleStudentFromDB(_id);

    res.status(200).json({
      success: true,
      message: 'Students deleted succcessfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'student delete Something went wrong',
      err: err,
    });
  }
};
const updateSingleStudents = async (req: Request, res: Response) => {
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
    res.status(500).json({
      success: false,
      message: 'student update Something went wrong',
      err: err,
    });
  }
};
export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudents,
  deleteSingleStudents,
  updateSingleStudents,
};
