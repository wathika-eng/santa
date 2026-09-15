import { useLanguage } from '../contexts/LanguageContext';
import { copy } from '../data/parishContent';

const directoryUrl = 'https://archdioceseofnairobi.org/?page_id=4674';

function ParishVisit() {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <main id="main" tabIndex={-1} className="page-main">
      <div className="container page-container">
        <header className="page-heading">
          <h1>{t.locationTitle}</h1>
          <p>{t.locationBody}</p>
        </header>
        <div className="visit-layout">
          <section className="visit-address" aria-labelledby="postal-address">
            <h2 id="postal-address">{t.postal}</h2>
            <address>
              P.O. Box 8–00900<br />
              Kiambu, Kenya
            </address>
            <a href={directoryUrl} target="_blank" rel="noopener noreferrer">{t.directorySource}</a>
          </section>
          <section className="page-status">
            <h2>{t.verifiedIdentity}</h2>
            <p>{t.heroFoot}</p>
          </section>
        </div>
      </div>
    </main>
  );
}

export default ParishVisit;
