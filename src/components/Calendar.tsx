import React, {
  useCallback,
  useRef,
  useState,
  useMemo,
  useEffect,
  forwardRef,
  Ref,
} from 'react';
import { FlatList, LayoutChangeEvent, Platform } from 'react-native';
import moment from 'moment';

import Month from './Month';
import useMonths from '../hooks/use-months';
import useRange from '../hooks/use-range';
import { getMonthIndex } from '../utils/date';
import { CalendarProps, ViewableItemsType } from '../types';

const NUMBER_OF_MONTHS = 12;
const MONTH_HEIGHT = 370;
const INITIAL_LIST_SIZE = 2;
const VIEWABLE_RANGE_OFFSET = 5;

const VIEWABILITY_CONFIG = {
  waitForInteraction: true,
  itemVisiblePercentThreshold: 10,
  minimumViewTime: 32,
};

const Calendario = forwardRef((props: CalendarProps, ref: Ref<FlatList>) => {
  const {
    numberOfMonths = NUMBER_OF_MONTHS,
    startingMonth = moment().format('YYYY-MM-DD'),
    initialListSize = INITIAL_LIST_SIZE,
    showWeekdays = true,
    showMonthTitle = true,
    theme = {},
    locale = 'en',
    disableRange = false,
    firstDayMonday = false,
    monthHeight = MONTH_HEIGHT,
    disableOffsetDays = false,
    viewableRangeOffset = VIEWABLE_RANGE_OFFSET,
    showsVerticalScrollIndicator,
    calculateMonthHeightDynamically,
    monthNames,
    onPress,
    dayNames,
    startDate,
    endDate,
  } = props;

  const [
    dynamicLayoutScrollHasHappened,
    setDynamicLayoutScrollHasHappened,
  ] = useState(false);
  const [listRendered, setListRendered] = useState(false);
  const [firstViewableIndex, setFirstViewableIndex] = useState(0);
  const [lastViewableIndex, setLastViewableIndex] = useState(
    INITIAL_LIST_SIZE + viewableRangeOffset!
  );

  const listReference = useRef<FlatList>(null);

  const { months, firstMonth: firstMonthToRender } = useMonths({
    numberOfMonths,
    startingMonth,
  });

  const { start: localStartDate, end: localEndDate } = useRange({
    startDate,
    endDate,
    firstMonthToRender,
    numberOfMonths,
  });

  const firstMonthIndex = useMemo(() => {
    if (localStartDate) {
      const monthIndex = getMonthIndex(
        firstMonthToRender,
        localStartDate,
        months,
        numberOfMonths
      );

      if (monthIndex !== null) {
        return monthIndex;
      }
    }

    return 0;
  }, [firstMonthToRender, localStartDate, months, numberOfMonths]);

  useEffect(() => {
    if (
      calculateMonthHeightDynamically &&
      !dynamicLayoutScrollHasHappened &&
      firstMonthIndex !== 0 &&
      listRendered
    ) {
      setTimeout(() => {
        if (listReference.current !== null) {
          setDynamicLayoutScrollHasHappened(true);
          listReference.current.scrollToIndex({
            index: firstMonthIndex,
            animated: true,
          });
        }
      }, 0);
    }
  }, [
    calculateMonthHeightDynamically,
    dynamicLayoutScrollHasHappened,
    firstMonthIndex,
    listRendered,
  ]);

  useEffect(() => {
    Calendar.layouts = [];
  }, [months]);

  const getItemLayout = useCallback(
    (
      _data: any,
      index: number
    ): { length: number; offset: number; index: number } => {
      if (calculateMonthHeightDynamically) {
        if (index === -1 || !Calendar.layouts[index]) {
          return { index, length: 0, offset: 0 };
        }

        const length = Calendar.layouts[index];
        const offset = Calendar.layouts
          .slice(0, index)
          .reduce((a, c) => a + c, 0);
        return { length, offset, index };
      }

      return {
        length: monthHeight,
        offset: monthHeight * index,
        index,
      };
    },
    [calculateMonthHeightDynamically, monthHeight]
  );

  const keyExtractor = useCallback(
    (_item: any, index: number): string => String(index),
    []
  );

  const onViewableItemsChanged = useCallback(
    (info: ViewableItemsType) => {
      if (props.viewableItemsChanged) {
        props.viewableItemsChanged(info);
      }

      if (props.renderAllMonths) {
        return;
      }

      const { viewableItems } = info;

      if (viewableItems.length > 0) {
        const {
          0: firstViewableItem,
          length: l,
          [l - 1]: lastViewableItem,
        } = viewableItems;

        if (
          firstViewableIndex !== firstViewableItem.index ||
          lastViewableIndex !== lastViewableItem.index
        ) {
          setFirstViewableIndex(firstViewableItem.index!);
          setLastViewableIndex(lastViewableItem.index! + VIEWABLE_RANGE_OFFSET);
        }
      }
    },
    [firstViewableIndex, lastViewableIndex, props]
  );

  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: VIEWABILITY_CONFIG,
      onViewableItemsChanged,
    },
  ]);

  const handleMonthLayout = useCallback(
    (index, e: LayoutChangeEvent) => {
      if (calculateMonthHeightDynamically && !Calendar.layouts[index]) {
        Calendar.layouts[index] = e.nativeEvent.layout.height;

        if (index === firstMonthIndex) {
          setListRendered(true);
        }
      }
    },
    [calculateMonthHeightDynamically, firstMonthIndex]
  );

  const handlePress = useCallback(
    (date: Date) => {
      if (onPress) {
        onPress(date);
      }
    },
    [onPress]
  );

  const renderMonth = useCallback(
    ({ index }: { index: number }) => {
      const month = moment(firstMonthToRender).add(index, 'months');

      return (
        <Month
          month={month.month()}
          year={month.year()}
          index={index}
          firstMonthToRender={firstMonthToRender}
          monthNames={monthNames}
          onPress={handlePress}
          theme={theme}
          renderAllMonths={props.renderAllMonths}
          showWeekdays={showWeekdays}
          showMonthTitle={showMonthTitle}
          locale={locale}
          dayNames={dayNames}
          height={monthHeight}
          firstDayMonday={firstDayMonday}
          calculateMonthHeightDynamically={calculateMonthHeightDynamically}
          renderDayContent={props.renderDayContent}
          markedDays={props.markedDays}
          minDate={props.minDate}
          maxDate={props.maxDate}
          startDate={localStartDate}
          endDate={localEndDate}
          disableRange={disableRange}
          disabledDays={props.disabledDays}
          disableOffsetDays={disableOffsetDays}
          firstViewableIndex={firstViewableIndex}
          lastViewableIndex={lastViewableIndex}
          viewableRangeOffset={viewableRangeOffset!}
          onMonthLayout={handleMonthLayout}
        />
      );
    },
    [
      calculateMonthHeightDynamically,
      dayNames,
      disableOffsetDays,
      disableRange,
      firstDayMonday,
      firstMonthToRender,
      firstViewableIndex,
      handleMonthLayout,
      handlePress,
      lastViewableIndex,
      localEndDate,
      localStartDate,
      locale,
      monthHeight,
      monthNames,
      props.disabledDays,
      props.markedDays,
      props.maxDate,
      props.minDate,
      props.renderAllMonths,
      props.renderDayContent,
      showMonthTitle,
      showWeekdays,
      theme,
      viewableRangeOffset,
    ]
  );

  const isWeb = Platform.OS === 'web';
  const initialNumToRender = isWeb ? numberOfMonths : initialListSize;

  return (
    <FlatList
      getItemLayout={!isWeb ? getItemLayout : undefined}
      initialScrollIndex={
        !isWeb && !calculateMonthHeightDynamically ? firstMonthIndex : 0
      }
      removeClippedSubviews
      initialNumToRender={
        calculateMonthHeightDynamically && firstMonthIndex !== 0
          ? months.length
          : initialNumToRender
      }
      keyExtractor={keyExtractor}
      viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      renderItem={renderMonth}
      data={months}
      ref={ref}
    />
  );
});

Calendario.displayName = 'Calendar';

const Calendar = Object.assign(Calendario, {
  layouts: [] as number[],
});

export { Calendario as Calendar };
