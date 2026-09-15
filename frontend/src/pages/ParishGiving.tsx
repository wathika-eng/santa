import { useLanguage } from '../contexts/LanguageContext';
import { copy } from '../data/parishContent';

function ParishGiving() {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <main id="main" tabIndex={-1} className="page-main">
      <div className="container page-container">
        <header className="page-heading">
          <h1>{t.givingTitle}</h1>
          <p>{t.givingBody}</p>
        </header>
        <div className="giving-layout">
          <section aria-labelledby="giving-purposes">
            <h2 id="giving-purposes" className="subheading">{language === 'sw' ? 'Njia za kutoa' : 'Ways to give'}</h2>
            <ul className="giving-list">
              {t.givingTypes.map((item) => (
                <li key={item.title}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="giving-details" className="giving-details">
            <h2 id="giving-details" className="subheading">{t.howToGive}</h2>
            <p>{t.detailsBody}</p>
            <p className="withheld">
              <span>{t.maskedLabel}</span>
              <strong>{language === 'sw' ? 'Maelezo hayajawekwa hadi yathibitishwe' : 'Details withheld pending verification'}</strong>
            </p>
            <p>{t.requestBody}</p>
            <div className="international">
              <div>
                <h3>{t.international}</h3>
                <p>{t.internationalBody}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default ParishGiving;
