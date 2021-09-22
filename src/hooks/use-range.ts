import { useMemo } from 'react';
import moment from 'moment';

import { isValidDate } from '../utils/date';
import { CalendarProps } from '../types';

interface Input
  extends Pick<CalendarProps, 'startDate' | 'endDate' | 'numberOfMonths'> {
  firstMonthToRender: Date;
}

interface Result {
  start?: Date;
  end?: Date;
}

export default function useRange({
  startDate,
  endDate,
  numberOfMonths,
  firstMonthToRender,
}: Input): Result {
  return useMemo(() => {
    let start: Date | undefined;
    const lastMonth = moment(firstMonthToRender)
      .add(numberOfMonths, 'months')
      .toDate();

    if (startDate && isValidDate(new Date(startDate))) {
      start = moment(startDate, 'YYYY-MM-DD').toDate();

      if (start > lastMonth) {
        start = undefined;
      }
    }

    let end =
      endDate && isValidDate(new Date(endDate)) && endDate <= lastMonth
        ? moment(endDate, 'YYYY-MM-DD').toDate()
        : undefined;

    return {
      start,
      end,
    };
  }, [endDate, firstMonthToRender, numberOfMonths, startDate]);
}
