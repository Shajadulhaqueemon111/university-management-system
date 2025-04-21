import { model, Schema } from 'mongoose';
import { TacademicSemister } from './academicSemister.interface';

const academicSemisterSchema = new Schema<TacademicSemister>({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  year: {
    type: Date,
    required: true,
  },
  startMonth: {
    type: String,
    required: true,
  },
  endMonth: {
    type: String,
    required: true,
  },
});

const AcademicSemisterModel = model<TacademicSemister>(
  'TacademicSemister',
  academicSemisterSchema,
);
export default AcademicSemisterModel;
