const universalisBase = 'https://universalis.com/africa.kenya';
const calendarLength = 14;

type Env = {
  ASSETS: { fetch(request: Request): Promise<Response> };
};

type CalendarDay = {
  calendarDate: string;
  date: string;
  dayHtml: string;
};

function addDays(date: string, days: number): string {
  const shifted = new Date(Date.UTC(Number(date.slice(0, 4)), Number(date.slice(4, 6)) - 1, Number(date.slice(6, 8)) + days));
  return [shifted.getUTCFullYear(), String(shifted.getUTCMonth() + 1).padStart(2, '0'), String(shifted.getUTCDate()).padStart(2, '0')].join('');
}

export function parseUniversalisCalendarDay(script: string, requestedDate: string): CalendarDay {
  const number = script.match(/"number"\s*:\s*(\d{8})/)?.[1];
  const date = script.match(/"date"\s*:\s*("(?:\\.|[^"\\])*")/)?.[1];
  const day = script.match(/"day"\s*:\s*("(?:\\.|[^"\\])*")\s*,\s*"Mass_/)?.[1];
  if (number !== requestedDate || !date || !day) throw new Error('Invalid Universalis calendar response');
  return { calendarDate: requestedDate, date: JSON.parse(date) as string, dayHtml: JSON.parse(day) as string };
}

async function loadCalendarDay(date: string): Promise<CalendarDay> {
  const response = await fetch(`${universalisBase}/${date}/jsonpmass.js?callback=parishCalendar`, {
    signal: AbortSignal.timeout(10000),
    cf: { cacheEverything: true, cacheTtl: 864000 },
  } as RequestInit & { cf: { cacheEverything: boolean; cacheTtl: number } });
  if (!response.ok) throw new Error(`Universalis returned ${response.status}`);
  return parseUniversalisCalendarDay(await response.text(), date);
}

async function calendarResponse(url: URL): Promise<Response> {
  const start = url.searchParams.get('start') ?? '';
  if (!/^\d{8}$/.test(start)) return Response.json({ error: 'Use a YYYYMMDD start date.' }, { status: 400 });
  const settled = await Promise.allSettled(Array.from({ length: calendarLength }, (_, index) => loadCalendarDay(addDays(start, index))));
  const days = settled.flatMap((result) => result.status === 'fulfilled' ? [result.value] : []);
  if (!days.length) return Response.json({ error: 'Calendar source unavailable.' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  return Response.json(
    { days, attribution: 'Calendar data © Universalis Publishing Limited.' },
    { headers: { 'Cache-Control': days.length === calendarLength ? 'public, max-age=3600, stale-while-revalidate=86400' : 'public, max-age=300' } },
  );
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === '/api/liturgical-calendar') return calendarResponse(url);
    return env.ASSETS.fetch(request);
  },
};
