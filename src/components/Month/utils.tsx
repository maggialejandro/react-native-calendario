import moment, { Moment } from 'moment';
import { DateString } from 'react-native-month/lib/typescript/src/types';

export function monthBetweenRange(month: Moment, start: Date, end: Date) {
  const firstDayOfMonth = month.startOf('month').toDate();
  const lastDayOfMonth = month.endOf('month').toDate();

  return (
    (firstDayOfMonth <= end && firstDayOfMonth >= start) ||
    (lastDayOfMonth >= start && lastDayOfMonth <= end) ||
    (start <= lastDayOfMonth && end >= firstDayOfMonth)
  );
}

export function shouldRenderMonth(
  currentMonth: Moment,
  pervMinMax?: DateString,
  nextMinMax?: DateString
) {
  if (pervMinMax !== nextMinMax) {
    if (pervMinMax) {
      if (nextMinMax) {
        if (
          moment(pervMinMax).isSame(currentMonth, 'month') ||
          moment(nextMinMax).isSame(currentMonth, 'month')
        ) {
          return true;
        }

        const monthBetweenMinRange =
          pervMinMax < nextMinMax
            ? monthBetweenRange(
                currentMonth,
                moment(pervMinMax).toDate(),
                moment(nextMinMax).toDate()
              )
            : monthBetweenRange(
                currentMonth,
                moment(nextMinMax).toDate(),
                moment(pervMinMax).toDate()
              );

        if (monthBetweenMinRange) {
          return true;
        }
      } else if (moment(pervMinMax).isSame(currentMonth, 'month')) {
        return true;
      }
    } else if (moment(nextMinMax).isSame(currentMonth, 'month')) {
      return true;
    }
  }

  return false;
}
