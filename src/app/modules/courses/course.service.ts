import { Course } from './course.modle';

const createCourseIntoDB = async () => {
  const result = await Course.create();
  return result;
};

const getAllCoursesIntoDB = async () => {
  const result = await Course.find();
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
