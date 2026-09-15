import { useLanguage } from '../contexts/LanguageContext';
import { copy, jumuia } from '../data/parishContent';

function ParishJumuia() {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <main id="main" tabIndex={-1} className="page-main">
      <div className="container page-container">
        <header className="page-heading">
          <h1>{t.jumuiaTitle}</h1>
          <p>{t.jumuiaBody}</p>
        </header>
        {jumuia.length > 0 ? (
          <ul className="directory-list">
            {jumuia.map((group) => (
              <li key={group.id}>
                <h2>{group.name[language]}</h2>
                <p>{group.area[language]}</p>
                <dl>
                  <div><dt>{t.chairperson}</dt><dd>{group.chairperson}</dd></div>
                  <div><dt>{t.secretary}</dt><dd>{group.secretary}</dd></div>
                </dl>
              </li>
            ))}
          </ul>
        ) : (
          <section className="page-status">
            <h2>{t.directoryPending}</h2>
            <p>{t.directoryHelp}</p>
          </section>
        )}
      </div>
    </main>
  );
}

export default ParishJumuia;
