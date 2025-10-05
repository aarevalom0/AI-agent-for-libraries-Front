import CalendarioRachas from '@/components/mainPage/Calendario';
import { render, screen, within  } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';


jest.mock('next-intl', () => ({
  useTranslations: () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fn: any = (key: string) => key;
    fn.raw = () => [
      { title: 'Sunday', abbr: 'S' },
      { title: 'Monday', abbr: 'M' },
      { title: 'Tuesday', abbr: 'T' },
      { title: 'Wednesday', abbr: 'W' },
      { title: 'Thursday', abbr: 'T' },
      { title: 'Friday', abbr: 'F' },
      { title: 'Saturday', abbr: 'S' }
    ];
    return fn;
  },
  useLocale: () => 'en', // 👈 ya devuelve string como hook
  NextIntlClientProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('CalendarioRachas Component', () => {
  const renderCalendar = (numStreaks: number = 5) => render(<CalendarioRachas numStreaks={numStreaks}/>)

  describe('CalendarioRachas Component', () => {
  const renderCalendar = (numStreaks: number = 5) => {
    return render(<CalendarioRachas numStreaks={numStreaks} />);
  };

  it('renders calendar with title', () => {
    renderCalendar();
    expect(screen.getByText(/calendar\.title/i)).toBeInTheDocument();
  });

  it('displays correct number of streaks', () => {
    renderCalendar(7);
    const streakCounter = screen.getByTestId('streak-counter');
    expect(streakCounter).toHaveTextContent('7');
  }); 

  it('renders navigation arrows', () => {
    const { container } = renderCalendar();
    const backArrow = container.querySelector('[data-testid="ArrowBackIosIcon"]');
    const forwardArrow = container.querySelector('[data-testid="ArrowForwardIosIcon"]');
    expect(backArrow).toBeInTheDocument();
    expect(forwardArrow).toBeInTheDocument();
  });
});

});

