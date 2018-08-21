// @flow
import type {
  ____ViewStyleProp_Internal as ViewStyle,
  ____TextStyleProp_Internal as TextStyle,
} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

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
  id: string,
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

export type ViewableItemsType = {
  changed: Array<ViewTokenType>,
  viewableItems: Array<ViewTokenType>
};

export type ThemeType = {
  activeDayColor?: string,
  monthTitleTextStyle?: TextStyle,
  emptyMonthContainerStyle?: ViewStyle,
  emptyMonthTextStyle?: TextStyle,
  weekColumnsContainerStyle?: ViewStyle,
  weekColumnStyle?: ViewStyle,
  weekColumnTextStyle?: TextStyle,
  nonTouchableDayContainerStyle?: ViewStyle,
  nonTouchableDayTextStyle?: TextStyle,
  dayContainerStyle?: ViewStyle,
  dayTextStyle?: TextStyle,
  activeDayContainerStyle?: ViewStyle,
  activeDayTextStyle?: TextStyle,
  nonTouchableLastMonthDayTextStyle?: TextStyle
};

export type LocaleType = 'es' | 'en' | 'fr';
