import { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { addCalendarDays, isoDate, kenyaDate, liturgicalWeekDates, loadDailyMass, massPageUrl, type DailyMass } from '../services/universalis';

function LiturgicalCalendar() {
  const { language } = useLanguage();
  const today = useMemo(() => kenyaDate(), []);
  const [startDate, setStartDate] = useState(today);
  const [days, setDays] = useState<DailyMass[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const locale = language === 'sw' ? 'sw-KE' : 'en-KE';

  useEffect(() => {
    const controller = new AbortController();
    setStatus('loading');
    Promise.all(liturgicalWeekDates(startDate).map((date) => loadDailyMass(date, controller.signal)))
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
    ? { title: 'Kalenda ya Kikatoliki', intro: 'Sikukuu na maadhimisho ya siku saba kulingana na kalenda ya Kanisa Katoliki nchini Kenya.', choose: 'Chagua tarehe ya kuanzia', today: 'Leo', previous: 'Wiki iliyopita', next: 'Wiki ijayo', loading: 'Kalenda inapakia…', error: 'Kalenda haipatikani kwa sasa. Tumia kiungo cha Universalis hapa chini.', source: 'Kalenda ya Kenya kwenye Universalis', details: 'Masomo na maelezo ya siku' }
    : { title: 'Catholic calendar', intro: 'Seven days of feasts and celebrations from the Catholic Church calendar for Kenya.', choose: 'Choose starting date', today: 'Today', previous: 'Previous week', next: 'Next week', loading: 'Loading the calendar…', error: 'The calendar is temporarily unavailable. Use the Universalis link below.', source: 'Kenya calendar on Universalis', details: 'Readings and details for this day' };

  return (
    <section className="liturgical-calendar" aria-labelledby="liturgical-calendar-title">
      <div className="calendar-heading">
        <div><h2 id="liturgical-calendar-title">{labels.title}</h2><p>{labels.intro}</p></div>
        <label className="calendar-date-control">{labels.choose}<input type="date" value={isoDate(startDate)} min={isoDate(addCalendarDays(today, -28))} max={isoDate(addCalendarDays(today, 28))} onChange={(event) => setStartDate(event.target.value.replace(/-/g, ''))} /></label>
      </div>
      <div className="calendar-controls" aria-label={labels.title}>
        <button type="button" onClick={() => setStartDate(addCalendarDays(startDate, -7))}>{labels.previous}</button>
        <button type="button" onClick={() => setStartDate(today)}>{labels.today}</button>
        <button type="button" onClick={() => setStartDate(addCalendarDays(startDate, 7))}>{labels.next}</button>
      </div>
      {status === 'loading' && <p className="calendar-status" role="status">{labels.loading}</p>}
      {status === 'error' && <p className="calendar-status">{labels.error}</p>}
      {status === 'ready' && (
        <ol className="liturgical-days">
          {days.map((day) => {
            const date = new Date(`${isoDate(day.calendarDate)}T12:00:00+03:00`);
            return (
              <li key={day.calendarDate} className={day.calendarDate === today ? 'is-today' : undefined}>
                <time dateTime={isoDate(day.calendarDate)}>{new Intl.DateTimeFormat(locale, { weekday: 'short', month: 'short', day: 'numeric' }).format(date)}</time>
                <h3>{day.day}</h3>
                <a href={massPageUrl(day.calendarDate)} target="_blank" rel="noopener noreferrer">{labels.details}<ArrowUpRight size={15} aria-hidden="true" /></a>
              </li>
            );
          })}
        </ol>
      )}
      <a className="calendar-source" href="https://universalis.com/africa.kenya/calendar.htm" target="_blank" rel="noopener noreferrer">{labels.source}<ArrowUpRight size={16} aria-hidden="true" /></a>
      {days[0]?.copyright && <p className="calendar-copyright">{days[0].copyright}</p>}
    </section>
  );
}

export default LiturgicalCalendar;
