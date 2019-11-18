/* @flow */
import moment from 'moment';
import { getMonthNames } from './date';
import type { ViewableItemsType, LocaleType, MonthType } from '../types';

export function getMonthsList(
  startingMonth: Date,
  monthsLength: number,
  visibleMonthsCount: number,
  startDate?: ?Date,
  locale: LocaleType,
  monthsStrings: string[]
): MonthType[] {
  const months: MonthType[] = [];
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
  info: ViewableItemsType
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
