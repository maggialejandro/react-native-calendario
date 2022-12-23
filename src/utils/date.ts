import moment from 'moment';

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function isValidDate(date: Date): boolean {
  return (
    Object.prototype.toString.call(date) === '[object Date]' &&
    !isNaN(date.getTime())
  );
}

export function isSameDate(one: Date, other: Date) {
  return (
    one.getDate() === other.getDate() &&
    one.getMonth() === other.getMonth() &&
    one.getFullYear() === other.getFullYear()
  );
}

export function getMonthIndex(
  firstMonth: Date,
  date: Date,
  months: any[],
  numberOfMonths: number
) {
  const _firstMonth = moment(firstMonth);
  const lastMonth = _firstMonth.clone().add(numberOfMonths, 'months');

  if (
    date >= _firstMonth.toDate() &&
    date <= lastMonth.endOf('month').toDate()
  ) {
    const monthIndex = moment(date).diff(_firstMonth, 'months');

    if (monthIndex >= 0 && monthIndex <= months.length) {
      return monthIndex;
    }
  }

  return null;
}
