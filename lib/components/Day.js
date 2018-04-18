// @flow
/* eslint-disable react/no-multi-comp */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import type { DayType } from '../types';

type PropsType = {
  item: DayType,
  onPress: (Date) => void
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 15,
  },
});

class NonTouchableDay extends React.Component<{date: Date, isActive: boolean}> {
  shouldComponentUpdate({ isActive }: { isActive: boolean }): boolean {
    return this.props.isActive !== isActive;
  }

  render() {
    const { isActive, date } = this.props;

    return (
      <View
        style={[
          styles.container,
          { backgroundColor: isActive ? 'blue' : 'white' },
        ]}
      >
        <Text
          style={{
            color: isActive ? 'transparent' : '#d3d3d3',
          }}
        >
          {date.getDate()}
        </Text>
      </View>
    );
  }
}

export default class Day extends React.Component<PropsType, {}> {
  shouldComponentUpdate(nextProps: PropsType): boolean {
    // TODO: check if it should re-render
    return this.props.item.isActive !== nextProps.item.isActive;
  }

  handlePress = () => this.props.onPress(this.props.item.date);

  render() {
    const { item: { date, isVisible, isActive } } = this.props;
    if (!isVisible) return <NonTouchableDay date={date} isActive={isActive} />;

    return (
      <TouchableOpacity
        style={[styles.container, { backgroundColor: isActive ? 'blue' : 'white' }]}
        onPress={this.handlePress}
      >
        <Text style={{ color: 'black' }}>
          {date.getDate()}
        </Text>
      </TouchableOpacity>
    );
  }
}
