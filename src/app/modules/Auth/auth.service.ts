import jwt from 'jsonwebtoken';
import { TLogin } from './auth.interface';
import { checkPassword, validateUserForLogin } from './auth.utils';
import config from '../../config';

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
  const acessToken = jwt.sign(jwtPayload, config.jwt_access_secreet as string, {
    expiresIn: '10d',
  });

  return {
    acessToken,
    needPasswordChanged: user?.needsPasswordChange,
  };
};
export const AuthService = {
  loginUser,
};
