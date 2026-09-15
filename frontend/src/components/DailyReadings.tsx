import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { kenyaDate, loadDailyMass, massPageUrl, type DailyMass, type Reading } from '../services/universalis';

const labels = {
  en: {
    title: "Today's readings",
    source: 'Read at Universalis',
    full: 'Read all today’s readings',
    loading: 'Loading today’s Mass readings…',
    unavailable: 'The readings could not be loaded here. Read them directly at Universalis.',
    language: '',
    reading: { 'First reading': 'First reading', Psalm: 'Responsorial psalm', 'Second reading': 'Second reading', Gospel: 'Gospel' },
  },
  sw: {
    title: 'Masomo ya leo',
    source: 'Soma kwenye Universalis',
    full: 'Soma masomo yote ya leo',
    loading: 'Tunapakia masomo ya Misa ya leo…',
    unavailable: 'Masomo hayakupatikana hapa. Yasome moja kwa moja kwenye Universalis.',
    language: 'Maandishi ya masomo yanapatikana kwa Kiingereza kutoka Universalis. Tafsiri rasmi ya Kiswahili itaongezwa baada ya kupata ruhusa.',
    reading: { 'First reading': 'Somo la kwanza', Psalm: 'Zaburi ya kuitikia', 'Second reading': 'Somo la pili', Gospel: 'Injili' },
  },
} as const;

function localizedDate(date: string, language: 'en' | 'sw') {
  const noonInKenya = new Date(`${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}T12:00:00+03:00`);
  return new Intl.DateTimeFormat(language === 'sw' ? 'sw-KE' : 'en-KE', {
    dateStyle: 'full', timeZone: 'Africa/Nairobi',
  }).format(noonInKenya);
}

function ReadingEntry({ reading, language }: { reading: Reading; language: 'en' | 'sw' }) {
  return (
    <section className="border-t border-[#d9d0c1] py-6" aria-label={labels[language].reading[reading.label]}>
      <h3 className="mb-1 font-semibold text-[#702d3b]">{labels[language].reading[reading.label]}</h3>
      {reading.source && <p className="mb-2 text-base text-[#5a544e]" lang="en">{reading.source}</p>}
      {reading.heading && <h4 className="mb-3 font-serif text-xl leading-snug" lang="en">{reading.heading}</h4>}
      <div className="max-w-prose space-y-3 leading-[1.7]" lang="en">
        {reading.text.split(/\n+/).map((paragraph, index) => <p key={`${reading.label}-${index}`} className="mb-0">{paragraph}</p>)}
      </div>
    </section>
  );
}

export default function DailyReadings({ compact = false }: { compact?: boolean }) {
  const { language } = useLanguage();
  const t = labels[language];
  const [date, setDate] = useState(kenyaDate);
  const [mass, setMass] = useState<DailyMass | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    const timer = window.setInterval(() => setDate((current) => {
      const today = kenyaDate();
      return today === current ? current : today;
    }), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    setMass(null);
    setStatus('loading');
    loadDailyMass(date, controller.signal).then((result) => {
      setMass(result);
      setStatus('ready');
    }).catch(() => {
      if (!controller.signal.aborted) setStatus('error');
    });
    return () => controller.abort();
  }, [date]);

  const sourceUrl = massPageUrl(date);
  const copyright = mass?.copyright;

  return (
    <section className={compact ? 'daily-readings-compact' : 'daily-readings-full'} aria-labelledby={compact ? 'home-readings-title' : 'readings-title'}>
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-x-5 gap-y-2 border-b-2 border-[#b69b70] pb-4">
        <div>
          <h2 id={compact ? 'home-readings-title' : 'readings-title'} className="mb-1 font-serif text-[1.8rem] leading-tight text-[#2d2926]">{t.title}</h2>
          <time dateTime={`${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`} className="text-[#5a544e]">{localizedDate(date, language)}</time>
        </div>
        {compact && <Link to="/readings" className="inline-flex min-h-11 items-center font-semibold text-[#702d3b] underline underline-offset-4">{t.full}</Link>}
      </div>

      <div aria-live="polite">
        {status === 'loading' && <p className="mb-5 text-[#5a544e]">{t.loading}</p>}
        {status === 'error' && <p className="mb-5 text-[#5a544e]">{t.unavailable}</p>}
      </div>

      {status === 'ready' && mass && <>
        {mass.day && <p className="mb-5 font-serif text-xl leading-snug" lang="en">{mass.day}</p>}
        {language === 'sw' && <p className="mb-5 max-w-prose text-[#5a544e]">{t.language}</p>}
        {compact ? (
          <ul className="mb-6 grid gap-2 border-t border-[#d9d0c1] pt-4">
            {mass.readings.map((reading) => <li key={reading.label}><strong>{t.reading[reading.label]}</strong>{reading.source && <> · <span lang="en">{reading.source}</span></>}</li>)}
          </ul>
        ) : mass.readings.map((reading) => <ReadingEntry key={reading.label} reading={reading} language={language} />)}
      </>}

      <p className="mb-0 text-base leading-relaxed text-[#5a544e]">
        <a className="font-semibold text-[#702d3b] underline underline-offset-4" href={sourceUrl} target="_blank" rel="noopener noreferrer">{t.source}</a>
        {copyright && (compact
          ? <> · <span lang="en">Copyright © Universalis Publishing Limited.</span> <Link to="/readings" className="underline underline-offset-4">{language === 'sw' ? 'Taarifa kamili za hakimiliki' : 'Full copyright notice'}</Link></>
          : <> · <span lang="en">{copyright}</span></>)}
      </p>
    </section>
  );
}
