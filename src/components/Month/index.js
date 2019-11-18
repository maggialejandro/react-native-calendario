/* @flow */
/* eslint-disable react/no-unused-prop-types */
import * as React from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';
import Day from '../Day';
import { getDayNames, isValidDate } from '../../utils/date';
import { getDaysOfMonth } from './utils';
import type { MonthType, DayType, ThemeType, LocaleType } from '../../types';

type EmptyMonthType = { name: string, theme: ThemeType, height: number };

const EmptyMonth = React.memo<EmptyMonthType>(
  (props: EmptyMonthType) => (
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
  () => true
);

type WeekColumnType = { day: string, theme: ThemeType };

const WeekColumn = React.memo<WeekColumnType>(
  (props: WeekColumnType) => (
    <View
      style={[{ flex: 1, alignItems: 'center' }, props.theme.weekColumnStyle]}
    >
      <Text allowFontScaling={false} style={props.theme.weekColumnTextStyle}>
        {props.day}
      </Text>
    </View>
  ),
  () => true
);

type WeelColumnsType = { days: string[], theme: ThemeType };

const WeekColumns = React.memo<WeelColumnsType>(
  (props: WeelColumnsType) => (
    <View
      style={[{ flexDirection: 'row' }, props.theme.weekColumnsContainerStyle]}
    >
      {props.days.map((day: string) => (
        <WeekColumn key={day} day={day} theme={props.theme} />
      ))}
    </View>
  ),
  () => true
);

type MonthTitleType = { name: string, theme: ThemeType };

const MonthTitle = React.memo<MonthTitleType>(
  (props: MonthTitleType) => (
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
  () => true
);

type Props = {
  onPress: (Date) => void,
  month: MonthType,
  theme: ThemeType,
  showWeekdays: boolean,
  showMonthTitle: boolean,
  firstDayMonday: boolean,
  locale: LocaleType,
  dayNames: string[],
  height: number,
  renderDayContent?: (DayType) => React.Node,
  minDate?: string,
  maxDate?: string,
  startDate: ?Date,
  endDate: ?Date,
  disableRange: boolean,
  disabledDays: { [key: string]: any },
  extraData: any,
};

const getDayList = (props: Props) => {
  const {
    month: { monthNumber, year },
    startDate,
    endDate,
    firstDayMonday,
    minDate,
    maxDate,
    disableRange,
    disabledDays,
  } = props;

  const min =
    minDate && isValidDate(new Date(minDate))
      ? moment(minDate, 'YYYY-MM-DD').toDate()
      : null;
  const max =
    maxDate && isValidDate(new Date(maxDate))
      ? moment(maxDate, 'YYYY-MM-DD').toDate()
      : null;

  return getDaysOfMonth(
    monthNumber,
    year,
    startDate,
    endDate,
    min,
    max,
    disableRange,
    firstDayMonday,
    disabledDays
  );
};

export default React.memo<Props>(
  (props: Props) => {
    const {
      month: { name, isVisible },
      showWeekdays,
      showMonthTitle,
      firstDayMonday,
      theme,
      dayNames,
      height,
      locale,
    } = props;

    if (!isVisible) {
      return <EmptyMonth name={name} theme={theme} height={height} />;
    }

    const DAY_NAMES = dayNames.length
      ? dayNames
      : getDayNames(locale, firstDayMonday);
    const days = getDayList(props);
    const weeks = [];

    while (days.length) {
      weeks.push(days.splice(0, 7));
    }

    return (
      <View style={{ height }}>
        {showMonthTitle && <MonthTitle name={name} theme={theme} />}
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
    return !(
      prevProps.month.isVisible !== nextProps.month.isVisible ||
      prevProps.startDate !== nextProps.startDate ||
      prevProps.minDate !== nextProps.minDate ||
      prevProps.maxDate !== nextProps.maxDate ||
      prevProps.endDate !== nextProps.endDate ||
      prevProps.extraData !== nextProps.extraData
    );
  }
);
