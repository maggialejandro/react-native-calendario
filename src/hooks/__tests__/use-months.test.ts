import { renderHook } from '@testing-library/react-hooks';
import useMonths from '../use-months';
import moment from 'moment';
import { DATE_FORMAT } from '../../utils/date';

describe('useMonths', () => {
  it('should return correct starting month', () => {
    const startingMonth = '2020-02-02';
    const numberOfMonths = 10;
    const { result } = renderHook(() =>
      useMonths({ startingMonth, numberOfMonths })
    );

    expect(result.current.firstMonth).toBe(startingMonth);
    expect(result.current.months.length).toBe(10);
  });

  it('should return default starting month', () => {
    const numberOfMonths = 12;
    const startingMonth = '2020-02-44';
    const { result } = renderHook(() =>
      useMonths({ startingMonth, numberOfMonths })
    );

    expect(result.current.firstMonth).toBe(
      moment().startOf('month').format(DATE_FORMAT)
    );
    expect(result.current.months.length).toBe(12);
  });
});
