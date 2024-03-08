import { renderHook } from '@testing-library/react-hooks';
import moment from 'moment';

import useRange from '../use-range';
import { DATE_FORMAT } from '../../utils/date';

describe('useRange', () => {
  it('should return no range', () => {
    const numberOfMonths = 10;
    const firstMonthToRender = new Date()
      .toISOString()
      .split('T')
      .shift() as string;
    const { result } = renderHook(() =>
      useRange({ firstMonthToRender, numberOfMonths })
    );

    expect(result.current.start).toBeUndefined();
    expect(result.current.end).toBeUndefined();
  });

  it('should return defined range between numberOfMonths', () => {
    const numberOfMonths = 10;
    const firstMonthToRender = '2019-01-01';
    const startDate = moment(firstMonthToRender)
      .add(1, 'day')
      .format(DATE_FORMAT);
    const endDate = moment(firstMonthToRender)
      .add(10, 'day')
      .format(DATE_FORMAT);
    const { result } = renderHook(() =>
      useRange({ firstMonthToRender, numberOfMonths, startDate, endDate })
    );

    expect(result.current.start).toBeDefined();
    expect(result.current.end).toBeDefined();
  });

  it('should return no range for start/end date out of month range', () => {
    const numberOfMonths = 2;
    const firstMonthToRender = new Date()
      .toISOString()
      .split('T')
      .shift() as string;
    const startDate = moment().add(3, 'month').format(DATE_FORMAT);
    const endDate = moment().add(4, 'month').format(DATE_FORMAT);

    const { result } = renderHook(() =>
      useRange({ firstMonthToRender, numberOfMonths, startDate, endDate })
    );

    expect(result.current.start).toBeUndefined();
    expect(result.current.end).toBeUndefined();
  });
});
