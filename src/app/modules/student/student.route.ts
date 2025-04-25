import express from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentZodValidations } from './student.validation';

const router = express.Router();

//will coll controller function

router.get('/', StudentController.getAllStudents);
router.get('/:id', StudentController.getSingleStudents);
router.delete('/:id', StudentController.deleteSingleStudents);
router.patch(
  '/:id',
  validateRequest(studentZodValidations.updateStudentValidationSchema),
  StudentController.updateSingleStudents,
);

export const StudentRoute = router;
