import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppErrors';

const authValidateRequest = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    //if everything allright next()
    const token = req.headers.authorization;
    console.log(token);
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You Are Not Autorized !');
    }
    next();
  });
};

export default authValidateRequest;
