/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSources, TGenericErrorResponse } from '../interface/errorType';

//duplicate department handeller Handeller
const handlerDuplicateIDError = (err: any): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);
  const extracted_message = match && match[1];
  const errrorSources: TErrorSources = [
    {
      path: '',
      message: `${extracted_message} department is already Exits`,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: 'Invalid Duplicate Department',
    errrorSources,
  };
};

export default handlerDuplicateIDError;
