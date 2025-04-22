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
  year: string;
  startMonth: TMonths;
  endMonth: TMonths;
  createdAt: string;
  updatedAt: string;
};
//semister name and code jodi same hoy tahole mapper ar maddoma error diba
export type TacademicSemisterNameCodeMapper = {
  [key: string]: string;
};
