// flow
/* eslint-disable import/prefer-default-export, prefer-template */
import moment from 'moment';
import { addDays, getMonthNames, getNumberOfDaysInMonth } from './date';
import type { MonthType, DayType, LocaleType } from '../types';

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

export function markSelectedDays(
  currentMonth: Date,
  days: Array<DayType>,
  startDate?: Date,
  endDate?: Date,
  disableRange: boolean,
): Array<DayType> {
  return days.map((day: DayType): DayType => {
    const { date } = day;
    const isChosenDate = startDate && date.getTime() === startDate.getTime();

    if (!endDate || disableRange) {
      return {
        ...day,
        isEndDate: isChosenDate,
        isStartDate: isChosenDate,
        isActive: day.isMonthDate && isChosenDate,
      };
    }

    let isActive = false;

    if (!day.isMonthDate) {
      const lastDayOfMonth = moment(currentMonth).endOf('month').toDate();
      const firstDayOfMonth = moment(currentMonth).startOf('month').toDate();

      isActive = startDate && dayShouldBeActive(
        date,
        startDate,
        endDate,
        firstDayOfMonth,
        lastDayOfMonth,
      );
    } else {
      isActive = startDate && date >= startDate && date <= endDate;
    }

    return {
      ...day,
      isStartDate: day.isMonthDate && isChosenDate,
      isEndDate: day.isMonthDate && date.getTime() === endDate.getTime(),
      isActive,
    };
  });
}

function getDaysOfMonth(
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
  const daysToAdd = getNumberOfDaysInMonth(monthNumber);

  const days:Array<DayType> = [];

  const startWeekOffset = firstDayMonday ?
    MONDAY_FIRST[startDayOfMonth.day()] : startDayOfMonth.day();
  const firstMonthDay = startDayOfMonth.toDate();
  const daysToCompleteRows = (startWeekOffset + daysToAdd) % 7;
  const endMonthDays = daysToCompleteRows ? 7 - daysToCompleteRows : 0;

  for (let i = -startWeekOffset; i < daysToAdd + endMonthDays; i++) {
    const date: Date = addDays(firstMonthDay, i);
    const day: number = date.getDate();
    const month: number = date.getMonth();
    const fullDay: string = day < 10 ? '0' + day : day;
    const fullMonth: string = month < 10 ? '0' + month : month;
    const id: string = date.getFullYear() + '-' + fullMonth + '-' + fullDay;

    let isOnSelectedRange = !minDate && !maxDate;

    isOnSelectedRange = (!minDate || (minDate && date >= minDate))
      && (!maxDate || (maxDate && date <= maxDate));

    const isMonthDate = (i >= 0 && i < daysToAdd);
    let isStartDate = false;
    let isEndDate = false;
    let isActive = false;

    if (endDate && startDate && !disableRange) {
      isStartDate = isMonthDate && date.getTime() === startDate.getTime();
      isEndDate = isMonthDate && date.getTime() === endDate.getTime();

      if (!isMonthDate) {
        const lastDayOfMonth = moment(firstMonthDay).endOf('month').toDate();
        const firstDayOfMonth = moment(firstMonthDay).startOf('month').toDate();

        isActive = dayShouldBeActive(
          date,
          startDate,
          endDate,
          firstDayOfMonth,
          lastDayOfMonth,
        );
      } else {
        isActive = (date >= startDate && date <= endDate);
      }
    } else if (isMonthDate && startDate && date.getTime() === startDate.getTime()) {
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
  endDate?: Date,
  minDate?: Date,
  maxDate?: Date,
  locale: LocaleType,
  monthsStrings: Array<string>,
  disableRange: boolean,
  firstDayMonday: boolean,
): Array<MonthType> {
  const months: Array<MonthType> = [];
  const MONTH_STRINGS = monthsStrings.length ? monthsStrings : getMonthNames(locale);

  let year: number = startingMonth.getFullYear();
  let monthNumber = startingMonth.getMonth();
  let count = 0;

  for (let monthCount = 0; monthCount < monthsLength; monthCount++) {
    let isVisible = false;

    if (count < visibleMonthsCount) {
      const current = moment([year, monthNumber]).startOf('month');
      isVisible = (startDate && current.toDate() >= moment(startDate).startOf('month').toDate())
        || !startDate;

      count += isVisible ? 1 : 0;
    }

    months.push({
      id: `${year}-${monthNumber}`,
      monthNumber,
      year,
      name: MONTH_STRINGS[monthNumber] + ' ' + year,
      days: getDaysOfMonth(
        monthNumber,
        year,
        startDate,
        endDate,
        minDate,
        maxDate,
        disableRange,
        firstDayMonday,
      ),
      startDate,
      endDate,
      isVisible,
    });

    if (monthNumber < 11) {
      monthNumber += 1;
    } else {
      monthNumber = 0;
      year++;
    }
  }

  return months;
}
