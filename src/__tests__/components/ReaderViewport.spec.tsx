import { render, screen } from '@testing-library/react';
import ReaderViewport from '@/components/reader/ReaderViewport';

// Evita problemas por ESM de clsx sin tocar la config global
jest.mock('clsx', () => (...args: any[]) => args.filter(Boolean).join(' '));

describe('ReaderViewport', () => {
  it('aplica tamaño y fondo sepia', () => {
    render(
      <ReaderViewport fontSize={18} bg="sepia" night={false} className="extra">
        <p>Texto</p>
      </ReaderViewport>
    );
    const box = screen.getByText('Texto').closest('div')!;
    expect(box).toHaveStyle({ fontSize: '18px', backgroundColor: '#F3E5D0' });
    expect(box).toHaveClass('extra');
  });

  it('modo noche usa fondo oscuro', () => {
    render(
      <ReaderViewport fontSize={16} bg="cream" night={true}>
        <p>contenido</p>
      </ReaderViewport>
    );
    const box = screen.getByText('contenido').closest('div')!;
    expect(box).toHaveStyle({ backgroundColor: '#1c1b1a' });
  });
});

