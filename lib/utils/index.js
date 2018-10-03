// @flow
/* eslint-disable import/prefer-default-export */
import moment from 'moment';
import { addDays, getMonthNames, getNumberOfDaysInMonth } from './date';
import type {
  ViewableItemsType,
  LocaleType,
  MonthType,
  DayType,
} from '../types';

const MONDAY_FIRST = [6, 0, 1, 2, 3, 4, 5];

function dayShouldBeActive(
  date: Date,
  startDate: Date,
  endDate: Date,
  firstDayOfMonth: Date,
  lastDayOfMonth: Date,
): boolean {
  if (date > lastDayOfMonth) {
    return endDate > lastDayOfMonth && startDate < lastDayOfMonth;
  }

  return startDate < firstDayOfMonth && endDate >= firstDayOfMonth;
}

export function getDaysOfMonth(
  monthNumber: number,
  year: number,
  startDate?: Date,
  endDate?: Date,
  minDate?: Date,
  maxDate?: Date,
  disableRange: boolean,
  firstDayMonday: boolean,
): Array<DayType> {
  const startDayOfMonth = moment([year, monthNumber]);
  const daysToAdd = getNumberOfDaysInMonth(monthNumber, year);

  const days: Array<DayType> = [];

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
    const fullDay: string = day < 10 ? `0${day}` : day;
    const fullMonth: string = month < 10 ? `0${month}` : month;
    const id: string = `${date.getFullYear()}-${fullMonth}-${fullDay}`;

    let isOnSelectedRange = !minDate && !maxDate;

    isOnSelectedRange =
      (!minDate || (minDate && date >= minDate)) &&
      (!maxDate || (maxDate && date <= maxDate));

    const isMonthDate = i >= 0 && i < daysToAdd;
    let isStartDate = false;
    let isEndDate = false;
    let isActive = false;

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
          lastDayOfMonth,
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

    days.push({
      id: `${monthNumber}-${id}`,
      date,
      isMonthDate,
      isActive,
      isStartDate,
      isEndDate,
      isVisible: isOnSelectedRange && isMonthDate,
    });
  }

  return days;
}

export function getMonthsList(
  startingMonth: Date,
  monthsLength: number,
  visibleMonthsCount: number,
  startDate?: Date,
  locale: LocaleType,
  monthsStrings: Array<string>,
): Array<MonthType> {
  const months: Array<MonthType> = [];
  const MONTH_STRINGS = monthsStrings.length
    ? monthsStrings
    : getMonthNames(locale);

  let year: number = startingMonth.getFullYear();
  let monthNumber = startingMonth.getMonth();
  let count = 0;

  for (let monthCount = 0; monthCount < monthsLength; monthCount++) {
    let isVisible = false;

    if (count < visibleMonthsCount) {
      const current = moment([year, monthNumber]).startOf('month');
      isVisible =
        (startDate &&
          current.toDate() >=
            moment(startDate)
              .startOf('month')
              .toDate()) ||
        !startDate;

      count += isVisible ? 1 : 0;
    }

    months.push({
      id: `${year}-${monthNumber}`,
      monthNumber,
      year,
      name: `${MONTH_STRINGS[monthNumber]} ${year}`,
      isVisible,
    });

    year += monthNumber < 11 ? 0 : 1;
    monthNumber = monthNumber < 11 ? monthNumber + 1 : 0;
  }

  return months;
}

export function viewableItemsChanged(
  first: number,
  last: number,
  info: ViewableItemsType,
): boolean {
  try {
    const firstItemVisible = info.viewableItems[0];
    const lastVisibleItem = info.viewableItems[info.viewableItems.length - 1];
    const firstViewableIndex = firstItemVisible.index || 0;
    const lastViewableIndex = lastVisibleItem.index || last;

    return firstViewableIndex !== first || lastViewableIndex !== last;
  } catch (e) {
    return false;
  }
}
