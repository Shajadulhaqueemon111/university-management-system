import { z } from 'zod';

const preRequisiteCourseZodSchema = z.object({
  course: z.string().optional(),
  isDeleted: z.boolean().optional(),
});

const createCourseZodSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required',
      })
      .trim(),

    prefix: z
      .string({
        required_error: 'Prefix is required',
      })
      .trim(),

    code: z.number({
      required_error: 'Code is required',
    }),

    credites: z.number({
      required_error: 'Credits are required',
    }),

    preRequisiteCourses: z.array(preRequisiteCourseZodSchema).optional(),
  }),
  isDeleted: z.boolean().optional(),
});
//update course
// const updatePreRequisiteCourseZodSchema = z.object({
//   course: z.string().optional(),
//   isDeleted: z.boolean().optional(),
// });

// export const updateCourseZodSchema = z.object({
//   body: z.object({
//     title: z.string({ required_error: 'Title is required' }).trim().optional(),
//     prefix: z
//       .string({ required_error: 'Prefix is required' })
//       .trim()
//       .optional(),
//     code: z.number({ required_error: 'Code is required' }).optional(),
//     credites: z.number({ required_error: 'Credits are required' }).optional(),
//     preRequisiteCourses: z.array(updatePreRequisiteCourseZodSchema).optional(),
//   }),
//   isDeleted: z.boolean().optional(),
// });

const updateCourseZodSchema = createCourseZodSchema.partial();
export const courseValidationSchema = {
  createCourseZodSchema,
  updateCourseZodSchema,
};
