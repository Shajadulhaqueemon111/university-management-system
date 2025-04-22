import { model, Schema } from 'mongoose';
import { TacademicSemister } from './academicSemister.interface';
import {
  AcademicSemisterCode,
  AcademicSemisterName,
  Months,
} from './academicSemister.const';

const academicSemisterSchema = new Schema<TacademicSemister>(
  {
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
  },

  {
    timestamps: true,
  },
);
// akoy year a aki name kono semister create off korar jonno pre hook and condition user
academicSemisterSchema.pre('save', async function (next) {
  const isSemisterExists = await AcademicSemister.findOne({
    year: this.year,
    name: this.name,
  });
  if (isSemisterExists) {
    throw new Error('Semister is Already Exists');
  }
  next();
});
const AcademicSemister = model<TacademicSemister>(
  'AcademicSemister',
  academicSemisterSchema,
);
export default AcademicSemister;
