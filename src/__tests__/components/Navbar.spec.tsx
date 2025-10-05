import { render, screen, fireEvent } from '@testing-library/react';
import NavBar from '@/components/navigation/NavBar';

// Mock del router de i18n
const mockReplace = jest.fn();
jest.mock('@/i18n/routing', () => ({
  usePathname: () => '/mainPage',
  useRouter: () => ({ replace: mockReplace }),
}));

// Mock de next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key, // devuelve la clave como string
  useLocale: () => 'es', // mock de locale
}));


describe('NavBar Component', () => {
  const renderNavBar = () => render(<NavBar />);

  it('renders logo and brand name', () => {
    renderNavBar();
    expect(screen.getByAltText('Lecturium logo')).toBeInTheDocument();
    expect(screen.getByText('Lectorium')).toBeInTheDocument();
  });



  it('toggles mobile menu when hamburger button is clicked', () => {
    renderNavBar();
    const menuButton = screen.getByLabelText('Abrir menú');
    expect(screen.queryByPlaceholderText('Buscar')).not.toBeInTheDocument();

    fireEvent.click(menuButton);
    expect(screen.getByPlaceholderText('Buscar')).toBeInTheDocument();
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
    renderNavBar();
    const esButton = screen.getByText('ES');
    fireEvent.click(esButton);
    expect(mockReplace).toHaveBeenCalledWith('/mainPage', { locale: 'es' });
  });
});
