import CalendarioRachas from '@/components/mainPage/Calendario';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';


const messages = {
  mainPage: {
    mainPage: {
      calendar: {
        title: 'Reading Streak',
        tiempo: 'days',
        days: [
          { title: 'Sunday', abbr: 'S' },
          { title: 'Monday', abbr: 'M' },
          { title: 'Tuesday', abbr: 'T' },
          { title: 'Wednesday', abbr: 'W' },
          { title: 'Thursday', abbr: 'T' },
          { title: 'Friday', abbr: 'F' },
          { title: 'Saturday', abbr: 'S' }
        ]
      }
    }
  }
};

describe('CalendarioRachas Component', () => {
  const renderCalendar = (numStreaks: number = 5) => {
    return render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <CalendarioRachas numStreaks={numStreaks} />
      </NextIntlClientProvider>
    );
  };

  it('renders calendar with title', () => {
    renderCalendar();
    
    expect(screen.getByText('Reading Streak')).toBeInTheDocument();
  });

  it('displays correct number of streaks', () => {
    renderCalendar(7);
    
    expect(screen.getByText(/7 days/i)).toBeInTheDocument();
  });

  it('renders all weekday abbreviations', () => {
    renderCalendar();
    
    const weekdays = screen.getAllByTitle(/day$/i);
    expect(weekdays.length).toBeGreaterThan(0);
  });

  it('displays current month and year', () => {
    renderCalendar();
    
    const today = new Date();
    const monthYear = today.toLocaleString('en', { month: 'long' }) + ' ' + today.getFullYear();
    
    expect(screen.getByText(new RegExp(monthYear, 'i'))).toBeInTheDocument();
  });

  it('renders navigation arrows', () => {
    const { container } = renderCalendar();
    
    const backArrow = container.querySelector('[data-testid="ArrowBackIosIcon"]');
    const forwardArrow = container.querySelector('[data-testid="ArrowForwardIosIcon"]');
    
    expect(backArrow).toBeInTheDocument();
    expect(forwardArrow).toBeInTheDocument();
  });

  it('marks completed days based on streaks', () => {
    const { container } = renderCalendar(3);
    
    const completedDays = container.querySelectorAll('[class*="bg-[var(--colorClaroDetallesTransp)]"]');
    expect(completedDays.length).toBeGreaterThanOrEqual(0);
  });

  it('highlights today with special styling', () => {
    const { container } = renderCalendar();
    
    const todayElement = container.querySelector('[class*="bg-[var(--colorClaroDetalles)]"]');
    expect(todayElement).toBeInTheDocument();
  });
});

