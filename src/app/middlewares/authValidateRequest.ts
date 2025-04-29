import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppErrors';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
const authValidateRequest = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    //if check the token is client side sent token
    const token = req.headers.authorization;
    console.log(token);
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You Are Not Autorized !');
    }
    //check if the verify token
    jwt.verify(
      token,
      config.jwt_access_secreet as string,
      function (err, decoded) {
        // err
        if (err) {
          throw new AppError(
            httpStatus.UNAUTHORIZED,
            'You are not authorized token!',
          );
        }
        //access routing baced autorization function mean using ka ka route use korta parbe
        const role = (decoded as JwtPayload).role;
        if (requiredRoles && !requiredRoles.includes(role)) {
          throw new AppError(
            httpStatus.UNAUTHORIZED,
            'You Are Not Autorized !',
          );
        }
        // decoded undefined
        req.user = decoded as JwtPayload;
        console.log(decoded);
        next();
      },
    );
  });
};

export default authValidateRequest;
