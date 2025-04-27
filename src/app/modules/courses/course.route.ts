import express from 'express';
import { courseController } from './course.controller';
import validateRequest from '../../middlewares/validateRequest';
import { courseValidationSchema } from './course.validation';

const router = express.Router();

router.post(
  '/create-course',
  validateRequest(courseValidationSchema.createCourseZodSchema),
  courseController.createCourse,
);
router.get('/', courseController.getAllCourse);
router.get('/:id', courseController.getSingleCourse);
router.delete(
  '/:id',
  validateRequest(courseValidationSchema.createCourseZodSchema),
  courseController.deletedCourse,
);

export const CourseRouter = router;
