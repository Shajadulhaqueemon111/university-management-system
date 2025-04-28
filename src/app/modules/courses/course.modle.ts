import { model, Schema } from 'mongoose';
import { TCourses, TPreRequisiteCourses } from './course.interface';

const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});
const courseSchema = new Schema<TCourses>(
  {
    title: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    prefix: {
      type: String,
      required: true,
      trim: true,
    },

    code: {
      type: Number,
      required: true,
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    credites: {
      type: Number,
      required: true,
      trim: true,
    },
    preRequisiteCourses: [preRequisiteCoursesSchema],
  },

  {
    timestamps: true,
  },
);
courseSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const Course = model<TCourses>('Course', courseSchema);
