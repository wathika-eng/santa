import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import App from '../../App';
import { copy } from '../../data/parishContent';

describe('public routes', () => {
  it('opens a dedicated event page and switches it to Kiswahili', async () => {
    window.localStorage.clear();
    window.history.replaceState({}, '', '/');
    const user = userEvent.setup();
    render(<App />);

    const navigation = screen.getByRole('navigation', { name: 'Main navigation' });
    await user.click(within(navigation).getByRole('link', { name: 'Events' }));
    expect(window.location.pathname).toBe('/events');
    expect(await screen.findByRole('heading', { level: 1, name: copy.en.eventsTitle })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Kiswahili' }));
    expect(document.documentElement.lang).toBe('sw');
    expect(await screen.findByRole('heading', { level: 1, name: copy.sw.eventsTitle })).toBeInTheDocument();
    expect(document.title).toContain(copy.sw.nav[1]);
  });
});
