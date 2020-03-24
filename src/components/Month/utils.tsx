import moment, { Moment } from 'moment';

export function monthBetweenRange(month: Moment, start: Date, end: Date) {
  const firstDayOfMonth = month.startOf('month').toDate();
  const lastDayOfMonth = month.endOf('month').toDate();

  return (
    (firstDayOfMonth <= end && firstDayOfMonth >= start) ||
    (lastDayOfMonth >= start && lastDayOfMonth <= end) ||
    (start <= lastDayOfMonth && end >= firstDayOfMonth)
  );
}

export function isMonthDrawn(
  year: number,
  month: number,
  start?: Date,
  end?: Date
) {
  if (start instanceof Date) {
    start.setHours(0, 0, 0, 0);
    if (end instanceof Date) {
      end.setHours(0, 0, 0, 0);
      const firstMonthDay = new Date(year, month, 0, 0, 0, 0, 0);
      const lastMonthDay = new Date(year, month + 1, 0);

      return (
        (firstMonthDay <= end && firstMonthDay >= start) ||
        (lastMonthDay >= start && lastMonthDay <= end) ||
        (start <= lastMonthDay && end >= firstMonthDay)
      );
    }

    return start.getFullYear() === year && start.getMonth() === month;
  }

  return false;
}

export function shouldRenderMonth(
  currentMonth: Moment,
  pervMinMax?: Date,
  nextMinMax?: Date
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
