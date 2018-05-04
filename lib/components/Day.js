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

class NonTouchableDay extends React.Component<{date: Date, theme: ThemeType}> {
  shouldComponentUpdate(): boolean {
    return false;
  }

  render() {
    const { date, theme } = this.props;

    return (
      <View
        style={[
          styles.container,
          theme.nonTouchableDayContainerStyle,
        ]}
      >
        <Text
          style={[
            { color: '#d3d3d3' },
            theme.nonTouchableDayTextStyle,
          ]}
        >
          {date.getDate()}
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

    if (!isVisible) return <NonTouchableDay date={date} theme={theme} />;

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
