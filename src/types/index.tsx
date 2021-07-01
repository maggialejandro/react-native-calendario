import { ComponentType, RefObject } from 'react';
import { FlatList, ViewStyle, TextStyle, ViewToken } from 'react-native';
import { MarkedDays, ThemeType as MonthThemeType } from 'react-native-month';

export type RangeType = {
  endDate?: Date;
  startDate: Date;
};

export type LocaleType = 'es' | 'en' | 'fr' | 'br' | 'zh';

export interface ThemeType extends MonthThemeType {
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
}

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
  endDate?: Date;
  extraData?: any;
  firstDayMonday: boolean;
  initialListSize?: number;
  locale: LocaleType;
  markedDays?: MarkedDays;
  maxDate?: Date;
  minDate?: Date;
  monthHeight: number;
  monthNames: string[];
  numberOfMonths: number;
  onChange: (range: RangeType) => void;
  renderDayContent?: (day: DayType) => ComponentType;
  showMonthTitle: boolean;
  showWeekdays: boolean;
  startDate?: Date;
  startingMonth?: string;

  /**
   * On Web FlatList's onViewableItemsChanged is not trigger, use this prop to render all months.
   *
   * @type {boolean}
   * @memberof CalendarProps
   */
  renderAllMonths?: boolean;
  theme: ThemeType;
  viewableItemsChanged?: (viableItems: ViewableItemsType) => void;
  viewableRangeOffset?: number;
}
