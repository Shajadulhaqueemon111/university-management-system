export type TMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type TacademicSemisterName = 'Autumn' | 'Summer' | 'Fall';
export type TacademicSemisterCode = '01' | '02' | '03';

export type TacademicSemister = {
  name: TacademicSemisterName;
  code: TacademicSemisterCode;
  year: Date;
  startMonth: TMonths;
  endMonth: TMonths;
};
