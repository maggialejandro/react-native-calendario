import moment from 'moment';

import { LocaleType } from '../types';

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

export function getMonthNames(locale?: LocaleType): string[] {
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
    case 'zh':
      return [
        '一月',
        '二月',
        '三月',
        '四月',
        '五月',
        '六月',
        '七月',
        '八月',
        '九月',
        '十月',
        '十一月',
        '十二月',
      ];
    case 'it':
      return [
        'Gennaio',
        'Febbraio',
        'Marzo',
        'Aprile',
        'Maggio',
        'Giugno',
        'Luglio',
        'Agosto',
        'Settembre',
        'Ottobre',
        'Novembre',
        'Dicembre',
       ];
    case 'de':
      return [
        'Januar',
        'Februar',
        'Marsch',
        'April',
        'Kann',
        'Juni',
        'Juli',
        'August',
        'September',
        'Oktober',
        'November',
        'Dezember',
      ];
    case 'nl':
      return [
        'Januari',
        'Februari',
        'Maart',
        'April',
        'Kunnen',
        'Juni',
        'Juli',
        'Augustus',
        'September',
        'Oktober',
        'november',
        'December',
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
