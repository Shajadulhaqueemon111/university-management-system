import { Router } from 'express';
import { UserRouter } from '../modules/user/user.routes';
import { StudentRoute } from '../modules/student/student.route';
import { academicSemisterRoute } from '../modules/academicSemister/academicSemister.router';
import { AcademiFacultyRoute } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRouter } from '../modules/academicDepartment/academicDepartment.route';
import { FacultyRoutes } from '../modules/faculty/faculty.route';
import { AdminRoutes } from '../modules/admin/admin.route';
import { CourseRouter } from '../modules/courses/course.route';

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
  {
    path: '/academic-department',
    route: AcademicDepartmentRouter,
  },
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
  {
    path: '/courses',
    route: CourseRouter,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
