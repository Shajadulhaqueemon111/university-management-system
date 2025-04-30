import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyZodSchema } from './academicFaculty.validation';
import authValidateRequest from '../../middlewares/authValidateRequest';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequest(
    AcademicFacultyZodSchema.createAcademicFacultyValidationSchema,
  ),
  AcademicFacultyController.cerateAcademicFaculty,
);

router.get(
  '/',
  authValidateRequest(USER_ROLE.admin),
  AcademicFacultyController.getAllAcademicFaculty,
);
router.get(
  '/:facultyId',
  authValidateRequest(USER_ROLE.admin),
  AcademicFacultyController.getSingleAcademicFaculty,
);
router.patch(
  '/:facultyId',
  validateRequest(
    AcademicFacultyZodSchema.updateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyController.updateAcademicFaculty,
);

export const AcademiFacultyRoute = router;
