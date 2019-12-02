/* @jest-environment jsdom */
import * as React from 'react';
import { shallow } from 'enzyme';
import Day from '../components/Day';

const defaultDay = {
  id: '1',
  date: new Date(),
  isToday: false,
  isActive: false,
  isMonthDate: true,
  isStartDate: false,
  isEndDate: false,
  isVisible: true,
  isOutOfRange: false,
};

describe('Day', () => {
  it('should render today', () => {
    const today = new Date();
    const props = {
      theme: {},
      onPress: () => {},
      item: {
        ...defaultDay,
        isToday: true,
      },
    };

    const wrapper = shallow(<Day {...props} />);
    const text = wrapper.find('Text').first();
    expect(text.prop('children')).toBe(today.getDate());
  });

  it('should change from disabled to enabled', () => {
    const onPressHandler = jest.fn();
    const props = {
      theme: {},
      onPress: onPressHandler,
      item: {
        ...defaultDay,
        isVisible: false,
      },
    };

    const wrapper = shallow(<Day {...props} />);
    wrapper.simulate('press');
    expect(onPressHandler).not.toHaveBeenCalled();

    wrapper.setProps({ item: { ...props.item, isVisible: true } });
    wrapper.simulate('press');
    expect(onPressHandler).toHaveBeenCalled();
  });

  it('should return a date', () => {
    const onPressHandler = jest.fn((date) => date);
    const props = {
      theme: {},
      onPress: onPressHandler,
      item: {
        ...defaultDay,
      },
    };

    const wrapper = shallow(<Day {...props} />);
    wrapper.simulate('press');
    expect(onPressHandler).toHaveReturnedWith(props.item.date);
  });
});
