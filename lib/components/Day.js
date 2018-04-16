// @flow
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import type { DayType } from '../types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 15,
  },
});

export default class Day extends React.Component<DayType, {}> {
  shouldComponentUpdate(nextProps: DayType) {
    // TODO: check if it should re-render
    return this.props.isActive !== nextProps.isActive;
  }

  render() {
    const { date, isVisible } = this.props;
    return (
      <View style={styles.container}>
        <Text style={{ color: isVisible ? 'black' : '#d3d3d3' }}>
          {date.getDate()}
        </Text>
      </View>
    );
  }
}
