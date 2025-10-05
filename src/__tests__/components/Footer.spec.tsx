import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import Footer from '@/components/navigation/Footer';

const messages = {
  navegacion: {
    footer: {
      links: {
        home: 'Home',
        events: 'Events',
        stats: 'Statistics',
        library: 'My Library',
        readNow: 'Read Now',
        community: 'Community'
      },
      rights: 'All rights reserved.'
    }
  }
};

describe('Footer Component', () => {
  const renderFooter = () => {
    return render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Footer />
      </NextIntlClientProvider>
    );
  };

  it('renders footer with all navigation links', () => {
    renderFooter();
    
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /events/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /statistics/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /my library/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /read now/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /community/i })).toBeInTheDocument();
  });

  it('renders all social media icons', () => {
    const { container } = renderFooter();
    
    const facebookIcon = container.querySelector('[data-testid="FacebookIcon"]');
    const linkedInIcon = container.querySelector('[data-testid="LinkedInIcon"]');
    const instagramIcon = container.querySelector('[data-testid="InstagramIcon"]');
    const youtubeIcon = container.querySelector('[data-testid="YouTubeIcon"]');
    
    expect(facebookIcon).toBeInTheDocument();
    expect(linkedInIcon).toBeInTheDocument();
    expect(instagramIcon).toBeInTheDocument();
    expect(youtubeIcon).toBeInTheDocument();
  });

  it('displays copyright text with current year', () => {
    renderFooter();
    
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`© ${currentYear} Innovatech Solutions`, 'i'))).toBeInTheDocument();
  });

  it('navigation links have correct hrefs', () => {
    renderFooter();
    
    expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute('href', '/mainPage');
    expect(screen.getByRole('link', { name: /events/i })).toHaveAttribute('href', '/eventos');
    expect(screen.getByRole('link', { name: /statistics/i })).toHaveAttribute('href', '/estadisticas');
  });
});