import moment from 'moment';
import { addDays, getNumberOfDaysInMonth } from '../../utils/date';

const MONDAY_FIRST = [6, 0, 1, 2, 3, 4, 5];

function dayShouldBeActive(
  date,
  startDate,
  endDate,
  firstDayOfMonth,
  lastDayOfMonth
) {
  if (date > lastDayOfMonth) {
    return endDate > lastDayOfMonth && startDate < lastDayOfMonth;
  }

  return startDate < firstDayOfMonth && endDate >= firstDayOfMonth;
}

export function getDaysOfMonth(
  monthNumber,
  year,
  firstDayMonday,
  disableRange,
  disabledDays,
  startDate,
  endDate,
  minDate,
  maxDate,
  disableOffsetDays
) {
  const startDayOfMonth = moment([year, monthNumber]);
  const daysToAdd = getNumberOfDaysInMonth(monthNumber, year);

  const days = [];

  const startWeekOffset = firstDayMonday
    ? MONDAY_FIRST[startDayOfMonth.day()]
    : startDayOfMonth.day();

  const firstMonthDay = startDayOfMonth.toDate();
  const daysToCompleteRows = (startWeekOffset + daysToAdd) % 7;
  const lastRowNextMonthDays = daysToCompleteRows ? 7 - daysToCompleteRows : 0;

  for (let i = -startWeekOffset; i < daysToAdd + lastRowNextMonthDays; i++) {
    const date = addDays(firstMonthDay, i);
    const day = date.getDate();
    const month = date.getMonth();
    const fullDay = day < 10 ? `0${day}` : String(day);
    const fullMonth = month < 10 ? `0${month}` : String(month);
    const id = `${date.getFullYear()}-${fullMonth}-${fullDay}`;

    let isOnSelectedRange = !minDate && !maxDate;

    isOnSelectedRange =
      (!minDate || (minDate && date >= minDate)) &&
      (!maxDate || (maxDate && date <= maxDate));

    const isOutOfRange = !!(
      (minDate && date < minDate) ||
      (maxDate && date > maxDate)
    );
    const isMonthDate = i >= 0 && i < daysToAdd;
    let isStartDate = false;
    let isEndDate = false;
    let isActive = false;

    if (disableOffsetDays && (i < 0 || i >= daysToAdd)) {
      days.push({
        id: `${monthNumber}-${id}`,
        date,
        isToday: false,
        isMonthDate,
        isActive,
        isStartDate,
        isEndDate,
        isOutOfRange,
        isVisible: false,
        isHidden: true,
      });
    } else {
      if (endDate && startDate && !disableRange) {
        isStartDate = isMonthDate && date.getTime() === startDate.getTime();
        isEndDate = isMonthDate && date.getTime() === endDate.getTime();

        if (!isMonthDate) {
          const lastDayOfMonth = moment(firstMonthDay)
            .endOf('month')
            .toDate();
          const firstDayOfMonth = moment(firstMonthDay)
            .startOf('month')
            .toDate();

          isActive = dayShouldBeActive(
            date,
            startDate,
            endDate,
            firstDayOfMonth,
            lastDayOfMonth
          );
        } else {
          isActive = date >= startDate && date <= endDate;
        }
      } else if (
        isMonthDate &&
        startDate &&
        date.getTime() === startDate.getTime()
      ) {
        isStartDate = true;
        isEndDate = true;
        isActive = true;
      }

      const today = moment().format('YYYY-MM-DD');
      const isToday = moment(date).format('YYYY-MM-DD') === today;

      days.push({
        id: `${monthNumber}-${id}`,
        date,
        isToday,
        isMonthDate,
        isActive,
        isStartDate,
        isEndDate,
        isOutOfRange,
        isVisible:
          isOnSelectedRange &&
          isMonthDate &&
          (!disabledDays || disabledDays[moment(date).format('YYYY-MM-DD')]),
        isHidden: false,
      });
    }
  }

  return days;
}
