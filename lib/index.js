// @flow
import React from 'react';
import { FlatList } from 'react-native';
import moment from 'moment';

import Month from './components/Month';
import { getMonthsList, markSelectedDays } from './utils';
import type { MonthType, ViewTokenType } from './types';

type CalendarType = {
  numberOfMonths?: number,
  minDate?: Date,
  maxDate?: Date,
  startDate?: Date,
  endDate?: Date
};

type StateType = {
  months: Array<MonthType>,
  visibleMonths: Array<MonthType>,
  firstViewableIndex: number,
  lastViewableIndex: number,
  startDate?: ?Date,
  endDate?: ?Date
};

type ViewableItemsType = {
  changed: Array<ViewTokenType>,
  viewableItems: Array<ViewTokenType>
};

const INITIAL_MONTH = 0;
const NUMBER_OF_MONTHS = 12;
const CALENDAR_HEIGHT = 370;

const DIFF_VISIBLE = 1;
const LAST_RENDERED = 6;

const VIEWABILITY_CONFIG = {
  waitForInteraction: true,
  viewAreaCoveragePercentThreshold: 2,
};

function visibleMonthsChanged(oldMonths: Array<MonthType>, newMonths: Array<MonthType>): boolean {
  for (let i = 0; i < oldMonths.length; i++) {
    if (newMonths[i].isVisible !== oldMonths[i].isVisible) {
      console.log('visibleMonthsChanged!');
      return true;
    }
  }

  console.log('visibleMonthsChanged: false');

  return false;
}

export default class Calendar extends React.Component<CalendarType, StateType> {
  static defaultProps = {
    numberOfMonths: NUMBER_OF_MONTHS,
  }

  state = {
    months: [],
    visibleMonths: [],
    firstViewableIndex: 0,
    lastViewableIndex: 0,
    startDate: null,
    endDate: null,
  }

  componentWillMount() {
    console.time('Calendar.mount');
    const { numberOfMonths, startDate, endDate } = this.props;
    const startingMonth = moment();
    const MESES: Array<MonthType> = getMonthsList(
      startingMonth.toDate(),
      numberOfMonths,
      3,
    );
    const visibleMonths: Array<MonthType> = MESES.slice(INITIAL_MONTH, LAST_RENDERED);

    console.log(MESES);

    this.setState({
      months: MESES,
      visibleMonths,
      startDate,
      endDate,
    });
  }

  componentDidMount() {
    console.timeEnd('Calendar.mount');
  }

  shouldComponentUpdate(nextProps: CalendarType, nextState: StateType): boolean {
    return (
      this.state.visibleMonths.length !== nextState.visibleMonths.length
      || visibleMonthsChanged(this.state.months, nextState.months)
      || this.state.startDate !== nextState.startDate
      || this.state.endDate !== nextState.endDate
    );
  }

  getItemLayout = (data: any, index: number): {length: number, offset: number, index: number} => ({
    length: CALENDAR_HEIGHT,
    offset: CALENDAR_HEIGHT * index,
    index,
  })

  keyExtractor = (item: MonthType): string => String(item.id);

  viewableItemsChanged = (first: number, last: number): boolean =>
    this.state.firstViewableIndex !== first || this.state.lastViewableIndex !== last

  handleViewableItems = (info: ViewableItemsType) => {
    const firstItemVisible = info.viewableItems[0];
    const lastVisibleItem = info.viewableItems[info.viewableItems.length - 1];

    console.log(`%cRange => [${firstItemVisible.item.name} - ${lastVisibleItem.item.name} ]`, 'color: green;');

    const firstViewableIndex = firstItemVisible.index || 0;
    const lastViewableIndex = lastVisibleItem.index || this.state.lastViewableIndex;

    if (this.viewableItemsChanged(firstViewableIndex, lastViewableIndex)) {
      const months = this.state.months.map((month: MonthType, i: number) => {
        const last = lastViewableIndex + DIFF_VISIBLE;
        const isVisible = i >= firstViewableIndex - DIFF_VISIBLE
          && i <= lastViewableIndex + DIFF_VISIBLE;

        console.log(`Index ${i}, lastViewableIndex ${lastViewableIndex}, <= ${last}, VISIBLE ${isVisible ? 'yes' : 'no'}`);

        return {
          ...month,
          isVisible,
        };
      });

      this.setState({
        firstViewableIndex,
        lastViewableIndex,
        visibleMonths: months,
        months,
      });
    }
  }

  handlePressDay = (date: Date) => {
    const newRange = {};

    if (this.state.startDate) {
      if (this.state.endDate) {
        newRange.startDate = date;
        newRange.endDate = null;
      } else if (date < this.state.startDate) {
        newRange.startDate = date;
      } else if (date > this.state.startDate) {
        newRange.startDate = this.state.startDate;
        newRange.endDate = date;
      } else {
        newRange.startDate = date;
        newRange.endDate = date;
      }
    } else {
      newRange.startDate = date;
    }

    const months = this.state.months.map((month: MonthType) => {
      const currentMonth = moment([month.year, month.monthNumber - 1]).toDate();
      const monthHasSelectedDays =
        (newRange.endDate && currentMonth >= newRange.startDate && currentMonth <= newRange.endDate)
        || (month.monthNumber - 1 === date.getMonth() && month.year === date.getFullYear())
        || (this.state.endDate
          && currentMonth >= this.state.startDate
          && currentMonth <= this.state.endDate
        ) || (this.state.startDate
          && month.monthNumber - 1 === this.state.startDate.getMonth()
          && month.year === this.state.startDate.getFullYear()
        );


      if (monthHasSelectedDays) {
        const days = markSelectedDays(month.days, newRange.startDate, newRange.endDate);
        return {
          ...month,
          days,
          ...newRange,
        };
      }

      return {
        ...month,
        ...newRange,
      };
    });

    console.log(months);

    this.setState({
      ...newRange,
      months,
      visibleMonths: months,
    });
  }

  renderMonth = ({ item }: { item: MonthType }) => (
    <Month
      onPress={this.handlePressDay}
      month={item}
    />
  )

  render() {
    console.log(`%c[[[[[  RENDER (${this.state.visibleMonths.length}) ]]]]]`, 'color: red; font-size:13px;');
    return (
      <FlatList
        getItemLayout={this.getItemLayout}
        viewabilityConfig={VIEWABILITY_CONFIG}
        onViewableItemsChanged={this.handleViewableItems}
        initialNumToRender={2}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderMonth}
        data={this.state.visibleMonths}
      />
    );
  }
}
