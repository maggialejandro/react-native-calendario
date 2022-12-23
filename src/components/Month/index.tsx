import React, { useCallback, useMemo } from 'react';
import { View, Text, LayoutChangeEvent } from 'react-native';
import { getMonthNames, Month, MonthProps } from 'react-native-month';
import moment from 'moment';
import { isValidDate, isSameDate } from '../../utils/date';
import { shouldRenderMonth, isMonthDrawn } from './utils';
import styles from './styles';
import { ThemeType } from '../../types';

interface EmptyMonthProps {
  height: number;
  name: string;
  theme: ThemeType;
}

const SHOULD_NOT_UPDATE = true;

const EmptyMonth = React.memo<EmptyMonthProps>(
  (props: EmptyMonthProps) => {
    const content = useMemo(
      () => ({
        height: props.height,
        justifyContent: 'center' as const,
        alignItems: 'center' as const,
      }),
      [props.height]
    );
    return (
      <View style={[content, props.theme.emptyMonthContainerStyle]}>
        <Text
          style={[styles.emptyMonthText, props.theme.emptyMonthTextStyle]}
          allowFontScaling={false}
        >
          {props.name}
        </Text>
      </View>
    );
  },
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
      style={[styles.monthTitleText, props.theme.monthTitleTextStyle]}
    >
      {props.name}
    </Text>
  ),
  () => SHOULD_NOT_UPDATE
);

interface Props extends MonthProps {
  onMonthLayout: (weeks: number, e: LayoutChangeEvent) => void;
  calculateMonthHeightDynamically?: boolean;
  monthNames?: string[];
  firstMonthToRender: Date;
  firstViewableIndex: number;
  lastViewableIndex: number;
  viewableRangeOffset: number;
  renderAllMonths?: boolean;
  showMonthTitle: boolean;
  firstDayMonday: boolean;
  height: number;
  index: number;
}

export default React.memo<Props>(
  (props: Props) => {
    const {
      month,
      year,
      minDate,
      maxDate,
      firstDayMonday,
      showMonthTitle,
      renderAllMonths,
      calculateMonthHeightDynamically,
      onMonthLayout,
      monthNames,
      theme = {},
      height,
      locale = 'en',
      index,
    } = props;

    const MONTH_NAMES =
      Array.isArray(monthNames) && monthNames.length === 12
        ? monthNames
        : getMonthNames(locale);
    const monthName = `${MONTH_NAMES[month]} ${year}`;

    const isEmptyMonth =
      !renderAllMonths &&
      !calculateMonthHeightDynamically &&
      (index < props.firstViewableIndex - props.viewableRangeOffset ||
        index > props.lastViewableIndex);

    const handleOnLayout = useCallback(
      (e: LayoutChangeEvent) => {
        if (calculateMonthHeightDynamically) {
          onMonthLayout(index, e);
        }
      },
      [calculateMonthHeightDynamically, index, onMonthLayout]
    );

    const monthStyle = useMemo(
      () => (calculateMonthHeightDynamically ? {} : { height }),
      [calculateMonthHeightDynamically, height]
    );

    if (isEmptyMonth) {
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
      <View style={monthStyle} onLayout={handleOnLayout}>
        {showMonthTitle && <MonthTitle name={monthName} theme={theme} />}
        <View>
          <Month
            month={month}
            year={year}
            disabledDays={props.disabledDays}
            disableOffsetDays={props.disableOffsetDays}
            disableRange={props.disableRange}
            startDate={props.startDate}
            endDate={props.endDate}
            firstDayMonday={firstDayMonday}
            locale={props.locale}
            markedDays={props.markedDays}
            maxDate={max}
            minDate={min}
            onPress={props.onPress}
            renderDayContent={props.renderDayContent}
            showWeekdays={props.showWeekdays}
            theme={props.theme}
            dayNames={props.dayNames}
          />
        </View>
      </View>
    );
  },
  (prevProps: Props, nextProps: Props) => {
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
