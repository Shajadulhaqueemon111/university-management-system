import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { AuthService } from './auth.service';
const loginUser = catchAsync(async (req, res) => {
  const result = await AuthService.loginUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is Logged in successfully!',
    data: result,
  });
});
const changePassword = catchAsync(async (req, res) => {
  const user = req.user;
  const { ...passwordData } = req.body;
  const result = await AuthService.changePasswordService(user, passwordData);
  console.log(req.user, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'password is updated successfully!',
    data: result,
  });
});

export const AuthController = {
  loginUser,
  changePassword,
};
