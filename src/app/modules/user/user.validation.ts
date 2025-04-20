import { z } from 'zod';

export const userZodValidationSchema = z.object({
  password: z
    .string({
      required_error: 'Password is required',
    })
    .max(20)
    .optional(),
});

export const userValidation = {
  userZodValidationSchema,
};
