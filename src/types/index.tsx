/* eslint-disable flowtype/no-types-missing-file-annotation */
import { ComponentType, RefObject } from 'react';
import { FlatList, ViewStyle, TextStyle, ViewToken } from 'react-native';

export type RangeType = {
  endDate?: Date;
  startDate: Date;
};

export type LocaleType = 'es' | 'en' | 'fr' | 'br' |'zh';

export type ThemeType = {
  activeDayColor?: string;
  activeDayContainerStyle?: ViewStyle;
  activeDayTextStyle?: TextStyle;
  dayContainerStyle?: ViewStyle;
  dayOutOfRangeContainerStyle?: ViewStyle;
  dayOutOfRangeTextStyle?: TextStyle;
  dayTextStyle?: TextStyle;
  emptyMonthContainerStyle?: ViewStyle;
  emptyMonthTextStyle?: TextStyle;
  endDateContainerStyle?: ViewStyle;
  monthTitleTextStyle?: TextStyle;
  nonTouchableDayContainerStyle?: ViewStyle;
  nonTouchableDayTextStyle?: TextStyle;
  nonTouchableLastMonthDayTextStyle?: TextStyle;
  startDateContainerStyle?: ViewStyle;
  todayContainerStyle?: ViewStyle;
  todayTextStyle?: TextStyle;
  weekColumnsContainerStyle?: ViewStyle;
  weekColumnStyle?: ViewStyle;
  weekColumnTextStyle?: TextStyle;
};

export type DayType = {
  date: Date;
  id: string;
  isActive: boolean;
  isEndDate: boolean;
  isHidden: boolean;
  isMonthDate: boolean;
  isOutOfRange: boolean;
  isStartDate: boolean;
  isToday: boolean;
  isVisible: boolean;
};

export type ViewableItemsType = {
  changed: ViewToken[];
  viewableItems: ViewToken[];
};

export interface CalendarProps {
  calendarListRef?: (ref: RefObject<FlatList<any>>) => void;
  dayNames: string[];
  disabledDays?: { [key: string]: any };
  disableOffsetDays?: boolean;
  disableRange: boolean;
  startDate?: Date;
  endDate?: Date;
  extraData?: any;
  firstDayMonday: boolean;
  initialListSize?: number;
  locale: LocaleType;
  maxDate?: Date;
  minDate?: Date;
  monthHeight: number;
  monthNames: string[];
  numberOfMonths: number;
  onChange: (range: RangeType) => void;
  renderDayContent?: (day: DayType) => ComponentType;
  showMonthTitle: boolean;
  showWeekdays: boolean;
  startingMonth?: string;
  theme: ThemeType;
  viewableItemsChanged?: (viableItems: ViewableItemsType) => void;
  viewableRangeOffset?: number;
}
