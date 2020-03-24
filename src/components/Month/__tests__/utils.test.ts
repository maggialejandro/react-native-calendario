import { isMonthDrawn } from '../utils';

describe('Month/utils', () => {
  it('should expect a month to be drawn', () => {
    const year = 2020;
    const month = 2;
    const start = new Date(year, month, 1);
    const end = new Date(year, month + 1, 1);

    expect(isMonthDrawn(year, month, start, end)).toBe(true);
    end.setMonth(month);
    expect(isMonthDrawn(year, month, start, end)).toBe(true);
    end.setMonth(month + 1);
    end.setDate(0);
    expect(isMonthDrawn(year, month, start, end)).toBe(true);
    start.setMonth(month + 1);
    end.setMonth(month + 1);
    expect(isMonthDrawn(year, month, start, end)).toBe(false);
    expect(isMonthDrawn(year, month, start, undefined)).toBe(false);
    start.setMonth(month);
    expect(isMonthDrawn(year, month, start, undefined)).toBe(true);
    start.setFullYear(2021);
    expect(isMonthDrawn(year, month, start, undefined)).toBe(false);
    expect(isMonthDrawn(year, month, undefined, undefined)).toBe(false);
  });
});
