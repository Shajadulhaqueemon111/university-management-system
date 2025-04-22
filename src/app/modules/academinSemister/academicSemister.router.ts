import express from 'express';
import { academicSemisterController } from './academicSemister.controller';
import validateRequest from '../../middlewares/validateRequest';
import { academicSemisterZodValidation } from './academicSemisterValidation';

const router = express.Router();

//will coll controller function

router.post(
  '/create-academic-semister',
  validateRequest(
    academicSemisterZodValidation.createAcademcSemisterValidationSchema,
  ),
  academicSemisterController.createAcademicSemister,
);

router.get(
  '/:semisterId',
  academicSemisterController.getAllAcdemicSingleSemister,
);
router.get('/', academicSemisterController.getAllAcdemicSingleSemister);

export const academicSemisterRoute = router;
