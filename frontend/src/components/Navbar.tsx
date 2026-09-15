import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@cloudflare/kumo/components/button';
import { Cross, Menu, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { copy } from '../data/parishContent';

function Navbar() {
  const { language, setLanguage } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
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
    <>
      <a className="skip-link" href="#main">{t.skip}</a>
      <header className="site-header">
        <div className="topline">
          <div className="container topline-inner">
            <span>{t.archdiocese}</span>
            <div className="language-toggle" role="group" aria-label={language === 'sw' ? 'Chagua lugha' : 'Choose language'}>
              <Button type="button" variant={language === 'en' ? 'secondary' : 'ghost'} size="sm" lang="en" aria-pressed={language === 'en'} onClick={() => setLanguage('en')}>English</Button>
              <Button type="button" variant={language === 'sw' ? 'secondary' : 'ghost'} size="sm" lang="sw" aria-pressed={language === 'sw'} onClick={() => setLanguage('sw')}>Kiswahili</Button>
            </div>
          </div>
        </div>
        <div className="container nav-wrap">
          <Link className="brand" to="/" onClick={() => setMenuOpen(false)}>
            <span className="brand-icon" aria-hidden="true"><Cross size={25} strokeWidth={1.4} /></span>
            <span className="brand-text"><strong>{t.parish}</strong><small>{t.parishSuffix}</small></span>
          </Link>
          <nav className={menuOpen ? 'nav-links open' : 'nav-links'} id="main-navigation" aria-label={language === 'sw' ? 'Menyu kuu' : 'Main navigation'}>
            <ul>{links.map(({ path, label }) => <li key={path}><NavLink to={path} end onClick={() => setMenuOpen(false)}>{label}</NavLink></li>)}</ul>
          </nav>
          <Button className="menu-button" type="button" variant="outline" shape="square" aria-expanded={menuOpen} aria-controls="main-navigation" aria-label={menuOpen ? t.closeMenu : t.menu} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={21} /> : <Menu size={21} />}<span>{language === 'sw' ? 'Menyu' : 'Menu'}</span>
          </Button>
        </div>
      </header>
    </>
  );
}

export default Navbar;
