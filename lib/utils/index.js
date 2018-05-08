// flow
/* eslint-disable import/prefer-default-export, prefer-template */
import moment from 'moment';
import type { MonthNumberType, MonthType, DayType, LocaleType } from '../types';

const MONDAY_FIRST = [6, 0, 1, 2, 3, 4, 5];

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function isValidDate(date: Date): boolean {
  // eslint-disable-next-line
  return Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date.getTime());
}

export function markSelectedDays(
  currentMonth: Date,
  days: Array<DayType>,
  startDate: Date,
  endDate?: Date,
): Array<DayType> {
  return days.map((day: DayType): DayType => {
    const { date } = day;
    const isChosenDate = date.getTime() === startDate.getTime();

    if (!endDate) {
      return {
        ...day,
        isEndDate: isChosenDate,
        isStartDate: isChosenDate,
        isActive: day.isMonthDate && isChosenDate,
      };
    }

    return {
      ...day,
      isStartDate: day.isMonthDate && isChosenDate,
      isEndDate: day.isMonthDate && date.getTime() === endDate.getTime(),
      isActive: (day.isMonthDate && date >= startDate && date <= endDate)
        || (!day.isMonthDate && date > startDate
          && date.getMonth() === currentMonth.getMonth() + 1
          && date.getMonth() <= endDate.getMonth()
          && date.getFullYear() <= endDate.getFullYear())
        || (!day.isMonthDate && date < endDate
            && date.getMonth() + 1 === currentMonth.getMonth()
            && date.getMonth() >= startDate.getMonth()
            && date.getFullYear() >= startDate.getFullYear()
        ),
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
): Array<DayType> {
  const startDayOfMonth = moment([year, monthNumber]);
  const daysToAdd = getNumberOfDaysInMonth(monthNumber);

  const days:Array<DayType> = [];

  const startWeekOffset = MONDAY_FIRST[startDayOfMonth.day()];
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

    if (endDate && startDate) {
      isStartDate = isMonthDate && date.getTime() === startDate.getTime();
      isEndDate = isMonthDate && date.getTime() === endDate.getTime();
      isActive = (date >= startDate && date <= endDate)
        || (date > startDate
          && date.getMonth() === firstMonthDay.getMonth() + 1
          && date.getMonth() <= endDate.getMonth()
          && date.getFullYear() <= endDate.getFullYear())
        || (date < endDate
            && date.getMonth() + 1 === firstMonthDay.getMonth()
            && date.getMonth() >= startDate.getMonth()
            && date.getFullYear() >= startDate.getFullYear()
        );
    } else if (startDate && date.getTime() === startDate.getTime()) {
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
): Array<MonthType> {
  const months: Array<MonthType> = [];
  const MONTH_STRINGS = monthsStrings.length ? monthsStrings : getMonthNames(locale);

  let year: number = startingMonth.getFullYear();
  let monthNumber = startingMonth.getMonth();
  const currentMonth = moment(startingMonth).startOf('month');
  let count = 0;
  let isVisible = (
    endDate && startDate
    && currentMonth.toDate() >= startDate
    && currentMonth.endOf('month').toDate() <= endDate
  ) || (startDate
      && currentMonth.month() === startDate.getMonth()
      && currentMonth.year() === startDate.getFullYear());

  count += isVisible ? 1 : 0;

  months.push({
    id: `${year}-${monthNumber}`,
    monthNumber,
    year,
    name: MONTH_STRINGS[monthNumber] + ' ' + year,
    days: getDaysOfMonth(monthNumber, year, startDate, endDate, minDate, maxDate),
    startDate,
    endDate,
    isVisible,
  });

  for (let monthCount = 0; monthCount < monthsLength; monthCount++) {
    if (monthNumber < 11) {
      monthNumber += 1;
    } else {
      monthNumber = 1;
      year++;
    }

    isVisible = false;

    if (count < visibleMonthsCount) {
      const current = moment([year, monthNumber]).startOf('month');
      isVisible = (
        endDate && startDate
        && current.toDate() >= startDate
        && current.toDate() <= endDate
      ) || (startDate
          && current.month() === startDate.getMonth()
          && current.year() === startDate.getFullYear());

      count += isVisible ? 1 : 0;
    }

    months.push({
      id: `${year}-${monthNumber}`,
      monthNumber,
      year,
      name: MONTH_STRINGS[monthNumber] + ' ' + year,
      days: getDaysOfMonth(monthNumber, year, startDate, endDate, minDate, maxDate),
      startDate,
      endDate,
      isVisible,
    });
  }

  return months;
}

function leapYear(year: number): boolean {
  return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
}

// eslint-disable-next-line
function getNumberOfDaysInMonth(monthIndex: MonthNumberType, year: number): number {
  // eslint-disable-next-line
  switch (monthIndex) {
    case 0:
      return 31;
    case 1:
      return leapYear(year) ? 29 : 28;
    case 2:
      return 31;
    case 3:
      return 30;
    case 4:
      return 31;
    case 5:
      return 30;
    case 6:
      return 31;
    case 7:
      return 31;
    case 8:
      return 30;
    case 9:
      return 31;
    case 10:
      return 30;
    case 11:
      return 31;
  }
}


function getMonthNames(locale: LocaleType): Array<string> {
  switch (locale) {
    case 'es':
      return [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
      ];
    case 'en':
      return [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
    case 'fr':
      return [
        'Janvier',
        'Février',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juillet',
        'Août',
        'Septembre',
        'Octobre',
        'Novembre',
        'Décembre',
      ];
    default:
      return [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
  }
}

export function getDayNames(locale: LocaleType): Array<string> {
  switch (locale) {
    case 'es':
      return ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sab', 'Dom'];
    case 'en':
      return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    case 'fr':
      return ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
    default:
      return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  }
}
