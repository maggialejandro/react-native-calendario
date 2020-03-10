import React, { ComponentType } from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';
import Day from '../Day';
import { getDayNames, isValidDate, getMonthNames } from '../../utils/date';
import { getMonthDays, monthBetweenRange, shouldRenderMonth } from './utils';
import { DayType, ThemeType, LocaleType } from '../../types';

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

interface WeekColumnProps {
  day: string;
  theme: ThemeType;
}

const WeekColumn = React.memo<WeekColumnProps>(
  (props: WeekColumnProps) => (
    <View
      style={[{ flex: 1, alignItems: 'center' }, props.theme.weekColumnStyle]}
    >
      <Text allowFontScaling={false} style={props.theme.weekColumnTextStyle}>
        {props.day}
      </Text>
    </View>
  ),
  () => SHOULD_NOT_UPDATE
);

interface WeelColumnsProps {
  days: string[];
  theme: ThemeType;
}

const WeekColumns = React.memo<WeelColumnsProps>(
  (props: WeelColumnsProps) => (
    <View
      style={[{ flexDirection: 'row' }, props.theme.weekColumnsContainerStyle]}
    >
      {props.days.map((day: string) => (
        <WeekColumn key={day} day={day} theme={props.theme} />
      ))}
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

interface Props {
  dayNames: string[];
  disabledDays?: { [key: string]: any };
  disableOffsetDays?: boolean;
  disableRange: boolean;
  endDate?: Date;
  extraData: any;
  firstDayMonday: boolean;
  firstMonthToRender: Date;
  firstViewableIndex: number;
  height: number;
  index: number;
  lastViewableIndex: number;
  locale: LocaleType;
  maxDate?: string;
  minDate?: string;
  monthNames: string[];
  onPress: (date: Date) => void;
  renderDayContent?: (day: DayType) => ComponentType;
  showMonthTitle: boolean;
  showWeekdays: boolean;
  startDate?: Date;
  theme: ThemeType;
  viewableRangeOffset: number;
}

const getDayList = (
  props: Props & { month: { monthNumber: number; year: number } }
) => {
  const {
    month: { monthNumber, year },
    startDate,
    endDate,
    firstDayMonday,
    minDate,
    maxDate,
    disableRange,
    disabledDays,
    disableOffsetDays,
  } = props;

  const min =
    minDate && isValidDate(new Date(minDate))
      ? moment(minDate, 'YYYY-MM-DD').toDate()
      : undefined;
  const max =
    maxDate && isValidDate(new Date(maxDate))
      ? moment(maxDate, 'YYYY-MM-DD').toDate()
      : undefined;

  return getMonthDays(
    monthNumber,
    year,
    firstDayMonday,
    disableRange,
    disabledDays,
    startDate,
    endDate,
    min,
    max,
    disableOffsetDays
  );
};

export default React.memo<Props>(
  (props: Props) => {
    const {
      showWeekdays,
      showMonthTitle,
      monthNames,
      firstMonthToRender,
      firstDayMonday,
      theme,
      dayNames,
      height,
      locale,
      index,
    } = props;

    const month = moment(firstMonthToRender).add(index, 'months');

    const MONTH_NAMES = monthNames.length ? monthNames : getMonthNames(locale);
    const DAY_NAMES = dayNames.length
      ? dayNames
      : getDayNames(locale, firstDayMonday);

    const monthName = `${MONTH_NAMES[month.month()]} ${month.year()}`;

    if (
      index < props.firstViewableIndex - props.viewableRangeOffset ||
      index > props.lastViewableIndex
    ) {
      return <EmptyMonth name={monthName} height={height} theme={theme} />;
    }

    const days = getDayList({
      ...props,
      month: {
        monthNumber: month.month(),
        year: month.year(),
      },
    });

    const weeks = [];

    while (days.length) {
      weeks.push(days.splice(0, 7));
    }

    return (
      <View style={{ height }}>
        {showMonthTitle && <MonthTitle name={monthName} theme={theme} />}
        {showWeekdays && <WeekColumns days={DAY_NAMES} theme={theme} />}
        {weeks.map((week: DayType[], index: number) => (
          <View key={String(index)} style={{ flexDirection: 'row' }}>
            {week.map((day: DayType, index: number) => (
              <Day
                key={String(index)}
                item={day}
                onPress={props.onPress}
                theme={props.theme}
                renderDayContent={props.renderDayContent}
              />
            ))}
          </View>
        ))}
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
        if (nextProps.endDate) {
          const monthBetweenNextRange = monthBetweenRange(
            currentMonth,
            nextProps.startDate!,
            nextProps.endDate!
          );

          if (prevProps.endDate) {
            const monthBetweenPreviousRange = monthBetweenRange(
              currentMonth,
              prevProps.startDate!,
              prevProps.endDate!
            );

            if (monthBetweenPreviousRange !== monthBetweenNextRange) {
              return false;
            }
          } else if (
            moment(prevProps.startDate).isSame(currentMonth, 'month') ||
            monthBetweenNextRange
          ) {
            return false;
          }
        } else if (prevProps.endDate) {
          const monthBetweenPreviousRange = monthBetweenRange(
            currentMonth,
            prevProps.startDate!,
            prevProps.endDate!
          );

          if (monthBetweenPreviousRange) {
            return false;
          }

          const monthBetweenNextRange = monthBetweenRange(
            currentMonth,
            nextProps.startDate!,
            nextProps.startDate!
          );

          if (monthBetweenNextRange) {
            return false;
          }
        } else if (
          prevProps.startDate !== nextProps.startDate &&
          ((prevProps.startDate &&
            moment(prevProps.startDate).isSame(currentMonth, 'month')) ||
            (nextProps.startDate &&
              moment(nextProps.startDate).isSame(currentMonth, 'month')))
        ) {
          return false;
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
