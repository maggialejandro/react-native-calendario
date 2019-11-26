/* @flow */
import moment from 'moment';
import { addDays, getNumberOfDaysInMonth } from '../../utils/date';
import type { DayType } from '../../types';

const MONDAY_FIRST = [6, 0, 1, 2, 3, 4, 5];

function dayShouldBeActive(
  date: Date,
  startDate: Date,
  endDate: Date,
  firstDayOfMonth: Date,
  lastDayOfMonth: Date
): boolean {
  if (date > lastDayOfMonth) {
    return endDate > lastDayOfMonth && startDate < lastDayOfMonth;
  }

  return startDate < firstDayOfMonth && endDate >= firstDayOfMonth;
}

export function getDaysOfMonth(
  monthNumber: number,
  year: number,
  startDate: ?Date,
  endDate: ?Date,
  minDate?: ?Date,
  maxDate?: ?Date,
  disableRange: boolean,
  firstDayMonday: boolean,
  disabledDays: { [key: string]: any } = {},
  indexList: number,
  disableOffsetDays: boolean
): DayType[] {
  const startDayOfMonth = moment([year, monthNumber]);
  const daysToAdd = getNumberOfDaysInMonth(monthNumber, year);

  const days: DayType[] = [];

  const startWeekOffset = firstDayMonday
    ? MONDAY_FIRST[startDayOfMonth.day()]
    : startDayOfMonth.day();

  const firstMonthDay = startDayOfMonth.toDate();
  const daysToCompleteRows = (startWeekOffset + daysToAdd) % 7;
  const lastRowNextMonthDays = daysToCompleteRows ? 7 - daysToCompleteRows : 0;

  for (let i = -startWeekOffset; i < daysToAdd + lastRowNextMonthDays; i++) {
    const date: Date = addDays(firstMonthDay, i);
    const day: number = date.getDate();
    const month: number = date.getMonth();
    const fullDay: string = day < 10 ? `0${day}` : String(day);
    const fullMonth: string = month < 10 ? `0${month}` : String(month);
    const id: string = `${date.getFullYear()}-${fullMonth}-${fullDay}`;

    let isOnSelectedRange = !minDate && !maxDate;

    isOnSelectedRange =
      (!minDate || (minDate && date >= minDate)) &&
      (!maxDate || (maxDate && date <= maxDate));

    const isOutOfRange = !!(
      (minDate && date < minDate) ||
      (maxDate && date > maxDate)
    );
    const isMonthDate = i >= 0 && i < daysToAdd;
    let isStartDate = false;
    let isEndDate = false;
    let isActive = false;

    if (disableOffsetDays && (i < 0 || i >= daysToAdd)) {
      days.push({
        id: `${monthNumber}-${id}`,
        date,
        isToday: false,
        isMonthDate,
        isActive,
        isStartDate,
        isEndDate,
        isOutOfRange,
        isVisible: false,
        shouldRender: indexList === 0,
      });
    } else {
      if (endDate && startDate && !disableRange) {
        isStartDate = isMonthDate && date.getTime() === startDate.getTime();
        isEndDate = isMonthDate && date.getTime() === endDate.getTime();

        if (!isMonthDate) {
          const lastDayOfMonth = moment(firstMonthDay)
            .endOf('month')
            .toDate();
          const firstDayOfMonth = moment(firstMonthDay)
            .startOf('month')
            .toDate();

          isActive = dayShouldBeActive(
            date,
            startDate,
            endDate,
            firstDayOfMonth,
            lastDayOfMonth
          );
        } else {
          isActive = date >= startDate && date <= endDate;
        }
      } else if (
        isMonthDate &&
        startDate &&
        date.getTime() === startDate.getTime()
      ) {
        isStartDate = true;
        isEndDate = true;
        isActive = true;
      }

      const today = moment().format('YYYY-MM-DD');
      const isToday = moment(date).format('YYYY-MM-DD') === today;

      days.push({
        id: `${monthNumber}-${id}`,
        date,
        isToday,
        isMonthDate,
        isActive,
        isStartDate,
        isEndDate,
        isOutOfRange,
        isVisible:
          isOnSelectedRange &&
          isMonthDate &&
          !disabledDays[moment(date).format('YYYY-MM-DD')],
        shouldRender: true,
      });
    }
  }

  return days;
}
