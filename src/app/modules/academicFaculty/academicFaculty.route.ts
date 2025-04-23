import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyZodSchema } from './academicFaculty.validation';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequest(AcademicFacultyZodSchema.academicFacultyValidationSchema),
  AcademicFacultyController.cerateAcademicFaculty,
);

router.get('/', AcademicFacultyController.getAllAcademicFaculty);
router.get(
  '/:facultyId',
  validateRequest(AcademicFacultyZodSchema.academicFacultyValidationSchema),
  AcademicFacultyController.getSingleAcademicFaculty,
);
router.patch(
  '/:facultyId',
  validateRequest(AcademicFacultyZodSchema.academicFacultyValidationSchema),
  AcademicFacultyController.updateAcademicFaculty,
);

export const AcademiFacultyRoute = router;
