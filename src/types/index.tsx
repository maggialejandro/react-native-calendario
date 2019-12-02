import { ComponentType, RefObject } from 'react';
import { FlatList, ViewStyle, TextStyle, ViewToken } from 'react-native';

type RangeType = {
  startDate: Date;
  endDate?: Date;
};

export type LocaleType = 'es' | 'en' | 'fr' | 'br';

export type ThemeType = {
  activeDayColor?: string;
  monthTitleTextStyle?: TextStyle;
  emptyMonthContainerStyle?: ViewStyle;
  emptyMonthTextStyle?: TextStyle;
  weekColumnsContainerStyle?: ViewStyle;
  weekColumnStyle?: ViewStyle;
  weekColumnTextStyle?: TextStyle;
  nonTouchableDayContainerStyle?: ViewStyle;
  nonTouchableDayTextStyle?: TextStyle;
  startDateContainerStyle?: ViewStyle;
  endDateContainerStyle?: ViewStyle;
  dayContainerStyle?: ViewStyle;
  dayTextStyle?: TextStyle;
  dayOutOfRangeTextStyle?: TextStyle;
  dayOutOfRangeContainerStyle?: ViewStyle;
  activeDayContainerStyle?: ViewStyle;
  activeDayTextStyle?: TextStyle;
  nonTouchableLastMonthDayTextStyle?: TextStyle;
  todayContainerStyle?: ViewStyle;
  todayTextStyle?: TextStyle;
};

export type DayType = {
  id: string;
  date: Date;
  isToday: boolean;
  isActive: boolean;
  isMonthDate: boolean;
  isStartDate: boolean;
  isEndDate: boolean;
  isVisible: boolean;
  isOutOfRange: boolean;
};

export type ViewableItemsType = {
  changed: ViewToken[];
  viewableItems: ViewToken[];
};

export type CalendarType = {
  onChange: (range: RangeType) => void;
  initialListSize?: number;
  numberOfMonths: number;
  startingMonth?: string;
  minDate?: string;
  maxDate?: string;
  startDate?: string;
  endDate?: string;
  theme: ThemeType;
  showWeekdays: boolean;
  showMonthTitle: boolean;
  locale: LocaleType;
  monthNames: string[];
  dayNames: string[];
  disableRange: boolean;
  monthHeight: number;
  firstDayMonday: boolean;
  renderDayContent?: (day: DayType) => ComponentType;
  extraData?: any;
  viewableItemsChanged?: (viableItems: ViewableItemsType) => void;
  calendarListRef?: (ref: RefObject<FlatList<MonthType>>) => void;
  disabledDays?: { [key: string]: any };
};

export type MonthType = {
  id: string;
  name: string;
  monthNumber: number;
  year: number;
  isVisible: boolean;
};
