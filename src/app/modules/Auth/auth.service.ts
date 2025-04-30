import { JwtPayload } from 'jsonwebtoken';
import { TLogin } from './auth.interface';
import { checkPassword, validateUserForLogin } from './auth.utils';
import config from '../../config';
import { User } from '../user/user.models';
import bcrypt from 'bcrypt';
import { createToken } from './auth.jwtUtils';

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
  const acessToken = createToken(
    jwtPayload,
    config.jwt_access_secreet as string,
    config.jwt_access_expires as unknown as number,
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refress_secreet as string,
    config.jwt_refress_expires as unknown as number,
  );

  return {
    acessToken,
    refreshToken,
    needPasswordChanged: user?.needsPasswordChange,
  };
};

//change or update password function
const changePasswordService = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  const user = await validateUserForLogin(userData.userId);

  //checking if the password is correct

  await checkPassword(payload.oldPassword, user.password);

  //new change hash password
  const newHashPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bycript_salt_rounded),
  );
  const result = await User.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData.role,
    },
    {
      password: newHashPassword,
      needPasswordChanged: false,
      passwordChangedAt: new Date(),
    },
  );

  console.log(result);
  return null;
};
export const AuthService = {
  loginUser,
  changePasswordService,
};
