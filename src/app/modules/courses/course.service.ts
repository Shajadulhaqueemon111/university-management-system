import QueryBuilder from '../../queryBuilder/QueryBuilder';
import { courseSearchAbleFields } from './course.constant';
import { TCourses } from './course.interface';
import { Course } from './course.modle';

const createCourseIntoDB = async (payload: TCourses) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCoursesIntoDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(courseSearchAbleFields)
    .filter()
    .sort()
    .fields()
    .paginate();
  const result = await courseQuery.modelQuery;
  return result;
};

const getSingleCoursesIntoDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};
const updateCoursesIntoDB = async (id: string, payload: Partial<TCourses>) => {
  const result = await Course.findById(id, payload);
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
