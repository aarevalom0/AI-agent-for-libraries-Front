import RankingLectores from '@/components/estadisticas/RankingLectores';
import { render, screen, fireEvent } from '@testing-library/react';

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      readersRanking: 'Ranking de Lectores',
      today: 'Hoy',
      week: 'Semana',
      month: 'Mes',
      total: 'Total',
      position: 'Posición',
      reader: 'Lector',
      readingTime: 'Tiempo de lectura'
    };
    return translations[key] || key;
  }
}));

describe('RankingLectores Component', () => {
  it('renders ranking title', () => {
    render(<RankingLectores />);
    
    expect(screen.getByText('Ranking de Lectores')).toBeInTheDocument();
  });

  it('renders all filter buttons', () => {
    render(<RankingLectores />);
    
    expect(screen.getByText('Hoy')).toBeInTheDocument();
    expect(screen.getByText('Semana')).toBeInTheDocument();
    expect(screen.getByText('Mes')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('has Total filter active by default', () => {
    render(<RankingLectores />);
    
    const totalButton = screen.getByText('Total');
    expect(totalButton).toHaveClass('active');
  });

  it('switches active filter when clicked', () => {
    render(<RankingLectores />);
    
    const semanaButton = screen.getByText('Semana');
    const totalButton = screen.getByText('Total');
    
    // Initially Total should be active
    expect(totalButton).toHaveClass('active');
    expect(semanaButton).not.toHaveClass('active');
    
    // Click Semana
    fireEvent.click(semanaButton);
    
    expect(semanaButton).toHaveClass('active');
    expect(totalButton).not.toHaveClass('active');
  });

  it('renders table headers correctly', () => {
    render(<RankingLectores />);
    
    expect(screen.getByText('Posición')).toBeInTheDocument();
    expect(screen.getByText('Lector')).toBeInTheDocument();
    expect(screen.getByText('Tiempo de lectura')).toBeInTheDocument();
  });

  it('renders ranking data in table', () => {
    render(<RankingLectores />);
    
    // Check if ranking data is displayed
    expect(screen.getByText('Ana García')).toBeInTheDocument();
    expect(screen.getByText('Carlos López')).toBeInTheDocument();
    expect(screen.getByText('Sofía Martínez')).toBeInTheDocument();
  });

  it('displays position numbers correctly', () => {
    render(<RankingLectores />);
    
    expect(screen.getByText('1º')).toBeInTheDocument();
    expect(screen.getByText('2º')).toBeInTheDocument();
    expect(screen.getByText('3º')).toBeInTheDocument();
  });

  it('formats reading time correctly', () => {
    render(<RankingLectores />);
    
    // Ana García has 15015 minutes = 250h 15min
    expect(screen.getByText('250 h 15 min')).toBeInTheDocument();
    
    // Carlos López has 14745 minutes = 245h 45min
    expect(screen.getByText('245 h 45 min')).toBeInTheDocument();
  });

  it('maintains ranking order by reading time', () => {
    render(<RankingLectores />);
    
    const rows = screen.getAllByRole('row');
    // Skip header row (index 0)
    const firstDataRow = rows[1];
    const secondDataRow = rows[2];
    
    // Ana García should be first (highest reading time)
    expect(firstDataRow).toHaveTextContent('Ana García');
    expect(firstDataRow).toHaveTextContent('1º');
    
    // Carlos López should be second
    expect(secondDataRow).toHaveTextContent('Carlos López');
    expect(secondDataRow).toHaveTextContent('2º');
  });

  it('renders table with correct structure', () => {
    const { container } = render(<RankingLectores />);
    
    const table = container.querySelector('table');
    expect(table).toBeInTheDocument();
    expect(table).toHaveClass('rankingTable');
    
    const thead = container.querySelector('thead');
    const tbody = container.querySelector('tbody');
    expect(thead).toBeInTheDocument();
    expect(tbody).toBeInTheDocument();
  });

  it('updates filter selection on different button clicks', () => {
    render(<RankingLectores />);
    
    const hoyButton = screen.getByText('Hoy');
    const mesButton = screen.getByText('Mes');
    
    // Click Hoy
    fireEvent.click(hoyButton);
    expect(hoyButton).toHaveClass('active');
    
    // Click Mes
    fireEvent.click(mesButton);
    expect(mesButton).toHaveClass('active');
    expect(hoyButton).not.toHaveClass('active');
  });

  it('displays all ranking users from mock data', () => {
    render(<RankingLectores />);
    
    // Check all users from rankingData are displayed
    expect(screen.getByText('Ana García')).toBeInTheDocument();
    expect(screen.getByText('Carlos López')).toBeInTheDocument();
    expect(screen.getByText('Sofía Martínez')).toBeInTheDocument();
    expect(screen.getByText('Javier Pérez')).toBeInTheDocument();
    expect(screen.getByText('Isabel Rodríguez')).toBeInTheDocument();
    expect(screen.getByText('Miguel Álvarez')).toBeInTheDocument();
    expect(screen.getByText('Laura Gómez')).toBeInTheDocument();
    expect(screen.getByText('David Fernández')).toBeInTheDocument();
  });

  it('shows correct number of ranking positions', () => {
    render(<RankingLectores />);
    
    // Should have 8 positions (based on mock data)
    expect(screen.getByText('8º')).toBeInTheDocument();
    expect(screen.queryByText('9º')).not.toBeInTheDocument();
  });

  it('applies correct CSS classes for filter buttons', () => {
    render(<RankingLectores />);
    
    const totalButton = screen.getByText('Total');
    const hoyButton = screen.getByText('Hoy');
    
    expect(totalButton).toHaveClass('filterButton');
    expect(hoyButton).toHaveClass('filterButton');
  });
});