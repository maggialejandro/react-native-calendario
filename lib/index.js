// @flow
import React from 'react';
import { FlatList } from 'react-native';
import moment from 'moment';

import Month from './components/Month';
import {
  getMonthsList,
  markSelectedDays,
  isValidDate,
  getInitialMonthList,
} from './utils';
import type { MonthType, ViewTokenType, ThemeType, LocaleType } from './types';

type RangeType = {
  startDate: Date,
  endDate?: ?Date
}

type CalendarType = {
  onChange: (range: RangeType) => void,
  initialListSize?: number,
  numberOfMonths?: number,
  minDate?: string,
  maxDate?: string,
  startDate?: string,
  endDate?: string,
  theme: ThemeType,
  showWeekdays: boolean,
  showMonthTitle: boolean,
  locale?: LocaleType,
  monthNames?: Array<string>,
  dayNames?: Array<string>
};

type StateType = {
  months: Array<MonthType>,
  visibleMonths: Array<MonthType>,
  initialListSize: number,
  firstViewableIndex: number,
  lastViewableIndex: number,
  initialScrollIndex: number,
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
      return true;
    }
  }

  return false;
}

export default class Calendar extends React.Component<CalendarType, StateType> {
  static defaultProps = {
    numberOfMonths: NUMBER_OF_MONTHS,
    initialListSize: 2,
    showWeekdays: true,
    showMonthTitle: true,
    theme: {},
    locale: 'en',
    monthNames: [],
    dayNames: [],
  }

  state = {
    months: [],
    visibleMonths: [],
    initialListSize: 2,
    firstViewableIndex: 0,
    lastViewableIndex: 0,
    initialScrollIndex: 0,
    startDate: null,
    endDate: null,
  }

  componentWillMount() {
    const {
      initialListSize,
      numberOfMonths,
      startDate,
      endDate,
      minDate,
      maxDate,
      locale,
      monthNames,
    } = this.props;

    const startingMonth = moment().toDate();
    const min = minDate && isValidDate(new Date(minDate))
      ? moment(minDate, 'YYYY-MM-DD').toDate() : null;
    const max = maxDate && isValidDate(new Date(maxDate))
      ? moment(maxDate, 'YYYY-MM-DD').toDate() : null;
    const start = startDate && isValidDate(new Date(startDate))
      ? moment(startDate, 'YYYY-MM-DD').toDate() : null;
    const end = endDate && isValidDate(new Date(endDate))
      ? moment(endDate, 'YYYY-MM-DD').toDate() : null;

    const MESES: Array<MonthType> = getMonthsList(
      startingMonth,
      numberOfMonths,
      initialListSize + DIFF_VISIBLE,
      start,
      end,
      min,
      max,
      locale,
      monthNames,
    );

    let visibleMonths: Array<MonthType> = MESES.slice(INITIAL_MONTH, LAST_RENDERED);
    let firstMonthIndex = 0;
    if (start) {
      visibleMonths = getInitialMonthList(MESES, start, LAST_RENDERED, DIFF_VISIBLE);

      const firstMonth = visibleMonths.find((m: MonthType): boolean =>
        m.monthNumber - 1 === start.getMonth() && m.year === start.getFullYear());

      firstMonthIndex = visibleMonths.indexOf(firstMonth) || 0;
    }

    this.setState({
      initialScrollIndex: firstMonthIndex,
      initialListSize,
      months: MESES,
      visibleMonths,
      startDate: start,
      endDate: end,
    });
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

  handleViewableItemsChange = (info: ViewableItemsType) => {
    const firstItemVisible = info.viewableItems[0];
    const lastVisibleItem = info.viewableItems[info.viewableItems.length - 1];
    const firstViewableIndex = firstItemVisible.index || 0;
    const lastViewableIndex = lastVisibleItem.index || this.state.lastViewableIndex;

    if (this.viewableItemsChanged(firstViewableIndex, lastViewableIndex)) {
      const months = this.state.months.map((month: MonthType, i: number) => {
        // const last = lastViewableIndex + DIFF_VISIBLE;
        const isVisible = i >= firstViewableIndex - DIFF_VISIBLE
          && i <= lastViewableIndex + DIFF_VISIBLE;

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

    const months = this.state.months.map((month: MonthType): MonthType => {
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
        const days = markSelectedDays(
          currentMonth.getMonth(),
          month.days,
          newRange.startDate,
          newRange.endDate,
        );
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

    this.setState({
      ...newRange,
      months,
      visibleMonths: months,
    }, () => this.props.onChange(newRange));
  }

  renderMonth = ({ item }: { item: MonthType }) => (
    <Month
      onPress={this.handlePressDay}
      month={item}
      theme={this.props.theme}
      showWeekdays={this.props.showWeekdays}
      showMonthTitle={this.props.showMonthTitle}
      locale={this.props.locale}
      dayNames={this.props.dayNames}
    />
  )

  render() {
    return (
      <FlatList
        getItemLayout={this.getItemLayout}
        initialScrollIndex={this.state.initialScrollIndex}
        viewabilityConfig={VIEWABILITY_CONFIG}
        onViewableItemsChanged={this.handleViewableItemsChange}
        initialNumToRender={this.state.initialListSize}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderMonth}
        data={this.state.visibleMonths}
      />
    );
  }
}
