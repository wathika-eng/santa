import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { describe, expect, it } from 'vitest';
import { LanguageProvider } from '../../contexts/LanguageContext';
import { copy } from '../../data/parishContent';
import ParishNotices from '../../pages/ParishNotices';
import ParishGiving from '../../pages/ParishGiving';

function renderPage(page: ReactNode) {
  window.localStorage.clear();
  render(<LanguageProvider>{page}</LanguageProvider>);
}

describe('Parish information pages', () => {
  it('keeps wedding and bereavement announcements separate', () => {
    renderPage(<ParishNotices />);
    expect(screen.getByRole('heading', { level: 2, name: copy.en.noticeTypes[1].title })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: copy.en.noticeTypes[2].title })).toBeInTheDocument();
    expect(screen.getByText(copy.en.noticeTypes[1].empty)).toBeInTheDocument();
  });

  it('explains all giving purposes without publishing an account number', () => {
    renderPage(<ParishGiving />);
    for (const purpose of copy.en.givingTypes) {
      expect(screen.getByRole('heading', { name: purpose.title })).toBeInTheDocument();
    }
    expect(screen.getByText('Details withheld pending verification')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: copy.en.international })).toBeInTheDocument();
    expect(screen.queryByText(/\d{6,}/)).not.toBeInTheDocument();
  });
});
