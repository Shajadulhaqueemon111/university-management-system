import { Router } from 'express';
import { UserRouter } from '../modules/user/user.routes';
import { StudentRoute } from '../modules/student/student.route';

const router = Router();

const modulesRoutes = [
  {
    path: '/users',
    route: UserRouter,
  },
  {
    path: '/students',
    route: StudentRoute,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
