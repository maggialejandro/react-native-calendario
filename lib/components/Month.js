// @flow
/* eslint-disable react/no-multi-comp */
import React from 'react';
import { View, Text, FlatList } from 'react-native';
import moment from 'moment';
import Day from './Day';
import { getDayNames } from '../utils/date';
import type { MonthType, DayType, ThemeType, LocaleType } from '../types';


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
  extraData: any
}

export default class Month extends React.Component<PropsType> {
  static defaultProps = {
    renderDayContent: null,
  }

  shouldComponentUpdate(nextProps: PropsType) {
    return (
      this.props.month.isVisible !== nextProps.month.isVisible || (nextProps.month.isVisible &&
        (((this.props.month.startDate !== nextProps.month.startDate)
          && (this.shouldRenderMonth(nextProps.month.startDate, nextProps.month.endDate)
            || this.shouldRenderMonth(this.props.month.startDate, this.props.month.endDate)
          )) || ((this.props.month.endDate !== nextProps.month.endDate)
          && (this.shouldRenderMonth(nextProps.month.startDate, nextProps.month.endDate)
            || this.shouldRenderMonth(this.props.month.startDate, this.props.month.endDate)))))
      || this.props.renderDayContent !== nextProps.renderDayContent
    );
  }

  shouldRenderMonth(startDate?: ?Date, endDate?: ?Date): boolean {
    const { month } = this.props;

    if (endDate && startDate) {
      const currentMonthMoment = moment([month.year, month.monthNumber]);
      const nextMonth = currentMonthMoment.clone().add(1, 'M').toDate();
      const currentMonth = currentMonthMoment.toDate();

      return (
        (startDate <= currentMonth && endDate >= currentMonth)
        || (startDate >= currentMonth && endDate < nextMonth)
        || (startDate < nextMonth && endDate >= nextMonth)
      );
    } else if (startDate) {
      return month.monthNumber === startDate.getMonth()
      && month.year === startDate.getFullYear();
    }

    return false;
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
      month: { name, days, isVisible },
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
