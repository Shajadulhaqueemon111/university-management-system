/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

import { ZodError, ZodIssue } from 'zod';
import { TErrorSource } from '../interface/errorType';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next): void => {
  let statusCode = err?.statusCode || 500;
  let message = err?.message || 'Something went wrong!';

  //errrorSources handeling functino
  const errrorSources: TErrorSource = [
    {
      path: '',
      message: 'something went wrong',
    },
  ];

  //zodError Handeller
  const handlerZodError = (err: ZodError) => {
    const errrorSources: TErrorSource = err.issues.map((issue: ZodIssue) => {
      return {
        path: issue?.path[issue.path.length - 1],
        message: issue.message,
      };
    });
    const statusCode = 400;
    return {
      statusCode,
      message: 'Zod Validation error',
      errrorSources,
    };
  };
  //zod error identify instanceof checking

  if (err instanceof ZodError) {
    const simplifiedError = handlerZodError(err);
    console.log(simplifiedError);
    message = 'ami zod error';
  }

  res.status(statusCode).json({
    success: false,
    message,
    errrorSources,
    err: err,
  });
};

export default globalErrorHandler;
//
