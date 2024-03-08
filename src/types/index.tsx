import { ReactElement, RefObject } from 'react';
import {
  FlatList,
  ViewStyle,
  TextStyle,
  ViewToken,
  StyleProp,
} from 'react-native';
import {
  MarkedDays,
  ThemeType as MonthThemeType,
  DateString,
} from 'react-native-month';

export type LocaleType = 'es' | 'en' | 'fr' | 'br' | 'zh' | 'ru';

export interface ThemeType extends MonthThemeType {
  emptyMonthContainerStyle?: ViewStyle;
  emptyMonthTextStyle?: TextStyle;
  monthTitleTextStyle?: TextStyle;
}

// TODO: import from react-native-month
export type DayType = {
  date: DateString;
  id: string;
  key: string;
  isActive: boolean;
  isEndDate: boolean;
  isHidden: boolean;
  isMonthDate: boolean;
  isOutOfRange: boolean;
  isStartDate: boolean;
  isToday: boolean;
  isWeekend: boolean;
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
   * Selected start date
   *
   * @type {string} format: YYYY-MM-DD
   * @memberof CalendarProps
   */
  startDate?: DateString;

  /**
   * Selected end date
   *
   * @type {string} format: YYYY-MM-DD
   * @memberof CalendarProps
   */
  endDate?: DateString;

  /**
   * Minimum date that can be selected.
   *
   * @type {string} format: YYYY-MM-DD
   * @memberof CalendarProps
   */
  minDate?: DateString;

  /**
   * Maximum date that can be selected.
   *
   * @type {string} format: YYYY-MM-DD
   * @memberof CalendarProps
   */
  maxDate?: DateString;

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
  firstDayMonday?: boolean;

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
  onPress: (date: DateString) => void;

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
   * Show FlatList's vertical scroll indicator
   *
   * @type {boolean}
   * @memberof CalendarProps
   */
  showsVerticalScrollIndicator?: boolean;

  /**
   * First month to render
   *
   * @type {string} format: YYYY-MM-DD
   * @memberof CalendarProps
   */
  startingMonth?: DateString;

  /**
   * On Web FlatList's onViewableItemsChanged is not trigger, use this prop to render all months.
   *
   * @type {boolean}
   * @memberof CalendarProps
   */
  renderAllMonths?: boolean;

  /**
   * Calculate Month's height dynamically.
   * Use this if you won't render too many months as this affects the performance
   * This is an experimental feature
   *
   * @type {boolean}
   * @default false
   * @memberof CalendarProps
   */
  calculateMonthHeightDynamically?: boolean;

  contentContainerStyle?: StyleProp<ViewStyle>;
  theme?: ThemeType;
  viewableItemsChanged?: (viableItems: ViewableItemsType) => void;
  viewableRangeOffset?: number;
  /**
   * Initial scroll index for the FlatList
   * Use this if you want to start the calendar at a specific month's index
   *
   * - if this is passed, instead of starting the calendar at the month that contains the `startDate`, it will start at the month that has the index of initialScrollIndex
   * - good if `Calendar` is nested within another `VirtualizedList` and you want to start the calendar at index 0
   *
   * @type {number}
   * @default undefined
   */
  initialScrollIndex?: number;
}
