import {render, screen} from '@testing-library/react';
import {describe, it, expect} from 'vitest';
import ReaderViewport from '@/components/reader/ReaderViewport';

describe('ReaderViewport', () => {
  it('renderiza contenido y aplica fontSize y className', () => {
    render(
      <ReaderViewport fontSize={20} className="custom-class" bg="sepia" night={false}>
        Hola mundo
      </ReaderViewport>
    );

    // El contenedor principal (usa role="region" si lo agregaste; si no, tomamos por texto)
    const region = screen.getByText('Hola mundo').parentElement as HTMLElement;
    expect(region).toHaveClass('custom-class');
    // Debe propagar el fontSize
    expect(region.getAttribute('style') ?? '').toMatch(/font-size:\s*20px/i);
  });
});
