import { ReactElement, RefObject } from 'react';
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
  /**
   * FlatList's ref
   *
   * @deprecated
   * @memberof CalendarProps
   */
  calendarListRef?: (ref: RefObject<FlatList<any>>) => void;

  /**
   * Array of names of the days of the week
   *
   * @type {string[]}
   * @memberof CalendarProps
   */
  dayNames?: string[];

  /**
   * Use this prop to disable individual days
   * key format: DD-MM-YYYY
   * value: truthy value
   *
   * @type {{ [key: string]: any }}
   * @memberof CalendarProps
   */
  disabledDays?: { [key: string]: any };

  /**
   * Hide days that do not belong to the month
   *
   * @type {boolean}
   * @default false
   * @memberof MonthProps
   */
  disableOffsetDays?: boolean;

  /**
   * Disable range selection
   *
   * @type {boolean}
   * @default false
   * @memberof MonthProps
   */
  disableRange?: boolean;

  /**
   * Selected end date
   *
   * @type {Date}
   * @memberof CalendarProps
   */
  endDate?: Date;

  /**
   * FlatList's extraData prop
   *
   * @type {*}
   * @deprecated
   * @memberof CalendarProps
   */
  extraData?: any;

  /**
   * Monday as first day of the week
   *
   * @type {boolean}
   * @default false
   * @memberof CalendarProps
   */
  firstDayMonday: boolean;

  /**
   * FlatList initialNumToRender
   *
   * @type {number}
   * @memberof CalendarProps
   */
  initialListSize?: number;

  /**
   * Calendar language
   *
   * @type {LocaleType}
   * @default en
   * @memberof CalendarProps
   */
  locale?: LocaleType;

  /**
   * Multi-dot support on Day component
   *
   * @type {MarkedDays}
   * @memberof CalendarProps
   */
  markedDays?: MarkedDays;

  /**
   * Maximum date that can be selected.
   *
   * @type {Date}
   * @memberof CalendarProps
   */
  maxDate?: Date;

  /**
   * Minimum date that can be selected.
   *
   * @type {Date}
   * @memberof CalendarProps
   */
  minDate?: Date;

  /**
   * Change Month row height
   *
   * @type {number}
   * @memberof CalendarProps
   */
  monthHeight: number;

  /**
   * Array of names of each month
   *
   * @type {string[]}
   * @memberof CalendarProps
   */
  monthNames?: string[];

  /**
   * Number of months to render
   *
   * @type {number}
   * @memberof CalendarProps
   */
  numberOfMonths: number;

  /**
   * Day pressed
   *
   * @memberof CalendarProps
   */
  onPress: (date: Date) => void;

  /**
   * Use onPress
   * @deprecated
   * @memberof CalendarProps
   */
  onChange?: (range: RangeType) => void;
  renderDayContent?: (day: DayType) => ReactElement;

  /**
   * Show Month title
   *
   * @type {boolean}
   * @memberof CalendarProps
   */
  showMonthTitle?: boolean;

  /**
   * Show Week columns
   *
   * @type {boolean}
   * @memberof CalendarProps
   */
  showWeekdays?: boolean;

  /**
   * Selected start date
   *
   * @type {Date}
   * @memberof CalendarProps
   */
  startDate?: Date;

  /**
   * First month to render
   *
   * @type {string}
   * @memberof CalendarProps
   */
  startingMonth?: string;

  /**
   * On Web FlatList's onViewableItemsChanged is not trigger, use this prop to render all months.
   *
   * @type {boolean}
   * @memberof CalendarProps
   */
  renderAllMonths?: boolean;
  theme?: ThemeType;
  viewableItemsChanged?: (viableItems: ViewableItemsType) => void;
  viewableRangeOffset?: number;
}
