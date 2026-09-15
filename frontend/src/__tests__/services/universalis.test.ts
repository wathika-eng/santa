import { describe, expect, it } from 'vitest';
import { kenyaDate, parseDailyMass } from '../../services/universalis';

const sample = {
  number: 20260914,
  date: 'Monday 14 September 2026',
  day: '<b>The Exaltation of the Holy Cross</b> - Feast',
  Mass_R1: { heading: 'The bronze serpent', source: 'Numbers 21:4&#x2010;9', text: '<div>First paragraph.</div><div>Second paragraph.</div>' },
  Mass_Ps: { source: 'Psalm 77(78)', text: '<div>Give heed, my people.</div>' },
  Mass_G: { heading: 'God sent his Son', source: 'John 3:13&#x2010;17', text: '<div>God loved the world.</div>' },
  copyright: { text: '<span>Copyright &#xa9; 2026 Universalis Publishing Limited. All rights reserved.</span>' },
};

describe('Universalis Kenya Mass feed', () => {
  it('uses the Kenya date even when the visitor is in another time zone', () => {
    expect(kenyaDate(new Date('2026-09-13T22:30:00Z'))).toBe('20260914');
  });

  it('decodes feed HTML into plain text and retains the full source notice', () => {
    const mass = parseDailyMass(sample, '20260914');
    expect(mass.day).toBe('The Exaltation of the Holy Cross - Feast');
    expect(mass.readings.map((reading) => reading.label)).toEqual(['First reading', 'Psalm', 'Gospel']);
    expect(mass.readings[0].source).toBe('Numbers 21:4‐9');
    expect(mass.readings[0].text).toBe('First paragraph.\nSecond paragraph.');
    expect(mass.copyright).toBe('Copyright © 2026 Universalis Publishing Limited. All rights reserved.');
  });

  it('rejects a response without the copyright notice or for a different day', () => {
    expect(() => parseDailyMass({ ...sample, copyright: undefined }, '20260914')).toThrow('copyright');
    expect(() => parseDailyMass(sample, '20260915')).toThrow('different day');
  });
});
