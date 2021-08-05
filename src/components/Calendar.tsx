import * as React from 'react';
import { FlatList, Platform } from 'react-native';
import moment from 'moment';

import Month from './Month';
import { isValidDate } from '../utils/date';
import { CalendarProps, ViewableItemsType } from '../types';

interface State {
  firstMonthToRender: Date;
  months: any[];
  firstViewableIndex: number;
  lastViewableIndex: number;
  initialScrollIndex: number;
  startDate?: Date;
  endDate?: Date;
}

const NUMBER_OF_MONTHS = 12;
const MONTH_HEIGHT = 370;
const INITIAL_LIST_SIZE = 2;
const VIEWABLE_RANGE_OFFSET = 5;

const VIEWABILITY_CONFIG = {
  waitForInteraction: true,
  itemVisiblePercentThreshold: 10,
  minimumViewTime: 32,
};

export default class Calendar extends React.Component<CalendarProps, State> {
  static defaultProps = {
    numberOfMonths: NUMBER_OF_MONTHS,
    startingMonth: moment().format('YYYY-MM-DD'),
    initialListSize: INITIAL_LIST_SIZE,
    showWeekdays: true,
    showMonthTitle: true,
    theme: {},
    locale: 'en',
    monthNames: [],
    dayNames: [],
    disableRange: false,
    firstDayMonday: false,
    monthHeight: MONTH_HEIGHT,
    disableOffsetDays: false,
    viewableRangeOffset: VIEWABLE_RANGE_OFFSET,
  };

  constructor(props: CalendarProps) {
    super(props);

    this.state = {
      firstMonthToRender: new Date(),
      months: [],
      initialScrollIndex: 0,
      startDate: undefined,
      endDate: undefined,
      firstViewableIndex: 0,
      lastViewableIndex: INITIAL_LIST_SIZE + props.viewableRangeOffset!,
    };
  }

  UNSAFE_componentWillMount() {
    const { numberOfMonths, startingMonth, startDate, endDate } = this.props;
    let { firstMonthToRender } = this.state;

    if (startingMonth && isValidDate(new Date(startingMonth))) {
      firstMonthToRender = moment(startingMonth, 'YYYY-MM-DD').toDate();
    }

    let start: Date | undefined;

    if (startDate && isValidDate(new Date(startDate))) {
      start = moment(startDate, 'YYYY-MM-DD').toDate();

      if (
        start >
        moment(firstMonthToRender).add(numberOfMonths, 'months').toDate()
      ) {
        start = undefined;
      }
    }

    const end =
      endDate && isValidDate(new Date(endDate))
        ? moment(endDate, 'YYYY-MM-DD').toDate()
        : undefined;

    const months = new Array(numberOfMonths);

    let firstMonthIndex = 0;

    if (start) {
      const monthIndex = this.getMonthIndex(start, months, firstMonthToRender);
      if (monthIndex !== null) {
        firstMonthIndex = monthIndex;
      }
    }

    this.setState({
      firstMonthToRender,
      initialScrollIndex: firstMonthIndex,
      months,
      startDate: start,
      endDate: end,
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps: CalendarProps) {
    const { startDate, months, firstMonthToRender } = this.state;
    const nextStartDate =
      nextProps.startDate && nextProps.startDate instanceof Date
        ? nextProps.startDate
        : undefined;
    const endDate =
      nextProps.endDate && nextProps.endDate instanceof Date
        ? nextProps.endDate
        : undefined;

    if (startDate !== nextStartDate || this.state.endDate !== endDate) {
      this.setState(
        {
          startDate: nextStartDate,
          endDate,
        },
        () => {
          if (
            this.listReference &&
            nextStartDate &&
            startDate !== nextStartDate
          ) {
            const monthIndex = this.getMonthIndex(
              nextStartDate,
              months,
              firstMonthToRender
            );
            if (monthIndex !== null) {
              this.listReference.scrollToIndex({ index: monthIndex });
            }
          }
        }
      );
    }
  }

  shouldComponentUpdate(nextProps: CalendarProps, nextState: State): boolean {
    return (
      this.state.months.length !== nextState.months.length ||
      this.state.startDate !== nextState.startDate ||
      this.state.firstViewableIndex !== nextState.firstViewableIndex ||
      this.state.lastViewableIndex !== nextState.lastViewableIndex ||
      this.state.endDate !== nextState.endDate ||
      this.props.minDate !== nextProps.minDate ||
      this.props.maxDate !== nextProps.maxDate ||
      this.props.startingMonth !== nextProps.startingMonth ||
      this.props.renderDayContent !== nextProps.renderDayContent
    );
  }

  private listReference?: FlatList<any> | null | undefined;

  getItemLayout = (
    _data: any,
    index: number
  ): { length: number; offset: number; index: number } => ({
    length: this.props.monthHeight,
    offset: this.props.monthHeight * index,
    index,
  });

  keyExtractor = (_item: any, index: number): string => String(index);

  handleViewableItemsChange = (info: ViewableItemsType) => {
    if (this.props.viewableItemsChanged) {
      this.props.viewableItemsChanged(info);
    }

    if (this.props.renderAllMonths) {
      return;
    }

    const { viewableItems } = info;

    if (viewableItems.length > 0) {
      const {
        0: firstViewableItem,
        length: l,
        [l - 1]: lastViewableItem,
      } = viewableItems;

      const { firstViewableIndex, lastViewableIndex } = this.state;
      if (
        firstViewableIndex !== firstViewableItem.index ||
        lastViewableIndex !== lastViewableItem.index
      ) {
        this.setState({
          firstViewableIndex: firstViewableItem.index!,
          lastViewableIndex: lastViewableItem.index! + VIEWABLE_RANGE_OFFSET,
        });
      }
    }
  };

  handlePressDay = (date: Date) => {
    const { startDate, endDate } = this.state;
    let newStartDate;
    let newEndDate;

    if (this.props.disableRange) {
      newStartDate = date;
      newEndDate = undefined;
    } else if (startDate) {
      if (endDate) {
        newStartDate = date;
        newEndDate = undefined;
      } else if (date < startDate!) {
        newStartDate = date;
      } else if (date > startDate!) {
        newStartDate = startDate;
        newEndDate = date;
      } else {
        newStartDate = date;
        newEndDate = date;
      }
    } else {
      newStartDate = date;
    }

    const newRange = {
      startDate: newStartDate as Date,
      endDate: newEndDate,
    };

    this.setState(newRange, () => this.props.onChange(newRange));
  };

  setReference = (ref: any) => {
    if (ref) {
      this.listReference = ref;
      if (this.props.calendarListRef) {
        this.props.calendarListRef(ref);
      }
    }
  };

  getMonthIndex = (date: Date, months: any[], firstMonthToRender: Date) => {
    const { numberOfMonths } = this.props;

    const firstMonth = moment(firstMonthToRender);
    const lastMonth = firstMonth.clone().add(numberOfMonths, 'months');

    if (
      date >= firstMonth.toDate() &&
      date <= lastMonth.endOf('month').toDate()
    ) {
      const monthIndex = moment(date).diff(firstMonth, 'months');

      if (monthIndex >= 0 && monthIndex <= months.length) {
        return monthIndex;
      }
    }

    return null;
  };

  renderMonth = ({ index }: { index: number }) => {
    const { firstMonthToRender } = this.state;
    const month = moment(firstMonthToRender).add(index, 'months');

    return (
      <Month
        month={month.month()}
        year={month.year()}
        index={index}
        firstMonthToRender={this.state.firstMonthToRender}
        monthNames={this.props.monthNames}
        onPress={this.handlePressDay}
        theme={this.props.theme}
        renderAllMonths={this.props.renderAllMonths}
        showWeekdays={this.props.showWeekdays}
        showMonthTitle={this.props.showMonthTitle}
        locale={this.props.locale}
        dayNames={this.props.dayNames}
        height={this.props.monthHeight}
        firstDayMonday={this.props.firstDayMonday}
        renderDayContent={this.props.renderDayContent}
        markedDays={this.props.markedDays}
        minDate={this.props.minDate}
        maxDate={this.props.maxDate}
        startDate={this.state.startDate}
        endDate={this.state.endDate}
        disableRange={this.props.disableRange}
        disabledDays={this.props.disabledDays}
        disableOffsetDays={this.props.disableOffsetDays}
        firstViewableIndex={this.state.firstViewableIndex}
        lastViewableIndex={this.state.lastViewableIndex}
        viewableRangeOffset={this.props.viewableRangeOffset!}
      />
    );
  };

  render() {
    const { numberOfMonths, initialListSize } = this.props;
    const isWeb = Platform.OS === 'web';
    const initialNumToRender = isWeb ? numberOfMonths : initialListSize;

    return (
      <FlatList
        getItemLayout={!isWeb ? this.getItemLayout : undefined}
        initialScrollIndex={!isWeb ? this.state.initialScrollIndex : 0}
        viewabilityConfig={VIEWABILITY_CONFIG}
        removeClippedSubviews
        onViewableItemsChanged={this.handleViewableItemsChange}
        initialNumToRender={initialNumToRender}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderMonth}
        extraData={{
          ...this.state,
          minDate: this.props.minDate,
          maxDate: this.props.maxDate,
        }}
        data={this.state.months}
        ref={this.setReference}
      />
    );
  }
}
