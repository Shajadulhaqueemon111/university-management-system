import { z } from 'zod';

const createacademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Department name must be string',
      required_error: 'Name is required',
    }),
    academicfaculty: z.string({
      invalid_type_error: 'Academic Faculty must be string',
      required_error: 'Faculty is required',
    }),
  }),
});

const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Academic Department name must be string',
        required_error: 'Name is required',
      })
      .optional(),
    academicfaculty: z
      .string({
        invalid_type_error: 'Academic Faculty must be string',
        required_error: 'Faculty is required',
      })
      .optional(),
  }),
});

export const academicDepartmentZodValidation = {
  createacademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};
