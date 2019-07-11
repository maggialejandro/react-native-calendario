// @flow
import type {
  ViewStyleProp,
  TextStyleProp,
} from 'react-native/Libraries/StyleSheet/StyleSheet';
import type { ViewToken } from 'react-native/Libraries/Lists/ViewabilityHelper';

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

export type MonthType = {
  id: string,
  name: string,
  monthNumber: number,
  year: number,
  isVisible: boolean,
};

export type ViewableItemsType = {
  changed: Array<ViewToken>,
  viewableItems: Array<ViewToken>,
};

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
  todayContainerStyle: ViewStyleProp,
  todayTextStyle: TextStyleProp,
};

export type LocaleType = 'es' | 'en' | 'fr' | 'br';
