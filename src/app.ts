/* eslint-disable @typescript-eslint/no-unused-vars */

import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';

import globalErrorHandeler from './app/middlewares/globalErrorHandeler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

app.use(express.json());
app.use(cors());

//application route
// app.use('/api/v1/students', StudentRoute);
// app.use('/api/v1/users', UserRouter);
app.use('/api/v1', router);
app.get('/', (req: Request, res: Response) => {
  // Promise.reject();
  res.send('Hello World!');
});
//global error handeller
app.use(globalErrorHandeler);

//not error handeller
app.use(notFound);

export default app;
