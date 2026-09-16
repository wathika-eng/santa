import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Search, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { addCalendarDays, isoDate, kenyaDate, loadLiturgicalCalendar, massPageUrl, type LiturgicalDay } from '../services/universalis';

const periodLength = 14;

function LiturgicalCalendar() {
  const { language } = useLanguage();
  const today = useMemo(() => kenyaDate(), []);
  const [startDate, setStartDate] = useState(today);
  const [query, setQuery] = useState('');
  const [days, setDays] = useState<LiturgicalDay[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const locale = language === 'sw' ? 'sw-KE' : 'en-KE';
  const minStart = addCalendarDays(today, -28);
  const maxStart = addCalendarDays(today, 14);

  useEffect(() => {
    const controller = new AbortController();
    setStatus('loading');
    loadLiturgicalCalendar(startDate, controller.signal)
      .then((items) => {
        setDays(items);
        setStatus('ready');
      })
      .catch((error: unknown) => {
        if (!(error instanceof DOMException && error.name === 'AbortError')) setStatus('error');
      });
    return () => controller.abort();
  }, [startDate]);

  const labels = language === 'sw'
    ? { title: 'Kalenda ya Kikatoliki', intro: 'Sikukuu na maadhimisho ya wiki mbili kulingana na kalenda ya Kanisa Katoliki nchini Kenya.', choose: 'Nenda kwenye tarehe', search: 'Tafuta sikukuu au maadhimisho', placeholder: 'Maria, Yosefu, mtakatifu…', today: 'Leo', previous: 'Wiki 2 zilizopita', next: 'Wiki 2 zijazo', loading: 'Kalenda inapakia…', error: 'Kalenda haipatikani kwa sasa. Tumia kiungo cha Universalis hapa chini.', source: 'Fungua kalenda kamili ya Kenya', details: 'Masomo na maelezo', todayTag: 'Leo', sundayTag: 'Jumapili', results: 'matokeo', noResults: 'Hakuna maadhimisho yanayolingana na utafutaji huu katika siku hizi 14.', clear: 'Futa utafutaji' }
    : { title: 'Catholic calendar', intro: 'Two weeks of feasts and celebrations from the Catholic Church calendar for Kenya.', choose: 'Jump to a date', search: 'Search feasts and celebrations', placeholder: 'Mary, Joseph, saint…', today: 'Today', previous: 'Previous 2 weeks', next: 'Next 2 weeks', loading: 'Loading the calendar…', error: 'The calendar is temporarily unavailable. Use the Universalis link below.', source: 'Open the full Kenya calendar', details: 'Readings and details', todayTag: 'Today', sundayTag: 'Sunday', results: 'results', noResults: 'No celebration in these 14 days matches your search.', clear: 'Clear search' };

  const visibleDays = useMemo(() => {
    const term = query.trim().toLocaleLowerCase(locale);
    return term ? days.filter((day) => day.day.toLocaleLowerCase(locale).includes(term)) : days;
  }, [days, locale, query]);
  const first = new Date(`${isoDate(startDate)}T12:00:00+03:00`);
  const last = new Date(`${isoDate(addCalendarDays(startDate, periodLength - 1))}T12:00:00+03:00`);
  const range = `${new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short' }).format(first)} – ${new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short', year: 'numeric' }).format(last)}`;

  return (
    <section className="liturgical-calendar" aria-labelledby="liturgical-calendar-title">
      <div className="calendar-toolbar">
        <div><p className="calendar-kicker">{range}</p><h2 id="liturgical-calendar-title">{labels.title}</h2><p>{labels.intro}</p></div>
        <button className="calendar-today" type="button" onClick={() => setStartDate(today)}>{labels.today}</button>
      </div>

      <div className="calendar-workspace">
        <aside className="calendar-filters" aria-label={language === 'sw' ? 'Vidhibiti vya kalenda' : 'Calendar controls'}>
          <div className="calendar-paging">
            <button type="button" disabled={startDate <= minStart} onClick={() => setStartDate(addCalendarDays(startDate, -periodLength))} aria-label={labels.previous}><ArrowLeft size={19} aria-hidden="true" /><span>{labels.previous}</span></button>
            <button type="button" disabled={startDate >= maxStart} onClick={() => setStartDate(addCalendarDays(startDate, periodLength))} aria-label={labels.next}><span>{labels.next}</span><ArrowRight size={19} aria-hidden="true" /></button>
          </div>
          <label className="calendar-date-control"><span>{labels.choose}</span><input type="date" value={isoDate(startDate)} min={isoDate(minStart)} max={isoDate(maxStart)} onChange={(event) => event.target.value && setStartDate(event.target.value.replace(/-/g, ''))} /></label>
          <label className="calendar-search"><span>{labels.search}</span><span className="calendar-search-field"><Search size={19} aria-hidden="true" /><input type="search" value={query} placeholder={labels.placeholder} onChange={(event) => setQuery(event.target.value)} />{query && <button type="button" onClick={() => setQuery('')} aria-label={labels.clear}><X size={18} aria-hidden="true" /></button>}</span></label>
          <a className="calendar-source" href="https://universalis.com/africa.kenya/calendar.htm" target="_blank" rel="noopener noreferrer">{labels.source}<ArrowUpRight size={16} aria-hidden="true" /></a>
        </aside>

        <div className="calendar-results">
          {status === 'loading' && <p className="calendar-status" role="status">{labels.loading}</p>}
          {status === 'error' && <p className="calendar-status">{labels.error}</p>}
          {status === 'ready' && (
            <>
              <p className="calendar-result-count" aria-live="polite">{visibleDays.length} {labels.results}</p>
              {visibleDays.length ? (
                <ol className="liturgical-days">
                  {visibleDays.map((day) => {
                    const date = new Date(`${isoDate(day.calendarDate)}T12:00:00+03:00`);
                    const isToday = day.calendarDate === today;
                    const isSunday = date.getUTCDay() === 0;
                    return (
                      <li key={day.calendarDate} className={isToday ? 'is-today' : isSunday ? 'is-sunday' : undefined}>
                        <time dateTime={isoDate(day.calendarDate)}><strong>{new Intl.DateTimeFormat(locale, { day: '2-digit' }).format(date)}</strong><span>{new Intl.DateTimeFormat(locale, { weekday: 'short', month: 'short' }).format(date)}</span></time>
                        <div><div className="calendar-tags">{isToday && <span>{labels.todayTag}</span>}{isSunday && <span>{labels.sundayTag}</span>}</div><h3>{day.day}</h3></div>
                        <a href={massPageUrl(day.calendarDate)} target="_blank" rel="noopener noreferrer"><span>{labels.details}</span><ArrowUpRight size={16} aria-hidden="true" /></a>
                      </li>
                    );
                  })}
                </ol>
              ) : <p className="calendar-no-results">{labels.noResults}</p>}
            </>
          )}
        </div>
      </div>
      <p className="calendar-copyright">Calendar data © Universalis Publishing Limited.</p>
    </section>
  );
}

export default LiturgicalCalendar;
