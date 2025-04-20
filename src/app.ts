/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoute } from './app/modules/student/student.route';
import { UserRouter } from './app/modules/user/user.routes';
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
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err?.statusCode || 500;
  const message = err?.message || 'Something went wrong!';

  res.status(statusCode).json({
    success: false,
    message,
    error: err,
  });
});
export default app;
