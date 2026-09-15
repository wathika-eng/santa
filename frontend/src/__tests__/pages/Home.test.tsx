import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Home from '../../pages/Home';
import { LanguageProvider } from '../../contexts/LanguageContext';
import { copy } from '../../data/parishContent';

describe('Kiambu home page', () => {
  it('offers separate pages for parish information without old payment content', () => {
    window.localStorage.clear();
    render(<MemoryRouter><LanguageProvider><Home /></LanguageProvider></MemoryRouter>);

    expect(screen.getByRole('heading', { level: 1, name: copy.en.heroTitle })).toBeInTheDocument();
    const destinations = screen.getAllByRole('link').map((link) => link.getAttribute('href'));
    expect(destinations).toEqual(expect.arrayContaining(['/events', '/notices', '/jumuia', '/leadership', '/giving', '/visit']));
    expect(screen.queryByText(/R\$|Pix|Santa Rita/i)).not.toBeInTheDocument();
  });
});
