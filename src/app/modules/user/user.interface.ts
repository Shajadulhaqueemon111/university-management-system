import { USER_ROLE } from './user.constant';

export type TUser = {
  id: string;
  email: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
  role: 'admin' | 'student' | 'faculty';
  isDeleted: boolean;
  status: 'in-progress' | 'blocked';
  createdAt: string;
  updatedAt: string;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimesstamp: number,
  ): boolean;
};

export type TUserRole = keyof typeof USER_ROLE;
