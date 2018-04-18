// @flow

export type DayType = {
  id: string,
  date: Date,
  isActive: boolean,
  isStartDate: boolean,
  isEndDate: boolean,
  isVisible: boolean
};

export type MonthNumberType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type MonthType = {
  id: number,
  name: string,
  monthNumber: MonthNumberType,
  year: number,
  days: Array<DayType>,
  isVisible: boolean,
  startDate?: ?Date,
  endDate?: ?Date
};

export type ViewTokenType = {
  item: any,
  key: string,
  index: ?number,
  isViewable: boolean,
  section?: any
};
