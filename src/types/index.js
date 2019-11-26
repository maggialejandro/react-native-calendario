/* @flow */

import * as React from 'react';
import { FlatList } from 'react-native';
import type {
  ViewStyleProp,
  TextStyleProp,
} from 'react-native/Libraries/StyleSheet/StyleSheet';
import type { ViewToken } from 'react-native/Libraries/Lists/ViewabilityHelper';

type RangeType = {
  startDate: Date,
  endDate?: ?Date,
};

export type LocaleType = 'es' | 'en' | 'fr' | 'br';

export type ThemeType = {
  activeDayColor?: string,
  monthTitleTextStyle?: TextStyleProp,
  emptyMonthContainerStyle?: ViewStyleProp,
  emptyMonthTextStyle?: TextStyleProp,
  weekColumnsContainerStyle?: ViewStyleProp,
  weekColumnStyle?: ViewStyleProp,
  weekColumnTextStyle?: TextStyleProp,
  nonTouchableDayContainerStyle?: ViewStyleProp,
  nonTouchableDayTextStyle?: TextStyleProp,
  startDateContainerStyle?: ViewStyleProp,
  endDateContainerStyle?: ViewStyleProp,
  dayContainerStyle?: ViewStyleProp,
  dayTextStyle?: TextStyleProp,
  dayOutOfRangeTextStyle?: TextStyleProp,
  dayOutOfRangeContainerStyle?: ViewStyleProp,
  activeDayContainerStyle?: ViewStyleProp,
  activeDayTextStyle?: TextStyleProp,
  nonTouchableLastMonthDayTextStyle?: TextStyleProp,
  todayContainerStyle?: ViewStyleProp,
  todayTextStyle?: TextStyleProp,
};

export type DayType = {
  id: string,
  date: Date,
  isToday: boolean,
  isActive: boolean,
  isMonthDate: boolean,
  isStartDate: boolean,
  isEndDate: boolean,
  isVisible: boolean,
  isOutOfRange: boolean,
};

export type ViewableItemsType = {
  changed: ViewToken[],
  viewableItems: ViewToken[],
};

export type CalendarType = {
  onChange: (range: RangeType) => void,
  initialListSize?: number,
  numberOfMonths: number,
  startingMonth?: string,
  minDate?: string,
  maxDate?: string,
  startDate?: string,
  endDate?: string,
  theme: ThemeType,
  showWeekdays: boolean,
  showMonthTitle: boolean,
  locale: LocaleType,
  monthNames: string[],
  dayNames: string[],
  disableRange: boolean,
  monthHeight: number,
  firstDayMonday: boolean,
  renderDayContent?: (DayType) => React.Node,
  extraData?: any,
  viewableItemsChanged?: (ViewableItemsType) => void,
  calendarListRef?: (ref: React.ElementRef<typeof FlatList>) => void,
  disabledDays: { [key: string]: any },
  disableOffsetDays: boolean,
};

export type MonthType = {
  id: string,
  name: string,
  monthNumber: number,
  year: number,
  isVisible: boolean,
};
