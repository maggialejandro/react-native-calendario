import { useMemo } from 'react';
import moment from 'moment';

import { isValidDate } from '../utils/date';
import { CalendarProps } from '../types';

interface Input
  extends Pick<CalendarProps, 'startingMonth' | 'numberOfMonths'> {}

interface Result {
  firstMonth: Date;
  months: any[];
}

export default function useMonths({
  startingMonth,
  numberOfMonths,
}: Input): Result {
  return useMemo(() => {
    const firstMonth =
      startingMonth && isValidDate(new Date(startingMonth))
        ? moment(startingMonth, 'YYYY-MM-DD').toDate()
        : new Date();

    return {
      firstMonth,
      months: new Array(numberOfMonths),
    };
  }, [numberOfMonths, startingMonth]);
}
