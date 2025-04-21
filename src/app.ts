/* eslint-disable @typescript-eslint/no-unused-vars */

import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoute } from './app/modules/student/student.route';
import { UserRouter } from './app/modules/user/user.routes';
import globalErrorHandeler from './app/middlewares/globalErrorHandeler';

const app: Application = express();

app.use(express.json());
app.use(cors());

//application route
app.use('/api/v1/students', StudentRoute);
app.use('/api/v1/users', UserRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
//global error handeller
app.use(globalErrorHandeler);

export default app;
