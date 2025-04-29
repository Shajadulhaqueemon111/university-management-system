import { USER_ROLE } from './user.constant';

export type TUser = {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
  role: 'admin' | 'student' | 'faculty';
  isDeleted: boolean;
  status: 'in-progress' | 'blocked';
  createdAt: string;
  updatedAt: string;
};

export type TUserRole = keyof typeof USER_ROLE;
