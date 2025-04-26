import express from 'express';
import { UserController } from './user.controller';

import { createStudentZodValidationSchema } from '../student/student.validation';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidations } from '../faculty/faculty.validation';
import { AdminValidations } from '../admin/admin.validation';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(createStudentZodValidationSchema),
  UserController.createStudent,
);
router.post(
  '/create-faculty',
  validateRequest(studentValidations.createFacultyValidationSchema),
  UserController.createFaculty,
);
router.post(
  '/create-admin',
  validateRequest(AdminValidations.createAdminValidationSchema),
  UserController.createAdmin,
);

export const UserRouter = router;
