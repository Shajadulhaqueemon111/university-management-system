import Joi from 'joi';

const userNameSchema = Joi.object({
  firstName: Joi.string().trim().max(20).required().messages({
    'string.empty': 'First name is required',
    'string.max': 'First name must be at most 20 characters',
  }),
  middleName: Joi.string().allow(null, '').optional(),
  lastName: Joi.string().max(10).required().messages({
    'string.empty': 'Last name is required',
    'string.max': 'Last name must be at most 10 characters',
  }),
});

const guardianSchema = Joi.object({
  fatherName: Joi.string().required(),
  fatherOccupation: Joi.string().required(),
  fatherContactNumber: Joi.string().required(),
  motherName: Joi.string().required(),
  motherOccupation: Joi.string().required(),
  motherContactNumber: Joi.string().required(),
});

const localGuardianSchema = Joi.object({
  name: Joi.string().required(),
  occupation: Joi.string().required(),
  contactNumber: Joi.string().required(),
});

const studentValidationSchema = Joi.object({
  id: Joi.string().required(),

  name: userNameSchema.required(),
  gender: Joi.string().valid('male', 'female', 'other').required(),
  deathOfBirth: Joi.string().optional(),
  email: Joi.string().email().required(),
  contactNumber: Joi.string().required(),
  emergencyContactNumber: Joi.string().required(),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .required(),
  presentAddress: Joi.string().required(),
  parmanentAddress: Joi.string().required(),
  guardian: guardianSchema.required(),
  localGuardian: localGuardianSchema.required(),
  profileImage: Joi.string().uri().optional(),

  isDeleted: Joi.boolean().strict().default(false),
});

export default studentValidationSchema;
