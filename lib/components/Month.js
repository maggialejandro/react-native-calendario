// @flow
/* eslint-disable react/no-multi-comp */
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Day from './Day';
import type { MonthType, DayType } from '../types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 370,
  },
});

const daysStrings = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sab', 'Dom'];

export class EmptyMonth extends React.Component<{name: string}> {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    console.log(`render EmptyMonth ${this.props.name}`);
    return (
      <View style={{ height: 370, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 25, fontWeight: 'bold' }} allowFontScaling={false}>
          {this.props.name}
        </Text>
      </View>
    );
  }
}

class WeekColumns extends React.Component<{days: Array<string>}> {
  shouldComponentUpdate() {
    return false;
  }

  renderWeekText = (day: string, i: number) => (
    <View style={{ flex: 1, alignItems: 'center' }} key={i}>
      <Text allowFontScaling={false}>{day}</Text>
    </View>
  )

  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        {
          this.props.days.map(this.renderWeekText)
        }
      </View>
    );
  }
}

class MonthTitle extends React.Component<{name: string}> {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <Text
        allowFontScaling={false}
        style={{ textAlign: 'center', paddingVertical: 10 }}
      >
        {this.props.name}
      </Text>
    );
  }
}

type PropsType = {
  month: MonthType
}

export default class Month extends React.Component<PropsType> {
  shouldComponentUpdate(nextProps: PropsType) {
    // TODO: check if it should re-render days
    return (
      this.props.month.isVisible !== nextProps.month.isVisible
    );
  }

  keyExtractor = (item: DayType): string => item.id;

  renderDay = ({ item }: { item: DayType }) => (
    <Day {...item} />
  )

  render() {
    const { month: { name, days, isVisible } } = this.props;

    if (!isVisible) {
      return <EmptyMonth name={name} />;
    }

    console.log(`%c[[ renderMonth ${name} ]]]`, 'color: blue; font-size:11px;');

    return (
      <View style={styles.container}>
        <MonthTitle name={name} />
        <WeekColumns days={daysStrings} />

        <FlatList
          keyExtractor={this.keyExtractor}
          renderItem={this.renderDay}
          numColumns={7}
          data={days}
        />
      </View>
    );
  }
}
