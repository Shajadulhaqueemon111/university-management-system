import express from 'express';
import { UserController } from './user.controller';

import { createStudentZodValidationSchema } from '../student/student.validation';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidations } from '../faculty/faculty.validation';
import { AdminValidations } from '../admin/admin.validation';
import authValidateRequest from '../../middlewares/authValidateRequest';
import { USER_ROLE } from './user.constant';
import { userValidation } from './user.validation';

const router = express.Router();

router.post(
  '/create-student',
  authValidateRequest(USER_ROLE.admin),
  validateRequest(createStudentZodValidationSchema),
  UserController.createStudent,
);
router.post(
  '/create-faculty',
  authValidateRequest(USER_ROLE.admin, USER_ROLE.student),
  validateRequest(studentValidations.createFacultyValidationSchema),
  UserController.createFaculty,
);
router.post(
  '/create-admin',
  validateRequest(AdminValidations.createAdminValidationSchema),
  UserController.createAdmin,
);
router.get(
  '/:me',
  authValidateRequest(USER_ROLE.admin, USER_ROLE.student),
  UserController.getMe,
);
router.patch(
  '/change-status/:id',
  authValidateRequest(USER_ROLE.admin),
  validateRequest(userValidation.changeStatusValidationSchema),
  UserController.changeStatus,
);

export const UserRouter = router;
