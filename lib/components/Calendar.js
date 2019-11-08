/* @flow */
import * as React from 'react';
import { FlatList } from 'react-native';
import moment from 'moment';

import Month from './Month';
import { getMonthsList, viewableItemsChanged } from '../utils';
import { isValidDate } from '../utils/date';
import type {
  CalendarType,
  MonthType,
  ViewableItemsType,
  ThemeType,
  LocaleType,
  DayType,
} from '../types';

type StateType = {
  months: Array<MonthType>,
  initialListSize: number,
  firstViewableIndex: number,
  lastViewableIndex: number,
  initialScrollIndex: number,
  startDate: ?Date,
  endDate: ?Date,
};

const NUMBER_OF_MONTHS = 12;
const MONTH_HEIGHT = 370;

const DIFF_VISIBLE = 1;

const VIEWABILITY_CONFIG = {
  waitForInteraction: true,
  itemVisiblePercentThreshold: 10,
  minimumViewTime: 300,
};

function visibleMonthsChanged(
  oldMonths: Array<MonthType>,
  newMonths: Array<MonthType>,
): boolean {
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
    startingMonth: moment().format('YYYY-MM-DD'),
    initialListSize: 2,
    showWeekdays: true,
    showMonthTitle: true,
    theme: {},
    locale: 'en',
    monthNames: [],
    dayNames: [],
    disableRange: false,
    firstDayMonday: false,
    monthHeight: MONTH_HEIGHT,
  };

  listReference: React.ElementRef<typeof FlatList>;

  state = {
    months: [],
    initialListSize: 2,
    firstViewableIndex: 0,
    lastViewableIndex: 0,
    initialScrollIndex: 0,
    startDate: null,
    endDate: null,
  };

  componentWillMount() {
    const {
      initialListSize,
      numberOfMonths,
      startingMonth,
      startDate,
      endDate,
      locale,
      monthNames,
    } = this.props;

    const firstMonthToRender =
      startingMonth && isValidDate(new Date(startingMonth))
        ? moment(startingMonth, 'YYYY-MM-DD').toDate()
        : moment().toDate();

    let start =
      startDate && isValidDate(new Date(startDate))
        ? moment(startDate, 'YYYY-MM-DD').toDate()
        : null;
    const end =
      endDate && isValidDate(new Date(endDate))
        ? moment(endDate, 'YYYY-MM-DD').toDate()
        : null;

    start =
      moment(firstMonthToRender)
        .add(numberOfMonths, 'months')
        .toDate() < start
        ? null
        : start;

    const months: Array<MonthType> = getMonthsList(
      firstMonthToRender,
      numberOfMonths,
      initialListSize + DIFF_VISIBLE,
      start,
      locale,
      monthNames,
    );

    let firstMonthIndex = 0;
    if (start) {
      const firstMonth = months.find(
        (m: MonthType): boolean =>
          !!start &&
          m.monthNumber === start.getMonth() &&
          m.year === start.getFullYear(),
      );

      firstMonthIndex = months.indexOf(firstMonth) || 0;
    }

    this.setState({
      initialScrollIndex: firstMonthIndex,
      initialListSize,
      months,
      startDate: start,
      endDate: end,
    });
  }

  componentWillReceiveProps(nextProps: CalendarType) {
    const { startDate } = this.state;
    const nextStartDate =
      nextProps.startDate && isValidDate(new Date(nextProps.startDate))
        ? moment(nextProps.startDate, 'YYYY-MM-DD').toDate()
        : null;
    const endDate =
      nextProps.endDate && isValidDate(new Date(nextProps.endDate))
        ? moment(nextProps.endDate, 'YYYY-MM-DD').toDate()
        : null;

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
            const { months } = this.state;
            const index = months.findIndex(
              (m: MonthType): boolean =>
                m.monthNumber === nextStartDate.getMonth() &&
                m.year === nextStartDate.getFullYear(),
            );

            if (index !== -1) {
              const nextVisibleMonths = months.map(
                (month: MonthType, i: number) => ({
                  ...month,
                  isVisible:
                    i + DIFF_VISIBLE >= index || i - DIFF_VISIBLE <= index,
                }),
              );

              this.listReference.scrollToIndex({
                index,
              });
              this.setState({
                months: nextVisibleMonths,
              });
            }
          }
        },
      );
    }
  }

  shouldComponentUpdate(
    nextProps: CalendarType,
    nextState: StateType,
  ): boolean {
    return (
      this.state.months.length !== nextState.months.length ||
      visibleMonthsChanged(this.state.months, nextState.months) ||
      this.state.startDate !== nextState.startDate ||
      this.state.endDate !== nextState.endDate ||
      this.props.minDate !== nextProps.minDate ||
      this.props.maxDate !== nextProps.maxDate ||
      this.props.renderDayContent !== nextProps.renderDayContent
    );
  }

  getItemLayout = (
    data: any,
    index: number,
  ): { length: number, offset: number, index: number } => ({
    length: this.props.monthHeight,
    offset: this.props.monthHeight * index,
    index,
  });

  keyExtractor = (item: MonthType): string => String(item.id);

  handleViewableItemsChange = (info: ViewableItemsType) => {
    let { firstViewableIndex, lastViewableIndex } = this.state;
    if (viewableItemsChanged(firstViewableIndex, lastViewableIndex, info)) {
      if (this.props.viewableItemsChanged) {
        this.props.viewableItemsChanged(info);
      }

      const firstItemVisible = info.viewableItems[0];
      const lastVisibleItem = info.viewableItems[info.viewableItems.length - 1];
      firstViewableIndex =
        firstItemVisible && typeof firstItemVisible.index === 'number'
          ? firstItemVisible.index
          : 0;
      lastViewableIndex =
        lastVisibleItem && typeof lastVisibleItem.index === 'number'
          ? lastVisibleItem.index
          : this.state.lastViewableIndex;

      this.setState((state) => {
        const months = state.months.map((month: MonthType, i: number) => {
          const isVisible =
            i >= firstViewableIndex - DIFF_VISIBLE &&
            i <= lastViewableIndex + DIFF_VISIBLE + 1;

          return {
            ...month,
            isVisible,
          };
        });

        return {
          firstViewableIndex,
          lastViewableIndex,
          months,
        };
      });
    }
  };

  handlePressDay = (date: Date) => {
    const newRange = {};

    if (this.props.disableRange) {
      newRange.startDate = date;
      newRange.endDate = date;
    } else if (this.state.startDate) {
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

    this.setState(
      {
        ...newRange,
      },
      () => this.props.onChange(newRange),
    );
  };

  listRef = (ref: React.ElementRef<typeof FlatList> | null) => {
    if (ref) {
      this.listReference = ref;
      if (this.props.calendarListRef) {
        this.props.calendarListRef(ref);
      }
    }
  };

  renderMonth = ({ item }: { item: MonthType }) => (
    <Month
      onPress={this.handlePressDay}
      month={item}
      theme={this.props.theme}
      showWeekdays={this.props.showWeekdays}
      showMonthTitle={this.props.showMonthTitle}
      locale={this.props.locale}
      dayNames={this.props.dayNames}
      height={this.props.monthHeight}
      firstDayMonday={this.props.firstDayMonday}
      renderDayContent={this.props.renderDayContent}
      minDate={this.props.minDate}
      maxDate={this.props.maxDate}
      startDate={this.state.startDate}
      endDate={this.state.endDate}
      disableRange={this.props.disableRange}
      extraData={this.props.extraData}
      disabledDays={this.props.disabledDays}
    />
  );

  render() {
    return (
      <FlatList
        getItemLayout={this.getItemLayout}
        initialScrollIndex={this.state.initialScrollIndex}
        viewabilityConfig={VIEWABILITY_CONFIG}
        removeClippedSubviews
        onViewableItemsChanged={this.handleViewableItemsChange}
        initialNumToRender={this.state.initialListSize}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderMonth}
        extraData={this.props.extraData || this.state}
        data={this.state.months}
        ref={this.listRef}
      />
    );
  }
}
