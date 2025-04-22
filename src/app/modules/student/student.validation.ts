import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, 'First name must be at most 20 characters')
    .nonempty('First name is required'),
  middleName: z.string().optional().nullable(),
  lastName: z
    .string()
    .max(10, 'Last name must be at most 10 characters')
    .nonempty('Last name is required'),
});

const guardianValidationSchema = z.object({
  fatherName: z.string().nonempty('Father name is required'),
  fatherOccupation: z.string().nonempty('Father occupation is required'),
  fatherContactNumber: z.string().nonempty('Father contact number is required'),
  motherName: z.string().nonempty('Mother name is required'),
  motherOccupation: z.string().nonempty('Mother occupation is required'),
  motherContactNumber: z.string().nonempty('Mother contact number is required'),
});

const localGuardianValidationSchema = z.object({
  name: z.string().nonempty('Local guardian name is required'),
  occupation: z.string().nonempty('Local guardian occupation is required'),
  contactNumber: z
    .string()
    .nonempty('Local guardian contact number is required'),
});

export const createStudentZodValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(['male', 'female', 'other'], {
        errorMap: () => ({ message: 'Gender must be male, female, or other' }),
      }),
      deathOfBirth: z.string().optional(),
      email: z.string().email('Invalid email address'),
      contactNumber: z.string().nonempty('Contact number is required'),
      emergencyContactNumber: z
        .string()
        .nonempty('Emergency contact number is required'),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
        errorMap: () => ({ message: 'Invalid blood group' }),
      }),
      presentAddress: z.string().nonempty('Present address is required'),
      parmanentAddress: z.string().nonempty('Permanent address is required'),
      guardian: guardianValidationSchema,

      localGuardian: localGuardianValidationSchema,
      admissionSemester: z.string(),
      profileImage: z
        .string()
        .url('Profile image must be a valid URL')
        .optional(),
      isDeleted: z.boolean().default(false),
    }),
  }),
});

export const studentZodValidations = {
  createStudentZodValidationSchema,
};
