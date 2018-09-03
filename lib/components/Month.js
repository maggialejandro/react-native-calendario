// @flow
/* eslint-disable react/no-multi-comp */
import React from 'react';
import { View, Text, FlatList } from 'react-native';
import moment from 'moment';
import Day from './Day';
import { getDayNames, isValidDate } from '../utils/date';
import { getDaysOfMonth } from '../utils';
import type {
  MonthType,
  DayType,
  ThemeType,
  LocaleType,
} from '../types';


class EmptyMonth extends React.Component<{
  name: string,
  theme: ThemeType,
  height: number
}> {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { theme, name, height } = this.props;

    return (
      <View
        style={[
          {
            height,
            justifyContent: 'center',
            alignItems: 'center',
          },
          theme.emptyMonthContainerStyle,
        ]}
      >
        <Text
          style={[
            { fontSize: 25, fontWeight: '300' },
            theme.emptyMonthTextStyle,
          ]}
          allowFontScaling={false}
        >
          {name}
        </Text>
      </View>
    );
  }
}

class WeekColumns extends React.Component<{days: Array<string>, theme: ThemeType}> {
  shouldComponentUpdate() {
    return false;
  }

  renderWeekText = (day: string, i: number) => (
    <View
      key={i}
      style={[
        { flex: 1, alignItems: 'center' },
        this.props.theme.weekColumnStyle,
      ]}
    >
      <Text
        allowFontScaling={false}
        style={this.props.theme.weekColumnTextStyle}
      >
        {day}
      </Text>
    </View>
  )

  render() {
    return (
      <View style={[{ flexDirection: 'row' }, this.props.theme.weekColumnsContainerStyle]}>
        {
          this.props.days.map(this.renderWeekText)
        }
      </View>
    );
  }
}

class MonthTitle extends React.Component<{name: string, theme: ThemeType}> {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <Text
        allowFontScaling={false}
        style={[
          { textAlign: 'center', paddingVertical: 10 },
          this.props.theme.monthTitleTextStyle,
        ]}
      >
        {this.props.name}
      </Text>
    );
  }
}

type PropsType = {
  onPress: (Date) => void,
  month: MonthType,
  theme: ThemeType,
  showWeekdays: boolean,
  showMonthTitle: boolean,
  firstDayMonday: boolean,
  locale: LocaleType,
  dayNames: Array<string>,
  height: number,
  renderDayContent?: DayType => ?React.Element<any>,
  extraData: any,
  minDate?: string,
  maxDate?: string,
  startDate?: string,
  endDate?: string,
  disableRange: boolean
}

export default class Month extends React.Component<PropsType> {
  static defaultProps = {
    renderDayContent: null,
    minDate: null,
    maxDate: null,
    startDate: null,
    endDate: null,
  }

  shouldComponentUpdate(nextProps: PropsType) {
    return this.props.month.isVisible !== nextProps.month.isVisible
        || this.props.startDate !== nextProps.startDate
        || this.props.endDate !== nextProps.endDate;
  }

  getDayList = () => {
    const {
      month: {
        monthNumber,
        year,
      },
      startDate,
      endDate,
      firstDayMonday,
      minDate,
      maxDate,
      disableRange,
    } = this.props;

    const min = minDate && isValidDate(new Date(minDate))
      ? moment(minDate, 'YYYY-MM-DD').toDate() : null;
    const max = maxDate && isValidDate(new Date(maxDate))
      ? moment(maxDate, 'YYYY-MM-DD').toDate() : null;

    return getDaysOfMonth(
      monthNumber,
      year,
      startDate,
      endDate,
      minDate: min,
      maxDate: max,
      disableRange,
      firstDayMonday,
    );
  }

  keyExtractor = (item: DayType): string => item.id;

  // eslint-disable-next-line
  renderDay = ({ item }: { item: DayType }) => (
    <Day
      item={item}
      onPress={this.props.onPress}
      theme={this.props.theme}
      renderDayContent={this.props.renderDayContent}
    />
  )

  render() {
    const {
      month: { name, isVisible },
      showWeekdays,
      showMonthTitle,
      firstDayMonday,
      theme,
      dayNames,
      height,
      locale,
    } = this.props;

    if (!isVisible) {
      return <EmptyMonth name={name} theme={theme} height={height} />;
    }

    const DAY_NAMES = dayNames.length ? dayNames : getDayNames(locale, firstDayMonday);
    const days = this.getDayList();

    return (
      <View style={{ height }}>
        {
          showMonthTitle && <MonthTitle name={name} theme={theme} />
        }
        {
          showWeekdays && <WeekColumns days={DAY_NAMES} theme={theme} />
        }
        <FlatList
          keyExtractor={this.keyExtractor}
          renderItem={this.renderDay}
          extraData={this.props.extraData}
          numColumns={7}
          data={days}
        />
      </View>
    );
  }
}
