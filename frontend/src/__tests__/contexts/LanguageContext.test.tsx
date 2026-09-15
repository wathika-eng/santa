import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { LanguageProvider, useLanguage } from '../../contexts/LanguageContext';

function LanguageControl() {
  const { language, setLanguage } = useLanguage();
  return <><span>{language}</span><button onClick={() => setLanguage('sw')}>Kiswahili</button></>;
}

describe('LanguageProvider', () => {
  beforeEach(() => window.localStorage.clear());

  it('switches the document language and remembers the choice', async () => {
    const user = userEvent.setup();
    render(<LanguageProvider><LanguageControl /></LanguageProvider>);

    expect(screen.getByText('en')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Kiswahili' }));

    expect(screen.getByText('sw')).toBeInTheDocument();
    expect(document.documentElement.lang).toBe('sw');
    expect(window.localStorage.getItem('parish-language')).toBe('sw');
  });

  it('restores the stored language on mount', () => {
    window.localStorage.setItem('parish-language', 'sw');
    render(<LanguageProvider><LanguageControl /></LanguageProvider>);
    expect(screen.getByText('sw')).toBeInTheDocument();
  });
});
