import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import kumoCss from '@cloudflare/kumo/styles/standalone?raw';
import './index.css';

// Treat the compiled Kumo stylesheet as an asset so Tailwind v3 does not
// reprocess its modern @layer rules.
const kumoStyle = document.createElement('style');
kumoStyle.textContent = kumoCss;
document.head.prepend(kumoStyle);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
