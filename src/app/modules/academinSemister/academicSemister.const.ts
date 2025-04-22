import {
  TacademicSemisterCode,
  TacademicSemisterName,
  TacademicSemisterNameCodeMapper,
  TMonths,
} from './academicSemister.interface';

export const Months: TMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const AcademicSemisterName: TacademicSemisterName[] = [
  'Autumn',
  'Summer',
  'Fall',
];

export const AcademicSemisterCode: TacademicSemisterCode[] = ['01', '02', '03'];

export const academicSemisterNameCodeMapper: TacademicSemisterNameCodeMapper = {
  Autumn: '01',
  Fall: '02',
  Summer: '03',
};
