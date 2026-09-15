/** Universalis's published JSONP feed for the Kenya Catholic calendar. */
export const UNIVERSALIS_CALENDAR_URL = 'https://universalis.com/africa.kenya';

export type Reading = {
  label: 'First reading' | 'Psalm' | 'Second reading' | 'Gospel';
  heading: string;
  source: string;
  text: string;
};

export type DailyMass = {
  calendarDate: string;
  date: string;
  day: string;
  readings: Reading[];
  copyright: string;
};

type FeedReading = { heading?: unknown; source?: unknown; text?: unknown };
type FeedPayload = {
  number?: unknown;
  date?: unknown;
  day?: unknown;
  Mass_R1?: FeedReading;
  Mass_Ps?: FeedReading;
  Mass_R2?: FeedReading;
  Mass_G?: FeedReading;
  copyright?: { text?: unknown };
};

function textFromHtml(value: unknown): string {
  if (typeof value !== 'string') return '';
  const document = new DOMParser().parseFromString(value, 'text/html');
  document.body.querySelectorAll('br').forEach((element) => element.replaceWith(document.createTextNode('\n')));
  document.body.querySelectorAll('div, p, li').forEach((element) => {
    element.before(document.createTextNode('\n'));
    element.after(document.createTextNode('\n'));
  });
  return (document.body.textContent ?? '')
    .replace(/\u00a0/g, ' ')
    .replace(/[ \t]+/g, ' ')
    .replace(/ *\n */g, '\n')
    .replace(/\n{2,}/g, '\n')
    .trim();
}

export function kenyaDate(now = new Date()): string {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Africa/Nairobi', year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(now);
  const part = (type: Intl.DateTimeFormatPartTypes) => parts.find((item) => item.type === type)?.value ?? '';
  return `${part('year')}${part('month')}${part('day')}`;
}

export function isoDate(date: string): string {
  return `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`;
}

export function addCalendarDays(date: string, days: number): string {
  const year = Number(date.slice(0, 4));
  const month = Number(date.slice(4, 6));
  const day = Number(date.slice(6, 8));
  const shifted = new Date(Date.UTC(year, month - 1, day + days));
  return [shifted.getUTCFullYear(), String(shifted.getUTCMonth() + 1).padStart(2, '0'), String(shifted.getUTCDate()).padStart(2, '0')].join('');
}

export function liturgicalWeekDates(startDate: string): string[] {
  return Array.from({ length: 7 }, (_, index) => addCalendarDays(startDate, index));
}

export function massPageUrl(date: string): string {
  return `${UNIVERSALIS_CALENDAR_URL}/${date}/mass.htm`;
}

export function parseDailyMass(value: unknown, requestedDate: string): DailyMass {
  if (!value || typeof value !== 'object') throw new Error('Invalid Universalis response');
  const feed = value as FeedPayload;
  if (feed.number !== Number(requestedDate)) throw new Error('Universalis returned a different day');

  const copyright = textFromHtml(feed.copyright?.text);
  if (!copyright) throw new Error('Universalis copyright notice is missing');

  const readings: Reading[] = [];
  const fields: Array<[Reading['label'], FeedReading | undefined]> = [
    ['First reading', feed.Mass_R1],
    ['Psalm', feed.Mass_Ps],
    ['Second reading', feed.Mass_R2],
    ['Gospel', feed.Mass_G],
  ];
  for (const [label, field] of fields) {
    if (!field) continue;
    const text = textFromHtml(field.text);
    if (!text) continue;
    readings.push({ label, heading: textFromHtml(field.heading), source: textFromHtml(field.source), text });
  }
  if (!readings.some((reading) => reading.label === 'Gospel')) throw new Error('Universalis Gospel is missing');

  return {
    calendarDate: requestedDate,
    date: typeof feed.date === 'string' ? feed.date : '',
    day: textFromHtml(feed.day),
    readings,
    copyright,
  };
}

const dailyCache = new Map<string, DailyMass>();
const pendingLoads = new Map<string, Promise<DailyMass>>();

function requestDailyMass(date: string): Promise<DailyMass> {
  return new Promise((resolve, reject) => {
    const callbackName = `universalisParishCallback${date}`;
    const callbacks = window as unknown as Window & Record<string, unknown>;
    const script = document.createElement('script');
    let settled = false;
    const finish = (error?: Error, mass?: DailyMass) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      script.remove();
      delete callbacks[callbackName];
      if (error) reject(error);
      else if (mass) resolve(mass);
    };
    const timeout = window.setTimeout(() => finish(new Error('Universalis did not respond')), 15000);
    callbacks[callbackName] = (payload: unknown) => {
      try {
        finish(undefined, parseDailyMass(payload, date));
      } catch (error) {
        finish(error instanceof Error ? error : new Error('Invalid Universalis response'));
      }
    };
    script.src = `${UNIVERSALIS_CALENDAR_URL}/${date}/jsonpmass.js?callback=${callbackName}`;
    script.async = true;
    script.onerror = () => finish(new Error('Universalis could not be reached'));
    script.onload = () => finish(new Error('Universalis did not return readings'));
    document.head.append(script);
  });
}

export function loadDailyMass(date: string, signal?: AbortSignal): Promise<DailyMass> {
  if (signal?.aborted) return Promise.reject(new DOMException('Aborted', 'AbortError'));

  const cached = dailyCache.get(date);
  const request = cached
    ? Promise.resolve(cached)
    : pendingLoads.get(date) ?? requestDailyMass(date).then((mass) => {
      dailyCache.set(date, mass);
      if (dailyCache.size > 35) dailyCache.delete(dailyCache.keys().next().value ?? date);
      return mass;
    }).finally(() => pendingLoads.delete(date));

  if (!cached && !pendingLoads.has(date)) pendingLoads.set(date, request);
  if (!signal) return request;

  return new Promise((resolve, reject) => {
    const onAbort = () => reject(new DOMException('Aborted', 'AbortError'));
    signal.addEventListener('abort', onAbort, { once: true });
    request.then((mass) => {
      signal.removeEventListener('abort', onAbort);
      if (!signal.aborted) resolve(mass);
    }, (error: unknown) => {
      signal.removeEventListener('abort', onAbort);
      if (!signal.aborted) reject(error);
    });
  });
}
