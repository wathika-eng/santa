import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { LanguageProvider } from '../../contexts/LanguageContext';
import LiturgicalCalendar from '../../components/LiturgicalCalendar';

vi.mock('../../services/universalis', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../services/universalis')>();
  return {
    ...actual,
    kenyaDate: () => '20260915',
    loadLiturgicalCalendar: vi.fn(async () => Array.from({ length: 14 }, (_, index) => {
      const date = String(20260915 + index);
      return { calendarDate: date, date, day: date === '20260915' ? 'Our Lady of Sorrows' : 'Weekday in Ordinary Time' };
    })),
  };
});

describe('LiturgicalCalendar', () => {
  beforeEach(() => window.localStorage.clear());

  it('shows a searchable two-week Kenya calendar', async () => {
    const user = userEvent.setup();
    render(<LanguageProvider><LiturgicalCalendar /></LanguageProvider>);
    expect(await screen.findByRole('heading', { name: 'Our Lady of Sorrows' })).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(14);
    expect(screen.getByRole('button', { name: 'Today' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /full Kenya calendar/ })).toHaveAttribute('href', 'https://universalis.com/africa.kenya/calendar.htm');
    await user.type(screen.getByRole('searchbox'), 'Sorrows');
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
    expect(screen.getByText('1 results')).toBeInTheDocument();
  });
});
