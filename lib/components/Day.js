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
    paddingVertical: 15,
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
    return this.props.item.isActive !== nextProps.item.isActive;
  }

  handlePress = () => this.props.onPress(this.props.item.date);

  render() {
    const { item: { date, isVisible, isActive }, theme } = this.props;
    if (!isVisible) return <NonTouchableDay date={date} theme={theme} />;

    return (
      <TouchableOpacity
        style={[
          styles.container,
          { backgroundColor: isActive ? '#6d95da' : 'white' },
          isActive ? theme.activeDayContainerStyle : {},
        ]}
        onPress={this.handlePress}
      >
        <Text
          style={[
            { color: 'black' },
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
