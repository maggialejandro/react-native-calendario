import React from 'react';
import { View, Text } from 'react-native';
import { Month, MonthProps } from 'react-native-month';
import moment from 'moment';
import { isValidDate, getMonthNames, isSameDate } from '../../utils/date';
import { shouldRenderMonth, isMonthDrawn } from './utils';
import { ThemeType } from '../../types';

interface EmptyMonthProps {
  height: number;
  name: string;
  theme: ThemeType;
}

const SHOULD_NOT_UPDATE = true;

const EmptyMonth = React.memo<EmptyMonthProps>(
  (props: EmptyMonthProps) => (
    <View
      style={[
        {
          height: props.height,
          justifyContent: 'center',
          alignItems: 'center',
        },
        props.theme.emptyMonthContainerStyle,
      ]}
    >
      <Text
        style={[
          { fontSize: 25, fontWeight: '300' },
          props.theme.emptyMonthTextStyle,
        ]}
        allowFontScaling={false}
      >
        {props.name}
      </Text>
    </View>
  ),
  () => SHOULD_NOT_UPDATE
);

interface MonthTitleProps {
  name: string;
  theme: ThemeType;
}

const MonthTitle = React.memo<MonthTitleProps>(
  (props: MonthTitleProps) => (
    <Text
      allowFontScaling={false}
      style={[
        { textAlign: 'center', paddingVertical: 10 },
        props.theme.monthTitleTextStyle,
      ]}
    >
      {props.name}
    </Text>
  ),
  () => SHOULD_NOT_UPDATE
);

interface Props extends MonthProps {
  monthNames: string[];
  firstMonthToRender: Date;
  firstViewableIndex: number;
  lastViewableIndex: number;
  viewableRangeOffset: number;
  showMonthTitle: boolean;
  height: number;
  index: number;
  extraData: any;
}

export default React.memo<Props>(
  (props: Props) => {
    const {
      month,
      year,
      minDate,
      maxDate,
      showMonthTitle,
      monthNames,
      theme = {},
      height,
      locale,
      index,
    } = props;

    const MONTH_NAMES =
      Array.isArray(monthNames) && monthNames.length === 12
        ? monthNames
        : getMonthNames(locale);
    const monthName = `${MONTH_NAMES[month]} ${year}`;

    if (
      index < props.firstViewableIndex - props.viewableRangeOffset ||
      index > props.lastViewableIndex
    ) {
      return <EmptyMonth name={monthName} height={height} theme={theme} />;
    }

    const min =
      minDate && isValidDate(new Date(minDate))
        ? moment(minDate, 'YYYY-MM-DD').toDate()
        : undefined;
    const max =
      maxDate && isValidDate(new Date(maxDate))
        ? moment(maxDate, 'YYYY-MM-DD').toDate()
        : undefined;

    return (
      <View style={{ height }}>
        {showMonthTitle && <MonthTitle name={monthName} theme={theme} />}
        <Month
          month={month}
          year={year}
          disabledDays={props.disabledDays}
          disableOffsetDays={props.disableOffsetDays}
          disableRange={props.disableRange}
          startDate={props.startDate}
          endDate={props.endDate}
          firstDayMonday={props.firstDayMonday}
          locale={props.locale}
          maxDate={max}
          minDate={min}
          onPress={props.onPress}
          renderDayContent={props.renderDayContent}
          showWeekdays={props.showWeekdays}
          theme={props.theme}
          dayNames={props.dayNames}
        />
      </View>
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.disableRange !== nextProps.disableRange) {
      return false;
    }

    if (
      (prevProps.index <
        prevProps.firstViewableIndex - prevProps.viewableRangeOffset ||
        prevProps.index > prevProps.lastViewableIndex) &&
      nextProps.index >= nextProps.firstViewableIndex &&
      nextProps.index <= nextProps.lastViewableIndex
    ) {
      return false;
    }

    if (
      (!nextProps.dayNames || !nextProps.monthNames) &&
      prevProps.locale !== nextProps.locale
    ) {
      return false;
    }

    const currentMonth = moment(nextProps.firstMonthToRender).add(
      nextProps.index,
      'months'
    );

    if (prevProps.disableRange === nextProps.disableRange) {
      if (nextProps.disableRange) {
        if (prevProps.startDate !== nextProps.startDate) {
          if (
            !prevProps.startDate &&
            moment(nextProps.startDate).isSame(currentMonth, 'month')
          ) {
            return false;
          }

          if (
            prevProps.startDate &&
            (moment(prevProps.startDate).isSame(currentMonth, 'month') ||
              moment(nextProps.startDate).isSame(currentMonth, 'month'))
          ) {
            return false;
          }
        }
      } else {
        const startDateChanged =
          (prevProps.startDate instanceof Date &&
            nextProps.startDate instanceof Date &&
            !isSameDate(prevProps.startDate, nextProps.startDate)) ||
          prevProps.startDate !== nextProps.startDate;
        const endDateChanged =
          (prevProps.endDate instanceof Date &&
            nextProps.endDate instanceof Date &&
            !isSameDate(prevProps.endDate, nextProps.endDate)) ||
          prevProps.endDate !== nextProps.endDate;

        if (startDateChanged || endDateChanged) {
          if (
            isMonthDrawn(
              currentMonth.year(),
              currentMonth.month(),
              prevProps.startDate,
              prevProps.endDate
            ) !==
              isMonthDrawn(
                currentMonth.year(),
                currentMonth.month(),
                nextProps.startDate,
                nextProps.endDate
              ) ||
            (prevProps.startDate instanceof Date &&
              moment(prevProps.startDate).isSame(currentMonth, 'month') &&
              (startDateChanged || endDateChanged)) ||
            (nextProps.startDate instanceof Date &&
              moment(nextProps.startDate).isSame(currentMonth, 'month') &&
              startDateChanged) ||
            (prevProps.endDate instanceof Date &&
              moment(prevProps.endDate).isSame(currentMonth, 'month') &&
              endDateChanged) ||
            (nextProps.endDate instanceof Date &&
              moment(nextProps.endDate).isSame(currentMonth, 'month') &&
              endDateChanged)
          ) {
            return false;
          }
        }
      }
    } else {
      return false;
    }

    if (
      shouldRenderMonth(currentMonth, prevProps.minDate, nextProps.minDate) ||
      shouldRenderMonth(currentMonth, prevProps.maxDate, nextProps.maxDate)
    ) {
      return false;
    }

    return true;
  }
);
