import { useMemo } from 'react';
import moment from 'moment';

import { DATE_FORMAT, isValidDate } from '../utils/date';
import { CalendarProps } from '../types';
import { DateString } from 'react-native-month/lib/typescript/src/types';

interface Input extends Pick<CalendarProps, 'numberOfMonths'> {
  startingMonth: DateString;
}

interface Result {
  firstMonth: DateString;
  months: any[];
}

export default function useMonths({
  startingMonth,
  numberOfMonths,
}: Input): Result {
  return useMemo(() => {
    let firstMonth = startingMonth;
    if (!isValidDate(startingMonth)) {
      firstMonth = moment().startOf('month').format(DATE_FORMAT);
    }

    return {
      firstMonth,
      months: new Array(numberOfMonths),
    };
  }, [numberOfMonths, startingMonth]);
}
