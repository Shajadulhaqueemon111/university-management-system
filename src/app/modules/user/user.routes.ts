import express, { NextFunction, Request, Response } from 'express';
import { UserController } from './user.controller';

import { AnyZodObject } from 'zod';
import { studentZodValidationSchema } from '../student/student.validation';

const router = express.Router();

const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //if everything allright next()
    try {
      await schema.parseAsync({
        body: req.body,
      });
      next();
    } catch (err) {
      next(err);
    }
  };
};

router.post(
  '/create-student',
  validateRequest(studentZodValidationSchema),
  UserController.createStudent,
);

export const UserRouter = router;
