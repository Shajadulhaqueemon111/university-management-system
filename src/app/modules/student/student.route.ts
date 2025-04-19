import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();

//will coll controller function
router.post('/create-student', StudentController.createStudent);
router.get('/', StudentController.getAllStudents);
router.get('/:_id', StudentController.getSingleStudents);
router.delete('/:_id', StudentController.deleteSingleStudents);
router.patch('/:_id', StudentController.updateSingleStudents);

export const StudentRoute = router;
