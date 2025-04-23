import { model, Schema } from 'mongoose';
import { TacademicFaculty } from './academicFaculty.interface';

const AcademicFacultySchema = new Schema<TacademicFaculty>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

const AcademicFaculty = model<TacademicFaculty>(
  'AcademicFaculty',
  AcademicFacultySchema,
);
export default AcademicFaculty;
