import express from 'express';
import { courseController } from './course.controller';

const router = express.Router();

router.post('/create-course', courseController.createCourse);
router.get('/', courseController.getAllCourse);
router.get('/:id', courseController.getSingleCourse);
router.delete('/:id', courseController.deletedCourse);

export const CourseRouter = router;
