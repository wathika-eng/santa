import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { copy } from './data/parishContent';
import { ScrollToTop } from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import './index.css';

const Admin = lazy(() => import('./pages/Admin'));
const Login = lazy(() => import('./pages/Login'));
const ParishEvents = lazy(() => import('./pages/ParishEvents'));
const ParishNotices = lazy(() => import('./pages/ParishNotices'));
const ParishJumuia = lazy(() => import('./pages/ParishJumuia'));
const ParishLeadership = lazy(() => import('./pages/ParishLeadership'));
const ParishGiving = lazy(() => import('./pages/ParishGiving'));
const ParishVisit = lazy(() => import('./pages/ParishVisit'));
const ParishReadings = lazy(() => import('./pages/ParishReadings'));

function PageFallback() {
  const { language } = useLanguage();
  return <main id="main" tabIndex={-1} className="page-main"><div className="container">{language === 'sw' ? 'Inapakia…' : 'Loading…'}</div></main>;
}

function PublicLayout() {
  const { pathname } = useLocation();
  const { language } = useLanguage();
  const t = copy[language];
  useEffect(() => {
    const names: Record<string, string> = {
      '/': t.nav[0], '/events': t.nav[1], '/notices': t.nav[2],
      '/jumuia': t.nav[3], '/leadership': t.nav[4], '/giving': t.nav[5],
      '/visit': t.locationLabel, '/readings': t.readingsNav,
    };
    document.title = (names[pathname] ?? t.nav[0]) + ' | ' + t.parish + ' ' + t.parishSuffix;
  }, [pathname, t]);
  return <div className="site-shell"><Navbar /><Outlet /><Footer /></div>;
}

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/login" element={<Suspense fallback={null}><Login /></Suspense>} />
            <Route path="/admin" element={<ProtectedRoute><Suspense fallback={null}><Admin /></Suspense></ProtectedRoute>} />
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<Suspense fallback={<PageFallback />}><ParishEvents /></Suspense>} />
              <Route path="/readings" element={<Suspense fallback={<PageFallback />}><ParishReadings /></Suspense>} />
              <Route path="/notices" element={<Suspense fallback={<PageFallback />}><ParishNotices /></Suspense>} />
              <Route path="/jumuia" element={<Suspense fallback={<PageFallback />}><ParishJumuia /></Suspense>} />
              <Route path="/leadership" element={<Suspense fallback={<PageFallback />}><ParishLeadership /></Suspense>} />
              <Route path="/giving" element={<Suspense fallback={<PageFallback />}><ParishGiving /></Suspense>} />
              <Route path="/visit" element={<Suspense fallback={<PageFallback />}><ParishVisit /></Suspense>} />
            </Route>
            <Route path="/schedule" element={<Navigate to="/events" replace />} />
            <Route path="/news" element={<Navigate to="/notices" replace />} />
            <Route path="/news/:id" element={<Navigate to="/notices" replace />} />
            <Route path="/eventos/:id" element={<Navigate to="/events" replace />} />
            <Route path="/churchsr" element={<Navigate to="/visit" replace />} />
            <Route path="/santa-rita" element={<Navigate to="/visit" replace />} />
            <Route path="/tithe" element={<Navigate to="/giving" replace />} />
            <Route path="/success" element={<Navigate to="/giving" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
