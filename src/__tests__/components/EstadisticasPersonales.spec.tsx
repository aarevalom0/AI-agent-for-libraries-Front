import EstadisticasPersonales from '@/components/estadisticas/EstadisticasPersonales';
import { render, screen, fireEvent } from '@testing-library/react';

// Mock Chart.js y react-chartjs-2
jest.mock('react-chartjs-2', () => ({
  Line: () => <div data-testid="line-chart">Line Chart</div>,
  Bar: () => <div data-testid="bar-chart">Bar Chart</div>
}));

jest.mock('chart.js', () => ({
  Chart: {
    register: jest.fn(),
  },
  CategoryScale: jest.fn(),
  LinearScale: jest.fn(),
  PointElement: jest.fn(),
  LineElement: jest.fn(),
  BarElement: jest.fn(),
  Title: jest.fn(),
  Tooltip: jest.fn(),
  Legend: jest.fn(),
}));

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      personalStats: 'Estadísticas Personales',
      ranking: 'Ranking',
      personalStatsTooltip: 'Ver estadísticas personales',
      rankingTooltip: 'Ver ranking de lectores',
      readingHours: 'Horas de lectura',
      readingHoursTooltip: 'Total de horas leídas este año',
      mostRead: 'Libro más reciente',
      mostReadTooltip: 'Último libro completado',
      avgPages: 'Páginas promedio/día',
      avgPagesTooltip: 'Promedio de páginas por día',
      readingSummary: 'Resumen de lectura',
      readingSummaryTooltip: 'Resumen de actividad de lectura',
      booksRead: 'Libros leídos',
      booksReadTooltip: 'Cantidad de libros completados',
      thisYear: 'este año',
      thisYearTooltip: 'Estadísticas del año actual',
      pagesPerMonth: 'Páginas por mes',
      pagesPerMonthTooltip: 'Distribución mensual de páginas leídas',
      genres: 'Géneros',
      genresTooltip: 'Diversidad de géneros leídos'
    };
    return translations[key] || key;
  }
}));

// Mock RankingLectores component
jest.mock('@/components/estadisticas/RankingLectores', () => {
  return function MockRankingLectores() {
    return <div data-testid="ranking-lectores">Ranking Component</div>;
  };
});

describe('EstadisticasPersonales Component', () => {
  beforeEach(() => {
    // Mock Date para obtener resultados consistentes
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2025-10-05'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders statistics tab by default', () => {
    render(<EstadisticasPersonales />);
    
    expect(screen.getByRole('heading', { name: 'Estadísticas Personales' })).toBeInTheDocument();
    expect(screen.getByText('Horas de lectura')).toBeInTheDocument();
    expect(screen.getByText('Libro más reciente')).toBeInTheDocument();
  });

  it('renders tab buttons with correct text', () => {
    render(<EstadisticasPersonales />);
    
    const estadisticasTab = screen.getByRole('button', { name: 'Estadísticas Personales' });
    const rankingTab = screen.getByRole('button', { name: 'Ranking' });
    
    expect(estadisticasTab).toBeInTheDocument();
    expect(rankingTab).toBeInTheDocument();
  });

  it('switches to ranking tab when clicked', () => {
    render(<EstadisticasPersonales />);
    
    const rankingTab = screen.getByRole('button', { name: 'Ranking' });
    fireEvent.click(rankingTab);
    
    expect(screen.getByRole('heading', { name: 'Ranking' })).toBeInTheDocument();
  });

  it('displays statistics cards with correct content', () => {
    render(<EstadisticasPersonales />);
    
    expect(screen.getByText('Horas de lectura')).toBeInTheDocument();
    expect(screen.getByText('Libro más reciente')).toBeInTheDocument();
    expect(screen.getByText('Páginas promedio/día')).toBeInTheDocument();
  });

  it('displays reading summary section', () => {
    render(<EstadisticasPersonales />);
    
    expect(screen.getByText('Resumen de lectura')).toBeInTheDocument();
    expect(screen.getByText('Libros leídos')).toBeInTheDocument();
  });

  it('renders charts when in statistics tab', () => {
    render(<EstadisticasPersonales />);
    
    expect(screen.getByTestId('line-chart')).toBeInTheDocument();
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
  });

  it('displays chart headers with correct content', () => {
    render(<EstadisticasPersonales />);
    
    expect(screen.getByText('Páginas por mes')).toBeInTheDocument();
    expect(screen.getByText('Géneros')).toBeInTheDocument();
  });

  it('has correct tooltip attributes for accessibility', () => {
    render(<EstadisticasPersonales />);
    
    expect(screen.getByTitle('Ver estadísticas personales')).toBeInTheDocument();
    expect(screen.getByTitle('Ver ranking de lectores')).toBeInTheDocument();
    expect(screen.getByTitle('Total de horas leídas este año')).toBeInTheDocument();
  });

  it('applies active class to selected tab', () => {
    render(<EstadisticasPersonales />);
    
    const estadisticasTab = screen.getByRole('button', { name: 'Estadísticas Personales' });
    const rankingTab = screen.getByRole('button', { name: 'Ranking' });
    
    // Estadísticas tab should be active by default
    expect(estadisticasTab).toHaveClass('active');
    expect(rankingTab).not.toHaveClass('active');
    
    // Click ranking tab
    fireEvent.click(rankingTab);
    
    expect(rankingTab).toHaveClass('active');
  });

  it('shows ranking component when ranking tab is selected', () => {
    render(<EstadisticasPersonales />);
    
    const rankingTab = screen.getByRole('button', { name: 'Ranking' });
    fireEvent.click(rankingTab);
    
    // Should hide statistics content and show ranking
    expect(screen.queryByText('Horas de lectura')).not.toBeInTheDocument();
    expect(screen.getByTestId('ranking-lectores')).toBeInTheDocument();
  });

  it('switches back to statistics tab from ranking', () => {
    render(<EstadisticasPersonales />);
    
    const estadisticasTab = screen.getByRole('button', { name: 'Estadísticas Personales' });
    const rankingTab = screen.getByRole('button', { name: 'Ranking' });
    
    // Switch to ranking
    fireEvent.click(rankingTab);
    expect(screen.getByTestId('ranking-lectores')).toBeInTheDocument();
    
    // Switch back to statistics
    fireEvent.click(estadisticasTab);
    expect(screen.getByRole('heading', { name: 'Estadísticas Personales' })).toBeInTheDocument();
    expect(screen.getByText('Horas de lectura')).toBeInTheDocument();
  });

  it('displays "este año" text in multiple sections', () => {
    render(<EstadisticasPersonales />);
    
    const esteAñoElements = screen.getAllByText('este año');
    expect(esteAñoElements.length).toBeGreaterThan(0);
  });
});