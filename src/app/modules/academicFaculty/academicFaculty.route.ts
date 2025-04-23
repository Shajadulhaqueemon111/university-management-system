import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyZodSchema } from './academicFaculty.validation';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequest(
    AcademicFacultyZodSchema.createAcademicFacultyValidationSchema,
  ),
  AcademicFacultyController.cerateAcademicFaculty,
);

router.get('/', AcademicFacultyController.getAllAcademicFaculty);
router.get(
  '/:facultyId',

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
