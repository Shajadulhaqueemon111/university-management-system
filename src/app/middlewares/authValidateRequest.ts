import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppErrors';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { validateUserForLogin } from '../modules/Auth/auth.utils';
const authValidateRequest = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    //if check the token is client side sent token
    const token = req.headers.authorization;
    console.log(token);
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You Are Not Autorized !');
    }
    //check if the verify token
    const decoded = jwt.verify(
      token,
      config.jwt_access_secreet as string,
    ) as JwtPayload;
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

    if (!user) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'User not found!');
    }

    // await checkPassword(password, user.password);
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You Are Not Autorized !');
    }
    // decoded undefined
    req.user = decoded as JwtPayload;

    next();
  });
};

export default authValidateRequest;
