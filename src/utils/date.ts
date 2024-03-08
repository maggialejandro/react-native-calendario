import moment from 'moment';
import { DateString } from 'react-native-month/lib/typescript/src/types';

export const DATE_FORMAT = 'YYYY-MM-DD';

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

// TODO: import from react-native-month
export function isValidDate(str?: string): str is DateString {
  if (!str) {
    return false;
  }
  return (
    str.match(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[01])$/) !== null
  );
}

export function getMonthIndex(
  firstMonth: DateString,
  startDate: DateString,
  months: any[],
  numberOfMonths: number
) {
  const _firstMonth = moment(firstMonth);
  const lastMonth = _firstMonth
    .clone()
    .add(numberOfMonths, 'months')
    .endOf('month')
    .format(DATE_FORMAT);

  if (startDate >= firstMonth && startDate <= lastMonth) {
    const monthIndex = moment(startDate).diff(_firstMonth, 'months');

    if (monthIndex >= 0 && monthIndex <= months.length) {
      return monthIndex;
    }
  }

  return null;
}
