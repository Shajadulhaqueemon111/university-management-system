import jwt from 'jsonwebtoken';

export const createToken = (
  jwtPayload: { userId: string; role: string },
  secret: string,
  expiresIn: number,
): string => {
  return jwt.sign(jwtPayload, secret, { expiresIn });
};
