import { describe, expect, it } from 'vitest';
import { parseUniversalisCalendarDay } from '../../../worker/index';

describe('calendar Worker parser', () => {
  it('extracts calendar metadata without evaluating the JSONP program', () => {
    const script = `parishCalendar({"number" : 20260915,"date" : "Tuesday 15 September 2026","day" : "<div><b>Our Lady of Sorrows</b></div>","Mass_R1" : {"text" : "compressed".split("x").join("y")}});`;
    expect(parseUniversalisCalendarDay(script, '20260915')).toEqual({
      calendarDate: '20260915',
      date: 'Tuesday 15 September 2026',
      dayHtml: '<div><b>Our Lady of Sorrows</b></div>',
    });
  });

  it('rejects a response for another date', () => {
    expect(() => parseUniversalisCalendarDay('{"number":20260916}', '20260915')).toThrow('Invalid Universalis');
  });
});
