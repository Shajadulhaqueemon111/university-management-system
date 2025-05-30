import config from '../config';

import { USER_ROLE } from '../modules/user/user.constant';
import { User } from '../modules/user/user.models';

const superUser = {
  id: '0001',
  email: 'mdshajdulhaqueemon@gmail.com',
  password: config.super_admin_password,

  role: USER_ROLE.superAdmin,
  isDeleted: false,
  status: 'in-progress',
};

export const seedSuperAdmin = async () => {
  //when database is connected we will check is there any user who is super admin

  const isSuperAdminExits = await User.findOne({ role: USER_ROLE.superAdmin });

  if (!isSuperAdminExits) {
    await User.create(superUser);
  }
};
