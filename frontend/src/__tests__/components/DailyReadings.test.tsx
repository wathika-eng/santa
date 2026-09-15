import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import DailyReadings from '../../components/DailyReadings';
import { LanguageProvider } from '../../contexts/LanguageContext';
import { loadDailyMass } from '../../services/universalis';

vi.mock('../../services/universalis', async (importOriginal) => {
  const original = await importOriginal<typeof import('../../services/universalis')>();
  return { ...original, loadDailyMass: vi.fn() };
});

const mass = {
  calendarDate: '20260914',
  date: 'Monday 14 September 2026',
  day: 'The Exaltation of the Holy Cross',
  readings: [
    { label: 'First reading' as const, heading: 'The bronze serpent', source: 'Numbers 21:4–9', text: 'First reading text.' },
    { label: 'Gospel' as const, heading: 'God sent his Son', source: 'John 3:13–17', text: 'Gospel text.' },
  ],
  copyright: 'Copyright © 2026 Universalis Publishing Limited. Scripture rights reserved.',
};

function renderReadings(compact = false) {
  render(<MemoryRouter><LanguageProvider><DailyReadings compact={compact} /></LanguageProvider></MemoryRouter>);
}

describe('DailyReadings', () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.mocked(loadDailyMass).mockReset();
  });

  it('shows readings as text with a visible source and copyright', async () => {
    vi.mocked(loadDailyMass).mockResolvedValue(mass);
    renderReadings();
    expect(await screen.findByText('Gospel text.')).toBeInTheDocument();
    expect(screen.getByText(/Copyright © 2026 Universalis/)).toBeVisible();
    expect(screen.getByRole('link', { name: 'Read at Universalis' })).toHaveAttribute('href', expect.stringMatching(/universalis\.com\/africa\.kenya\/\d{8}\/mass\.htm/));
  });

  it('marks sourced English scripture in the Swahili view', async () => {
    window.localStorage.setItem('parish-language', 'sw');
    vi.mocked(loadDailyMass).mockResolvedValue(mass);
    renderReadings(true);
    expect(await screen.findByText('Injili')).toBeInTheDocument();
    expect(screen.getByText(/Tafsiri rasmi ya Kiswahili/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Soma masomo yote ya leo' })).toHaveAttribute('href', '/readings');
  });

  it('offers a direct source link when the feed fails', async () => {
    vi.mocked(loadDailyMass).mockRejectedValue(new Error('offline'));
    renderReadings();
    expect(await screen.findByText(/could not be loaded/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Read at Universalis' })).toBeInTheDocument();
  });
});
