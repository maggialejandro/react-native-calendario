// @flow
/* eslint-disable import/prefer-default-export, no-restricted-globals */
import type { MonthNumberType, LocaleType } from '../types';

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function isValidDate(date: Date): boolean {
  // eslint-disable-next-line
  return (
    Object.prototype.toString.call(date) === '[object Date]' &&
    !isNaN(date.getTime())
  );
}

function leapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

// eslint-disable-next-line
export function getNumberOfDaysInMonth(
  monthIndex: MonthNumberType,
  year: number,
): number {
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

export function getMonthNames(locale: LocaleType,monthNameLongevity:String="short"): Array<string> {
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
      return Array.apply(null, {length: 12}).map((x, i) => {
        return new Date((i + 1).toString()).toLocaleDateString(locale, {
          month: monthNameLongevity,
        })
      });
  }
}

function getWeekdayNames(locale: LocaleType,weekNameLongevity:String="short"): Array<string> {
  switch (locale) {
    case 'es':
      return ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sab'];
    case 'en':
      return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    case 'fr':
      return ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    default:
      return Array.apply(null, {length: 7}).map((x, i) => {

        return new Date(("1970/01/0"+(i+5)).toString()).toLocaleDateString(locale, {
          weekday: weekNameLongevity,
        })
      });
  }
}

export function getDayNames(
  locale: LocaleType,
  firstDayMonday: boolean,
): Array<string> {
  const days: Array<string> = getWeekdayNames(locale);
  if (firstDayMonday) {
    const sunday = days.shift();
    days.push(sunday);
    return days;
  }

  return days;
}
