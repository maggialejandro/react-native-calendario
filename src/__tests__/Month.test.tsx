/* @jest-environment jsdom */
import * as React from 'react';
import renderer from 'react-test-renderer';
import Month from '../components/Month';
import { LocaleType } from '../types';

const defaultMonth = {
  id: 'id',
  name: 'April',
  monthNumber: 3,
  year: 2019,
  isVisible: false,
};

const defaultProps = {
  month: defaultMonth,
  theme: {},
  locale: 'en' as LocaleType,
  showWeekdays: true,
  showMonthTitle: true,
  firstDayMonday: true,
  height: 260,
  disableRange: false,
  extraData: {},
};

describe('Month', () => {
  it('should render out of range content', () => {
    const onPressHandler = jest.fn((date) => date);
    const props = {
      ...defaultProps,
      dayNames: [],
      onPress: onPressHandler,
    };
    const tree = renderer.create(<Month {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
