// @flow
/* eslint-disable react/no-multi-comp */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import type { DayType, ThemeType } from '../types';

type PropsType = {
  onPress: (Date) => void,
  item: DayType,
  theme: ThemeType
}

type NonTouchableDayPropsType = {
  date: Date,
  isActive: boolean,
  theme: ThemeType
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
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
  },
  endDate: {
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
  },
});

class NonTouchableDay extends React.Component<NonTouchableDayPropsType> {
  shouldComponentUpdate(nextProps: NonTouchableDayPropsType): boolean {
    return this.props.isActive !== nextProps.isActive;
  }

  render() {
    const { date, isActive, theme } = this.props;

    return (
      <View
        style={[
          styles.container,
          theme.dayContainerStyle,
          theme.nonTouchableDayContainerStyle,
          isActive ? styles.activeDate : {},
          isActive ? theme.activeDayContainerStyle : {},
        ]}
      >
        <Text
          style={[
            { color: '#d3d3d3' },
            theme.nonTouchableDayTextStyle,
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
      this.props.item.isActive !== nextProps.item.isActive
       || this.props.item.isStartDate !== nextProps.item.isStartDate
       || this.props.item.isEndDate !== nextProps.item.isEndDate
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
      },
      theme,
    } = this.props;

    if (!isVisible) {
      return (
        <NonTouchableDay
          isActive={isActive}
          date={date}
          theme={theme}
        />
      );
    }

    return (
      <TouchableOpacity
        style={[
          styles.container,
          theme.dayContainerStyle,
          isActive ? styles.activeDate : {},
          isStartDate ? styles.startDate : {},
          isEndDate ? styles.endDate : {},
          isActive ? theme.activeDayContainerStyle : {},
        ]}
        onPress={this.handlePress}
      >
        <Text
          style={[
            { color: isActive ? 'white' : 'black' },
            theme.dayTextStyle,
            isActive ? theme.activeDayTextStyle : {},
          ]}
        >
          {date.getDate()}
        </Text>
      </TouchableOpacity>
    );
  }
}
