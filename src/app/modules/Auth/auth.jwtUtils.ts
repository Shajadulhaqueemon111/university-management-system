import jwt, { SignOptions } from 'jsonwebtoken';

export const createToken = (
  jwtPayload: { userId: string; role: string },
  secret: string,
  expiresIn: number,
): string => {
  const options: SignOptions = { expiresIn };

  return jwt.sign(jwtPayload, secret, options);
};
