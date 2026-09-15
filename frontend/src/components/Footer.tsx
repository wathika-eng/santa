import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { copy } from '../data/parishContent';

const directoryUrl = 'https://archdioceseofnairobi.org/?page_id=4674';
function Footer() {
  const { language } = useLanguage();
  const t = copy[language];
  const links = [
    { path: '/', label: t.nav[0] },
    { path: '/readings', label: t.readingsNav },
    { path: '/notices', label: t.nav[2] },
    { path: '/events', label: t.nav[1] },
    { path: '/jumuia', label: t.nav[3] },
    { path: '/leadership', label: t.nav[4] },
    { path: '/giving', label: t.nav[5] },
    { path: '/visit', label: t.locationLabel },
  ];

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <strong className="footer-brand">{t.parish}<br />{t.parishSuffix}</strong>
          <p>{t.footerLead}</p>
        </div>
        <div>
          <h2>{t.footerLinks}</h2>
          <ul className="footer-link-grid">{links.map(({ path, label }) => <li key={path}><Link to={path}>{label}</Link></li>)}</ul>
        </div>
        <div>
          <h2>{t.footerInfo}</h2>
          <p>{t.archdiocese}</p>
          <p>{t.postal}: P.O. Box 8–00900 Kiambu, Kenya</p>
          <a className="source-link" href={directoryUrl} target="_blank" rel="noopener noreferrer">{t.directorySource}<ArrowUpRight size={16} aria-hidden="true" /></a>
        </div>
      </div>
      <div className="container footer-bottom"><p>© {new Date().getFullYear()} {t.copyright}</p><p>{t.footerDisclaimer}</p></div>
    </footer>
  );
}

export default Footer;
