import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { LanguageProvider } from '../../contexts/LanguageContext';
import LiturgicalCalendar from '../../components/LiturgicalCalendar';

vi.mock('../../services/universalis', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../services/universalis')>();
  return {
    ...actual,
    kenyaDate: () => '20260915',
    loadDailyMass: vi.fn(async (date: string) => ({
      calendarDate: date,
      date: date,
      day: date === '20260915' ? 'Our Lady of Sorrows' : 'Weekday in Ordinary Time',
      readings: [],
      copyright: 'Copyright © Universalis Publishing Limited.',
    })),
  };
});

describe('LiturgicalCalendar', () => {
  beforeEach(() => window.localStorage.clear());

  it('shows seven Kenya-calendar days and highlights today', async () => {
    render(<LanguageProvider><LiturgicalCalendar /></LanguageProvider>);
    expect(await screen.findByRole('heading', { name: 'Our Lady of Sorrows' })).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(7);
    expect(screen.getByRole('button', { name: 'Today' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Kenya calendar on Universalis/ })).toHaveAttribute('href', 'https://universalis.com/africa.kenya/calendar.htm');
  });
});
