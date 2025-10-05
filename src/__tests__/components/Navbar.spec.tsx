import { render, screen, fireEvent } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import NavBar from '@/components/navigation/NavBar';

// Mock del router de i18n
const mockReplace = jest.fn();
jest.mock('@/i18n/routing', () => ({
  usePathname: () => '/mainPage',
  useRouter: () => ({
    replace: mockReplace,
  }),
}));

const messages = {
  navegacion: {
    navbar: {
      home: 'Home',
      events: 'Events',
      stats: 'Statistics',
      library: 'My Library',
      readNow: 'Read Now',
      community: 'Community',
      notifications: 'Notifications',
      profile: 'Profile',
      language: 'Language'
    }
  }
};

describe('NavBar Component', () => {
  const renderNavBar = (locale: string = 'en') => {
    return render(
      <NextIntlClientProvider locale={locale} messages={messages}>
        <NavBar />
      </NextIntlClientProvider>
    );
  };

  it('renders logo and brand name', () => {
    renderNavBar();
    
    expect(screen.getByAltText('Lecturium logo')).toBeInTheDocument();
    expect(screen.getByText('Lectorium')).toBeInTheDocument();
  });

  it('renders all navigation links in desktop view', () => {
    renderNavBar();
    
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Events')).toBeInTheDocument();
    expect(screen.getByText('Statistics')).toBeInTheDocument();
  });

  it('toggles mobile menu when hamburger button is clicked', () => {
    renderNavBar();
    
    const menuButton = screen.getByLabelText('Abrir menú');
    expect(screen.queryByPlaceholderText('Buscar')).not.toBeInTheDocument();
    
    fireEvent.click(menuButton);
    expect(screen.getByPlaceholderText('Buscar')).toBeInTheDocument();
    
    fireEvent.click(menuButton);
  });

  it('renders notification button', () => {
    const { container } = renderNavBar();
    
    const notificationButton = screen.getByTitle('Notifications');
    expect(notificationButton).toBeInTheDocument();
  });

  it('renders profile image link', () => {
    renderNavBar();
    
    const profileImage = screen.getByAltText('Perfil');
    expect(profileImage).toBeInTheDocument();
    expect(profileImage.closest('a')).toHaveAttribute('href', '/perfil');
  });

  it('renders language switcher buttons', () => {
    renderNavBar();
    
    expect(screen.getByText('ES')).toBeInTheDocument();
    expect(screen.getByText('EN')).toBeInTheDocument();
  });

  it('switches locale when language button is clicked', () => {
    renderNavBar('en');
    
    const esButton = screen.getByText('ES');
    fireEvent.click(esButton);
    
    expect(mockReplace).toHaveBeenCalledWith('/mainPage', { locale: 'es' });
  });

  it('applies selected style to active navigation link', () => {
    renderNavBar();
    
    const homeLink = screen.getAllByText('Home')[0];
    expect(homeLink.className).toContain('font-bold');
  });

  it('updates selected state when navigation link is clicked', () => {
    renderNavBar();
    
    const eventsLink = screen.getAllByText('Events')[0];
    fireEvent.click(eventsLink);
    
    expect(eventsLink.className).toContain('font-bold');
  });

  it('shows search input in mobile menu', () => {
    renderNavBar();
    
    const menuButton = screen.getByLabelText('Abrir menú');
    fireEvent.click(menuButton);
    
    const searchInput = screen.getByPlaceholderText('Buscar');
    expect(searchInput).toBeInTheDocument();
  });
});
