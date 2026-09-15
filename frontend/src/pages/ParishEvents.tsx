import { Button } from '@cloudflare/kumo/components/button';
import { useLanguage, type Language } from '../contexts/LanguageContext';
import { copy, parishEvents, type ParishEvent } from '../data/parishContent';

function calendarField(value: string) {
  return value.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
}

function saveReminder(event: ParishEvent, language: Language) {
  const date = new Date(event.startsAt);
  if (Number.isNaN(date.getTime())) return;
  const stamp = (value: Date) => value.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const lines = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Sts Peter and Paul Parish//Events//EN',
    'BEGIN:VEVENT',
    'UID:' + calendarField(event.id) + '@sts-peter-paul-kiambu',
    'DTSTAMP:' + stamp(new Date()),
    'DTSTART:' + stamp(date),
    'SUMMARY:' + calendarField(event.title[language]),
    'DESCRIPTION:' + calendarField(event.description[language]),
    'LOCATION:' + calendarField(event.location[language]),
    'END:VEVENT', 'END:VCALENDAR',
  ];
  const url = URL.createObjectURL(new Blob([lines.join('\r\n') + '\r\n'], { type: 'text/calendar;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'parish-event-' + event.id.replace(/[^a-z0-9-]/gi, '-') + '.ics';
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function ParishEvents() {
  const { language } = useLanguage();
  const t = copy[language];
  const locale = language === 'sw' ? 'sw-KE' : 'en-KE';
  const upcoming = parishEvents.filter((event) => new Date(event.startsAt).getTime() >= Date.now()).sort((a, b) => a.startsAt.localeCompare(b.startsAt));

  return (
    <main id="main" tabIndex={-1} className="page-main">
      <div className="container page-container">
        <header className="page-heading">
          <h1>{t.eventsTitle}</h1>
          <p>{t.eventsBody}</p>
        </header>
        {upcoming.length > 0 ? (
          <ol className="event-list">
            {upcoming.map((event) => (
              <li key={event.id} className="event-entry">
                <div className="event-date">
                  <time dateTime={event.startsAt}>
                    {new Intl.DateTimeFormat(locale, { dateStyle: 'full', timeStyle: 'short' }).format(new Date(event.startsAt))}
                  </time>
                </div>
                <h2>{event.title[language]}</h2>
                <p>{event.description[language]}</p>
                <p className="event-location">{event.location[language]}</p>
                <Button variant="secondary" onClick={() => saveReminder(event, language)}>{t.addReminder}</Button>
              </li>
            ))}
          </ol>
        ) : (
          <section className="page-status">
            <h2>{t.noEvents}</h2>
            <p>{t.eventsHelp}</p>
          </section>
        )}
      </div>
    </main>
  );
}

export default ParishEvents;
