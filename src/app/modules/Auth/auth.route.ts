import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';
import authValidateRequest from '../../middlewares/authValidateRequest';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.loginUser,
);
router.post(
  '/change-password',
  authValidateRequest(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthController.changePassword,
);
router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthController.refreshToken,
);
router.post(
  '/forget-password',
  authValidateRequest('admin', 'faculty', 'student'),
  validateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthController.forgetPassword,
);
router.post(
  '/reset-password',
  authValidateRequest('admin', 'faculty', 'student'),
  validateRequest(AuthValidation.resetPasswordValidationSchema),
  AuthController.resetPassword,
);

export const LoginRouter = router;
