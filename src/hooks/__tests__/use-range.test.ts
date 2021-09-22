import { renderHook } from '@testing-library/react-hooks';
import moment from 'moment';

import useRange from '../use-range';

describe('useRange', () => {
  it('should return no range', () => {
    const numberOfMonths = 10;
    const firstMonthToRender = new Date();
    const { result } = renderHook(() =>
      useRange({ firstMonthToRender, numberOfMonths })
    );

    expect(result.current.start).toBeUndefined();
    expect(result.current.end).toBeUndefined();
  });

  it('should return defined range between numberOfMonths', () => {
    const numberOfMonths = 10;
    const firstMonthToRender = new Date();
    const startDate = moment().add(1, 'day').toDate();
    const endDate = moment().add(10, 'day').toDate();
    const { result } = renderHook(() =>
      useRange({ firstMonthToRender, numberOfMonths, startDate, endDate })
    );

    expect(result.current.start).toBeDefined();
    expect(result.current.end).toBeDefined();
  });

  it('should return no range for start/end date out of month range', () => {
    const numberOfMonths = 2;
    const firstMonthToRender = new Date();
    const startDate = moment().add(3, 'month').toDate();
    const endDate = moment().add(4, 'month').toDate();

    const { result } = renderHook(() =>
      useRange({ firstMonthToRender, numberOfMonths, startDate, endDate })
    );

    expect(result.current.start).toBeUndefined();
    expect(result.current.end).toBeUndefined();
  });
});
