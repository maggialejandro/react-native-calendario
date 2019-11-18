/* @flow */
import type { LocaleType } from '../types';

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

function leapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function getNumberOfDaysInMonth(
  monthIndex: number,
  year: number
): number {
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
    default:
      return 30;
  }
}

export function getMonthNames(locale: LocaleType): string[] {
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
    case 'br':
      return [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
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

function getWeekdayNames(locale: LocaleType): string[] {
  switch (locale) {
    case 'es':
      return ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sab'];
    case 'en':
      return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    case 'fr':
      return ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    case 'br':
      return ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
    default:
      return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  }
}

export function getDayNames(
  locale: LocaleType,
  firstDayMonday: boolean
): string[] {
  const days: string[] = getWeekdayNames(locale);
  if (firstDayMonday) {
    const sunday = days.shift();
    days.push(sunday);
    return days;
  }

  return days;
}
