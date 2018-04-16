// @flow
import React from 'react';
import { FlatList } from 'react-native';
import moment from 'moment';

import Month from './components/Month';
import { getMonthsList } from './utils';
import type { MonthType } from './types';

type PropsType = {
  numberOfMonths?: number
};

type StateType = {
  months: Array<MonthType>,
};

const NUMBER_OF_MONTHS = 12;
const CALENDAR_HEIGHT = 370;

function visibleMonthsChanged(oldMonths: Array<MonthType>, newMonths: Array<MonthType>): boolean {
  for (let i = 0; i < oldMonths.length; i++) {
    if (newMonths[i].isVisible !== oldMonths[i].isVisible) {
      console.log('visibleMonthsChanged!');
      return true;
    }
  }

  console.log('visibleMonthsChanged false');

  return false;
}

export default class Calendar extends React.Component<PropsType, StateType> {
  static defaultProps = {
    numberOfMonths: NUMBER_OF_MONTHS,
  }

  state = {
    months: [],
  }

  componentWillMount() {
    console.time('Calendar.mount');
    const { numberOfMonths } = this.props;
    const startingMonth = moment();
    const months: Array<MonthType> = getMonthsList(
      startingMonth.toDate(),
      numberOfMonths,
    );

    this.setState({ months });
  }

  componentDidMount() {
    console.timeEnd('Calendar.mount');
  }

  shouldComponentUpdate(nextProps: PropsType, nextState: StateType): boolean {
    return visibleMonthsChanged(this.state.months, nextState.months);
  }

  getItemLayout = (data: any, index: number): {length: number, offset: number, index: number} => ({
    length: CALENDAR_HEIGHT,
    offset: CALENDAR_HEIGHT * index,
    index,
  })

  keyExtractor = (item: MonthType): string => String(item.id);

  renderMonth = ({ item }: { item: MonthType }) => <Month month={item} />

  render() {
    return (
      <FlatList
        getItemLayout={this.getItemLayout}
        initialNumToRender={4}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderMonth}
        data={this.state.months}
      />
    );
  }
}
