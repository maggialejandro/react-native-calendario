// @flow
/* eslint-disable react/no-multi-comp */
import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';

import type { DayType, ThemeType } from '../types';

type PropsType = {
  onPress: (Date) => void,
  item: DayType,
  theme: ThemeType,
  renderDayContent?: (DayType) => ?React.Element<any>,
};

type NonTouchableDayPropsType = {
  date: Date,
  isActive: boolean,
  theme: ThemeType,
  isMonthDate: boolean,
  isOutOfRange: boolean,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    marginVertical: 5,
  },
  activeDate: {
    backgroundColor: '#3b5998',
  },
  startDate: {
    borderTopLeftRadius: 60,
    borderBottomLeftRadius: 60,
  },
  endDate: {
    borderTopRightRadius: 60,
    borderBottomRightRadius: 60,
  },
});

class NonTouchableDay extends React.Component<NonTouchableDayPropsType> {
  shouldComponentUpdate(nextProps: NonTouchableDayPropsType): boolean {
    return this.props.isActive !== nextProps.isActive;
  }

  render() {
    const { isMonthDate, isActive, isOutOfRange, theme, date } = this.props;

    return (
      <View
        style={[
          styles.container,
          theme.dayContainerStyle,
          theme.nonTouchableDayContainerStyle,
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
  static defaultProps = {
    renderDayContent: null,
  };

  shouldComponentUpdate(nextProps: PropsType): boolean {
    return (
      this.props.item.isActive !== nextProps.item.isActive ||
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
        />
      );
    }

    return (
      <TouchableOpacity
        style={[
          styles.container,
          theme.dayContainerStyle,
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
