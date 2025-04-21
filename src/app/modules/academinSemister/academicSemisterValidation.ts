import { z } from 'zod';
import {
  AcademicSemisterCode,
  AcademicSemisterName,
  Months,
} from './academicSemister.const';

export const createAcademcSemisterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...AcademicSemisterName] as [string, ...string[]]),
    year: z.date(),
    code: z.enum([...AcademicSemisterCode] as [string, ...string[]]),
    startDate: z.enum([...Months] as [string, ...string[]]),
    endDate: z.enum([...Months] as [string, ...string[]]),
  }),
});

export const academicSemisterZodValidation = {
  createAcademcSemisterValidationSchema,
};
