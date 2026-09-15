import { useLanguage } from '../contexts/LanguageContext';
import { copy, parishLeaders } from '../data/parishContent';

function ParishLeadership() {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <main id="main" tabIndex={-1} className="page-main">
      <div className="container page-container">
        <header className="page-heading">
          <h1>{t.leadershipTitle}</h1>
          <p>{t.leadershipBody}</p>
        </header>
        {parishLeaders.length > 0 ? (
          <ul className="leader-list">
            {parishLeaders.map((leader) => (
              <li key={leader.id}>
                <p>{leader.role[language]}</p>
                <h2>{leader.name}</h2>
              </li>
            ))}
          </ul>
        ) : (
          <section className="page-status">
            <h2>{t.leadershipPending}</h2>
          </section>
        )}
      </div>
    </main>
  );
}

export default ParishLeadership;
