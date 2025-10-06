import { render, screen } from '@testing-library/react';
import Footer from '@/components/navigation/Footer';

// Mock de next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key, // devuelve la clave directamente
}));

describe('Footer Component', () => {
  const renderFooter = () => render(<Footer />);

  it('renders footer with all navigation links', () => {
    renderFooter();

    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /events/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /stats/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /library/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /readNow/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /community/i })).toBeInTheDocument();
  });

  it('renders all social media icons', () => {
    const { container } = renderFooter();

    expect(container.querySelector('[data-testid="FacebookIcon"]')).toBeInTheDocument();
    expect(container.querySelector('[data-testid="LinkedInIcon"]')).toBeInTheDocument();
    expect(container.querySelector('[data-testid="InstagramIcon"]')).toBeInTheDocument();
    expect(container.querySelector('[data-testid="YouTubeIcon"]')).toBeInTheDocument();
  });

  it('displays copyright text with current year', () => {
    renderFooter();

    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`© ${currentYear} Innovatech Solutions`, 'i'))).toBeInTheDocument();
  });

  it('navigation links have correct hrefs', () => {
    const { container } = renderFooter();

    const links = container.querySelectorAll('a');

    const homeLink = Array.from(links).find(a => a.getAttribute('href') === '/mainPage');
    const eventsLink = Array.from(links).find(a => a.getAttribute('href') === '/eventos');
    const statsLink = Array.from(links).find(a => a.getAttribute('href') === '/estadisticas');

    expect(homeLink).toBeInTheDocument();
    expect(eventsLink).toBeInTheDocument();
    expect(statsLink).toBeInTheDocument();
  });

});
