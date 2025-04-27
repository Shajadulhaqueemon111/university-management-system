import QueryBuilder from '../../queryBuilder/QueryBuilder';
import { courseSearchAbleFields } from './course.constant';
import { Course } from './course.modle';

const createCourseIntoDB = async () => {
  const result = await Course.create();
  return result;
};

const getAllCoursesIntoDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(Course.find(), query)
    .search(courseSearchAbleFields)
    .filter()
    .sort()
    .fields()
    .paginate();
  const result = await courseQuery.modelQuery;
  return result;
};

const getSingleCoursesIntoDB = async (id: string) => {
  const result = await Course.findById(id);
  return result;
};
const updateCoursesIntoDB = async (id: string) => {
  const result = await Course.findById(id);
  return result;
};

const deleteCourseIntoDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    { new: true },
  );

  return result;
};
export const courseServices = {
  createCourseIntoDB,
  getAllCoursesIntoDB,
  getSingleCoursesIntoDB,
  updateCoursesIntoDB,
  deleteCourseIntoDB,
};
