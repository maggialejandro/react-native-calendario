/* @flow */
/* eslint-disable react/no-multi-comp */
import * as React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';

import type { DayType, ThemeType } from '../types';

type PropsType = {
  onPress: (Date) => void,
  item: DayType,
  theme: ThemeType,
  renderDayContent?: (DayType) => React.Node,
};

type NonTouchableDayPropsType = {
  date: Date,
  isActive: boolean,
  theme: ThemeType,
  isMonthDate: boolean,
  isOutOfRange: boolean,
  isToday: boolean,
};

const styles = StyleSheet.create({
  activeDate: {
    backgroundColor: '#3b5998',
  },
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
    marginVertical: 5,
    paddingVertical: 10,
  },
  endDate: {
    borderBottomRightRadius: 60,
    borderTopRightRadius: 60,
  },
  startDate: {
    borderBottomLeftRadius: 60,
    borderTopLeftRadius: 60,
  },
});

class NonTouchableDay extends React.Component<NonTouchableDayPropsType> {
  shouldComponentUpdate(nextProps: NonTouchableDayPropsType): boolean {
    return (
      this.props.isActive !== nextProps.isActive ||
      this.props.isVisible !== nextProps.isVisible
    );
  }

  render() {
    const {
      isMonthDate,
      isActive,
      isOutOfRange,
      theme,
      date,
      isToday,
    } = this.props;

    return (
      <View
        style={[
          styles.container,
          theme.dayContainerStyle,
          theme.nonTouchableDayContainerStyle,
          isToday && !isActive ? theme.todayContainerStyle : {},
          isActive ? styles.activeDate : {},
          isActive ? theme.activeDayContainerStyle : {},
          isOutOfRange ? theme.dayOutOfRangeContainerStyle : {},
        ]}
      >
        <Text
          style={[
            { color: '#d3d3d3' },
            theme.nonTouchableDayTextStyle,
            isMonthDate ? theme.nonTouchableLastMonthDayTextStyle : {},
            isToday ? theme.todayTextStyle : {},
            isOutOfRange ? theme.dayOutOfRangeTextStyle : {},
          ]}
        >
          {!isActive && date.getDate()}
        </Text>
      </View>
    );
  }
}

export default class Day extends React.Component<PropsType, {}> {
  shouldComponentUpdate(nextProps: PropsType): boolean {
    return (
      this.props.item.isActive !== nextProps.item.isActive ||
      this.props.item.isVisible !== nextProps.item.isVisible ||
      this.props.item.isStartDate !== nextProps.item.isStartDate ||
      this.props.item.isEndDate !== nextProps.item.isEndDate ||
      this.props.renderDayContent !== nextProps.renderDayContent
    );
  }

  handlePress = () => this.props.onPress(this.props.item.date);

  render() {
    const {
      item: {
        date,
        isVisible,
        isActive,
        isStartDate,
        isEndDate,
        isMonthDate,
        isOutOfRange,
        isToday,
      },
      theme,
    } = this.props;

    if (!isVisible) {
      return (
        <NonTouchableDay
          isActive={isActive}
          date={date}
          theme={theme}
          isMonthDate={isMonthDate}
          isOutOfRange={isOutOfRange}
          isToday={isToday}
        />
      );
    }

    return (
      <TouchableOpacity
        style={[
          styles.container,
          theme.dayContainerStyle,
          isToday && !isActive ? theme.todayContainerStyle : {},
          isActive ? styles.activeDate : {},
          isActive ? theme.activeDayContainerStyle : {},
          isStartDate ? styles.startDate : {},
          isStartDate ? theme.startDateContainerStyle : {},
          isEndDate ? styles.endDate : {},
          isEndDate ? theme.endDateContainerStyle : {},
        ]}
        onPress={this.handlePress}
      >
        {this.props.renderDayContent ? (
          this.props.renderDayContent(this.props.item)
        ) : (
          <Text
            style={[
              { color: isActive ? 'white' : 'black' },
              theme.dayTextStyle,
              isToday ? theme.todayTextStyle : {},
              isActive ? theme.activeDayTextStyle : {},
            ]}
          >
            {date.getDate()}
          </Text>
        )}
      </TouchableOpacity>
    );
  }
}
