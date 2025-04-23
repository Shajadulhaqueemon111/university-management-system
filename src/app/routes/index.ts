import { Router } from 'express';
import { UserRouter } from '../modules/user/user.routes';
import { StudentRoute } from '../modules/student/student.route';
import { academicSemisterRoute } from '../modules/academicSemister/academicSemister.router';
import { AcademiFacultyRoute } from '../modules/academicFaculty/academicFaculty.route';

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
  {
    path: '/academic-semister',
    route: academicSemisterRoute,
  },
  {
    path: '/academic-facultys',
    route: AcademiFacultyRoute,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
