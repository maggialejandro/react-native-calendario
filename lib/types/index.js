// @flow
import { StyleSheet } from 'react-native';

export type DayType = {
  id: string,
  date: Date,
  isActive: boolean,
  isMonthDate: boolean,
  isStartDate: boolean,
  isEndDate: boolean,
  isVisible: boolean
};

export type MonthNumberType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export type MonthType = {
  id: number,
  name: string,
  monthNumber: MonthNumberType,
  year: number,
  days: Array<DayType>,
  isVisible: boolean,
  startDate?: ?Date,
  endDate?: ?Date
};

export type ViewTokenType = {
  item: any,
  key: string,
  index: ?number,
  isViewable: boolean,
  section?: any
};

export type ThemeType = {
  activeDayColor?: string,
  dayStyle?: StyleSheet.Style,
  monthTitleStyle?: StyleSheet.Style,
  emptyMonthContainerStyle?: StyleSheet.Style,
  emptyMonthTextStyle?: StyleSheet.Style,
  weekColumnsContainerStyle?: StyleSheet.Style,
  weekColumnStyle?: StyleSheet.Style,
  weekColumnTextStyle?: StyleSheet.Style,
  nonTouchableDayContainerStyle?: StyleSheet.Style,
  nonTouchableDayTextStyle?: StyleSheet.Style,
  dayContainerStyle?: StyleSheet.Style,
  dayTextStyle?: StyleSheet.Style,
  activeDayContainerStyle?: StyleSheet.Style,
  activeDayTextStyle?: StyleSheet.Style
};

export type LocaleType = 'es' | 'en' | 'fr';
