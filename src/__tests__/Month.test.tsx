/* @jest-environment jsdom */
import * as React from 'react';
import renderer from 'react-test-renderer';
import Month from '../components/Month';
import { LocaleType } from '../types';

const defaultProps = {
  index: 1,
  monthNames: [],
  dayNames: [],
  firstMonthToRender: new Date('2019-10-01'),
  theme: {},
  locale: 'en' as LocaleType,
  showWeekdays: true,
  showMonthTitle: true,
  firstDayMonday: true,
  height: 260,
  disableRange: false,
  extraData: {},
  firstViewableIndex: 4,
  lastViewableIndex: 6,
  viewableRangeOffset: 2,
};

describe('Month', () => {
  it('should render out of range content', () => {
    const onPressHandler = jest.fn((date) => date);
    const props = {
      ...defaultProps,
      onPress: onPressHandler,
    };
    const tree = renderer.create(<Month {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
