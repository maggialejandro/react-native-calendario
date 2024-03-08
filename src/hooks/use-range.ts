import { useMemo } from 'react';
import moment from 'moment';

import { DATE_FORMAT, isValidDate } from '../utils/date';
import { CalendarProps } from '../types';
import { DateString } from 'react-native-month/lib/typescript/src/types';

interface Input
  extends Pick<CalendarProps, 'startDate' | 'endDate' | 'numberOfMonths'> {
  firstMonthToRender: DateString;
}

interface Result {
  start?: DateString;
  end?: DateString;
}

export default function useRange({
  startDate,
  endDate,
  numberOfMonths,
  firstMonthToRender,
}: Input): Result {
  return useMemo(() => {
    let start = startDate;
    let end = endDate;

    const lastMonth = moment(firstMonthToRender)
      .add(numberOfMonths, 'months')
      .format(DATE_FORMAT);

    if (startDate) {
      if (isValidDate(startDate)) {
        if (startDate > lastMonth) {
          start = undefined;
        }
      } else {
        start = undefined;
        console.error(
          'Invalid startDate format, should be a string YYYY-MM-DD'
        );
      }
    }

    if (endDate) {
      if (isValidDate(endDate)) {
        if (!start || endDate < start) {
          end = undefined;
        }
      } else {
        end = undefined;
        console.error('Invalid endDate format, should be a string YYYY-MM-DD');
      }
    }

    return {
      start,
      end,
    };
  }, [endDate, firstMonthToRender, numberOfMonths, startDate]);
}
