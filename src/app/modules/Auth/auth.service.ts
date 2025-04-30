import { JwtPayload } from 'jsonwebtoken';
import { TLogin } from './auth.interface';
import { checkPassword, validateUserForLogin } from './auth.utils';
import config from '../../config';
import { User } from '../user/user.models';
import bcrypt from 'bcrypt';
import { createToken } from './auth.jwtUtils';
import AppError from '../../errors/AppErrors';
import httpStatus from 'http-status';

import jwt from 'jsonwebtoken';
import { sendEmail } from '../../utils/sendEmail';

const loginUser = async (payload: TLogin) => {
  //cheking if the user is exist
  const { id, password } = payload;

  const user = await validateUserForLogin(id);

  //checking if the password is correct

  await checkPassword(password, user.password);

  // create token and sent to the client
  const jwtPayload = {
    userId: user?.id,
    role: user?.role,
  };
  console.log(jwtPayload);
  const acessToken = createToken(
    jwtPayload,
    config.jwt_access_secreet as string,
    config.jwt_access_expires as unknown as number,
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refress_secreet as string,
    config.jwt_refress_expires as unknown as number,
  );

  return {
    acessToken,
    refreshToken,
    needPasswordChanged: user?.needsPasswordChange,
  };
};

//change or update password function
const changePasswordService = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  const user = await validateUserForLogin(userData.userId);

  //checking if the password is correct

  await checkPassword(payload.oldPassword, user.password);

  //new change hash password
  const newHashPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bycript_salt_rounded),
  );
  const result = await User.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData.role,
    },
    {
      password: newHashPassword,
      needPasswordChanged: false,
      passwordChangedAt: new Date(),
    },
  );

  return result;
};

const refreshToken = async (token: string) => {
  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You Are Not Autorized !');
  }
  //check if the verify token
  const decoded = jwt.verify(
    token,
    config.jwt_refress_secreet as string,
  ) as JwtPayload;
  console.log(decoded);
  //access routing baced autorization function mean using ka ka route use korta parbe
  const { role, userId, iat } = decoded;
  if (!userId || !role) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid Token Payload!');
  }

  const user = await validateUserForLogin(userId);

  //password change time valid tokon comparizon
  if (
    user.passwordChangedAt &&
    iat &&
    iat * 1000 < new Date(user.passwordChangedAt).getTime()
  ) {
    throw new AppError(
      401,
      'Password was changed after the token was issued. Please log in again.',
    );
  }

  const jwtPayload = {
    userId: user?.id,
    role: user?.role,
  };
  console.log(jwtPayload);
  const acessToken = createToken(
    jwtPayload,
    config.jwt_access_secreet as string,
    config.jwt_access_expires as unknown as number,
  );
  return {
    acessToken,
  };
};

const forgetPassword = async (userId: string) => {
  const user = await validateUserForLogin(userId);
  const jwtPayload = {
    userId: user?.id,
    role: user?.role,
  };

  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_secreet as string,
    '10m' as unknown as number,
  );
  const resetUILink = `${config.rest_pass_ui_link}?id=${user.id}&token=${resetToken}`;
  sendEmail(user.email, resetUILink);
  console.log(resetUILink);
};

const resetPassword = async (
  payload: { id: string; newPassword: string },
  token: string | undefined,
) => {
  await validateUserForLogin(payload?.id);
  //check if the verify token

  const decoded = jwt.verify(
    token as string,
    config.jwt_access_secreet as string, //reset ar somay acces_secret user korta hoba
  ) as JwtPayload;

  console.log(decoded);
  if (payload.id !== decoded.userId) {
    throw new AppError(httpStatus.FORBIDDEN, 'You Are Forbiddent access!');
  }
  const newHashPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bycript_salt_rounded),
  );
  console.log(newHashPassword);
  const result = await User.findOneAndUpdate(
    {
      id: decoded.userId,
      role: decoded.role,
    },
    {
      password: newHashPassword,
      needPasswordChanged: false,
      passwordChangedAt: new Date(),
    },
  );
  return result;
};
export const AuthService = {
  loginUser,
  changePasswordService,
  refreshToken,
  forgetPassword,
  resetPassword,
};
// http://localhost:5000?id=A-0001&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJBLTAwMDEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NDYwNDQwMjAsImV4cCI6MTc0NjA0NDYyMH0.6bPRkfFQhQxIQx3XVmbUSOCjMLxaeTfg0IeY9s9CVVE
