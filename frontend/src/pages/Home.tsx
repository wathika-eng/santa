import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { copy } from '../data/parishContent';
import DailyReadings from '../components/DailyReadings';

function Home() {
  const { language } = useLanguage();
  const t = copy[language];
  const destinations = [
    { path: '/notices', title: t.nav[2], description: t.noticeTypes.map((type) => type.title).join(', ') },
    { path: '/events', title: t.nav[1], description: t.noEvents },
    { path: '/jumuia', title: t.nav[3], description: t.sectionJumuia },
    { path: '/leadership', title: t.nav[4], description: t.sectionLeadership },
    { path: '/giving', title: t.nav[5], description: t.givingTypes.map((type) => type.title).join(', ') },
    { path: '/visit', title: t.locationLabel, description: t.locationBody },
  ];

  return (
    <main id="main" tabIndex={-1}>
      <section className="parish-intro">
        <img src="/images/parish-mass-960.webp" alt={language === 'sw' ? 'Mapadre wakiadhimisha Misa katika Parokia ya Watakatifu Petro na Paulo, Kiambu' : 'Priests celebrating Mass at Sts. Peter and Paul Parish, Kiambu'} width="960" height="479" />
        <div className="parish-intro-caption">
          <div className="container">
            <h1>{t.heroTitle}</h1>
            <p>{t.heroBody}</p>
          </div>
        </div>
      </section>

      <section className="reading-feature" aria-label={language === 'sw' ? 'Masomo ya leo' : "Today's readings"}>
        <div className="container reading-feature-grid">
          <DailyReadings compact />
          <aside className="parish-bulletin">
            <h2>{t.noticeKicker}</h2>
            <p>{t.noticeBody}</p>
            <Link to="/notices">{t.seeNotices}</Link>
          </aside>
        </div>
      </section>

      <section className="parish-index">
        <div className="container">
          <h2>{language === 'sw' ? 'Maisha ya parokia' : 'Parish life'}</h2>
          <div className="parish-index-grid">
            {destinations.map((item) => (
              <Link to={item.path} key={item.path}>
                <strong>{item.title}</strong>
                <span>{item.description}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="parish-gallery" aria-labelledby="parish-gallery-title">
        <div className="container">
          <div className="parish-gallery-heading">
            <div><h2 id="parish-gallery-title">{language === 'sw' ? 'Parokia yetu' : 'Our parish'}</h2><p>{t.footerLead}</p></div>
            <a href="https://web.facebook.com/profile.php?id=100080760517262&sk=photos" target="_blank" rel="noopener noreferrer">{language === 'sw' ? 'Picha zaidi kwenye Facebook' : 'More parish photos on Facebook'}</a>
          </div>
          <div className="parish-photo-grid">
            <figure><img src="/images/parish-congregation-760.webp" alt={language === 'sw' ? 'Waamini wamekusanyika ndani ya kanisa' : 'Parishioners gathered inside the church'} width="760" height="506" loading="lazy" /><figcaption>{language === 'sw' ? 'Waamini wakiwa pamoja kanisani' : 'The parish community gathered in church'}</figcaption></figure>
            <figure><img src="/images/parish-community-760.webp" alt={language === 'sw' ? 'Waamini wakishangilia ndani ya kanisa' : 'Parishioners celebrating together inside the church'} width="760" height="629" loading="lazy" /><figcaption>{language === 'sw' ? 'Furaha ya kuwa pamoja' : 'Parish life together'}</figcaption></figure>
            <figure><img src="/images/parish-worship-760.webp" alt={language === 'sw' ? 'Mzungumzaji akihutubia waamini mbele ya altare' : 'A speaker addressing parishioners before the altar'} width="760" height="506" loading="lazy" /><figcaption>{language === 'sw' ? 'Imani na huduma' : 'Faith and service'}</figcaption></figure>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
