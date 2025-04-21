import { model, Schema } from 'mongoose';
import { TacademicSemister } from './academicSemister.interface';
import {
  AcademicSemisterCode,
  AcademicSemisterName,
  Months,
} from './academicSemister.const';

const academicSemisterSchema = new Schema<TacademicSemister>({
  name: {
    type: String,
    enum: AcademicSemisterName,
    required: true,
  },
  code: {
    type: String,
    enum: AcademicSemisterCode,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  startMonth: {
    type: String,
    enum: Months,
    required: true,
  },
  endMonth: {
    type: String,
    enum: Months,
    required: true,
  },
});

const AcademicSemisterModel = model<TacademicSemister>(
  'AcademicSemisterModel',
  academicSemisterSchema,
);
export default AcademicSemisterModel;
