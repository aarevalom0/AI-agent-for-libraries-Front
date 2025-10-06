import { render, screen } from '@testing-library/react';
import ReaderHeader from '@/components/reader/ReaderHeader';

// mocks locales
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, ...props }: any) => <a href={href} {...props}>{children}</a>,
}));
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string, vars?: any) => {
    if (key === 'back') return 'Volver';
    if (key === 'chapter') return `Capítulo ${vars?.n}`;
    return key;
  },
}));

describe('ReaderHeader', () => {
  it('renderiza título, capítulo y enlace volver', () => {
    render(<ReaderHeader title="El Libro" chapter={2} />);
    expect(screen.getByRole('heading', { level: 1, name: 'El Libro' })).toBeInTheDocument();
    expect(screen.getByText('Capítulo 3')).toBeInTheDocument();
    const back = screen.getByRole('link', { name: 'Volver' }) as HTMLAnchorElement;
    expect(back.href).toMatch(/\/leerAhora$/);
  });
});
