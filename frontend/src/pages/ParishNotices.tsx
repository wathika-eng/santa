import { useLanguage } from '../contexts/LanguageContext';
import { copy, parishNotices } from '../data/parishContent';

const categories = ['general', 'wedding', 'bereavement'] as const;

function ParishNotices() {
  const { language } = useLanguage();
  const t = copy[language];
  const locale = language === 'sw' ? 'sw-KE' : 'en-KE';

  return (
    <main id="main" tabIndex={-1} className="page-main">
      <div className="container page-container">
        <header className="page-heading">
          <h1>{t.noticesTitle}</h1>
          <p>{t.noticesBody}</p>
        </header>
        <div className="notice-sections">
          {categories.map((category, index) => {
            const categoryNotices = parishNotices.filter((notice) => notice.category === category);
            const details = t.noticeTypes[index];
            const headingId = `notice-${category}`;

            return (
              <section className="notice-section" key={category} aria-labelledby={headingId}>
                <div className="notice-section-heading">
                  <h2 id={headingId}>{details.title}</h2>
                  <p>{details.body}</p>
                </div>
                {categoryNotices.length > 0 ? (
                  <ul className="record-list">
                    {categoryNotices.map((notice) => (
                      <li key={notice.id}>
                        <time dateTime={notice.publishedAt}>
                          {new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(new Date(notice.publishedAt))}
                        </time>
                        <h3>{notice.title[language]}</h3>
                        <p>{notice.body[language]}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="page-status">{details.empty}</p>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default ParishNotices;
