import { renderHook } from '@testing-library/react-hooks';
import useMonths from '../use-months';

describe('useMonths', () => {
  it('should return correct starting month', () => {
    const startingMonth = '2020-02-02';
    const numberOfMonths = 10;
    const { result } = renderHook(() =>
      useMonths({ startingMonth, numberOfMonths })
    );

    expect(result.current.firstMonth.getMonth()).toBe(1);
    expect(result.current.months.length).toBe(10);
  });

  it('should return default starting month', () => {
    const numberOfMonths = 12;
    const { result } = renderHook(() => useMonths({ numberOfMonths }));

    expect(result.current.firstMonth.getMonth()).toBe(new Date().getMonth());
    expect(result.current.months.length).toBe(12);
  });
});
