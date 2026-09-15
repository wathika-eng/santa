import DailyReadings from '../components/DailyReadings';
import { useLanguage } from '../contexts/LanguageContext';

export default function ParishReadings() {
  const { language } = useLanguage();
  return (
    <main id="main" tabIndex={-1} className="page-main">
      <div className="container page-container">
        <header className="page-heading">
          <h1>{language === 'sw' ? 'Neno la Mungu kwa leo' : 'The Word of God today'}</h1>
          <p>{language === 'sw'
            ? 'Masomo ya Misa yanafuata kalenda ya Kanisa Katoliki nchini Kenya. Tarehe ni ya saa za Afrika Mashariki.'
            : 'Mass readings follow the Catholic calendar for Kenya. The date uses East Africa Time.'}</p>
        </header>
        <DailyReadings />
      </div>
    </main>
  );
}
