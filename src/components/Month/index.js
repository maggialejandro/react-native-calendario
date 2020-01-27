import React from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';
import Day from '../Day';
import { getDayNames, isValidDate } from '../../utils/date';
import { getDaysOfMonth } from './utils';

const EmptyMonth = React.memo(
  (props) => (
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

const WeekColumn = React.memo(
  (props) => (
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
const WeekColumns = React.memo(
  (props) => (
    <View
      style={[{ flexDirection: 'row' }, props.theme.weekColumnsContainerStyle]}
    >
      {props.days.map((day) => (
        <WeekColumn key={day} day={day} theme={props.theme} />
      ))}
    </View>
  ),
  () => true
);

const MonthTitle = React.memo(
  (props) => (
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

const getDayList = (props) => {
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

  return getDaysOfMonth(
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

export default React.memo(
  (props) => {
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
        {weeks.map((week, index) => (
          <View key={String(index)} style={{ flexDirection: 'row' }}>
            {week.map((day, index) => (
              <Day
                disabled={index === 1}
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
