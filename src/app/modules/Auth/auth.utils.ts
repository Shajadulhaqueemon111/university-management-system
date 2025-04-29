import { User } from '../user/user.models';
import AppError from '../../errors/AppErrors';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';

export const validateUserForLogin = async (id: string) => {
  const user = await User.findOne({ id });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user not found!');
  }

  if (user.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted!');
  }

  if (user.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is already blocked!');
  }

  return user;
};

export const checkPassword = async (
  givenPassword: string,
  savedPassword: string,
) => {
  const isMatched = await bcrypt.compare(givenPassword, savedPassword);

  if (!isMatched) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password is incorrect!');
  }
};
