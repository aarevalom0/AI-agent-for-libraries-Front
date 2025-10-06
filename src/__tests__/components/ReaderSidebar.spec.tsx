import {render, screen, fireEvent} from '@testing-library/react';
import {describe, it, expect, vi} from 'vitest';
import ReaderSidebar from '@/components/reader/ReaderSidebar';

const baseSettings = {night: false, font: 'sans' as const, fontSize: 16, bg: 'default' as const};

describe('ReaderSidebar', () => {
  it('toggle night mode llama onSet', () => {
    const onSet = vi.fn();
    render(
      <ReaderSidebar
        settings={baseSettings}
        onSet={onSet}
        notes={[]}
        onAddNote={vi.fn()}
        onDeleteNote={vi.fn()}
        onToggleSidebar={vi.fn()}
      />
    );
    const checkbox = screen.getByRole('checkbox', {name: /modo nocturno|night/i});
    fireEvent.click(checkbox);
    expect(onSet).toHaveBeenCalledWith({night: true});
  });

  it('cambiar fuente llama onSet', () => {
    const onSet = vi.fn();
    render(
      <ReaderSidebar
        settings={baseSettings}
        onSet={onSet}
        notes={[]}
        onAddNote={vi.fn()}
        onDeleteNote={vi.fn()}
        onToggleSidebar={vi.fn()}
      />
    );
    fireEvent.change(screen.getByLabelText(/fuente|font/i), {target: {value: 'serif'}});
    expect(onSet).toHaveBeenCalledWith({font: 'serif'});
  });

  it('cambiar font size llama onSet', () => {
    const onSet = vi.fn();
    render(
      <ReaderSidebar
        settings={baseSettings}
        onSet={onSet}
        notes={[]}
        onAddNote={vi.fn()}
        onDeleteNote={vi.fn()}
        onToggleSidebar={vi.fn()}
      />
    );
    const range = screen.getByRole('slider');
    fireEvent.change(range, {target: {value: '20'}});
    expect(onSet).toHaveBeenCalledWith({fontSize: 20});
  });

  it('elegir color de fondo envía {bg, night:false}', () => {
    const onSet = vi.fn();
    render(
      <ReaderSidebar
        settings={baseSettings}
        onSet={onSet}
        notes={[]}
        onAddNote={vi.fn()}
        onDeleteNote={vi.fn()}
        onToggleSidebar={vi.fn()}
      />
    );
    // Requiere que tus botones tengan aria-label="default|cream|sepia"
    fireEvent.click(screen.getByRole('button', {name: /sepia/i}));
    expect(onSet).toHaveBeenCalledWith({bg: 'sepia', night: false});
  });

  it('botón chevron oculta panel', () => {
    const onToggle = vi.fn();
    render(
      <ReaderSidebar
        settings={baseSettings}
        onSet={vi.fn()}
        notes={[]}
        onAddNote={vi.fn()}
        onDeleteNote={vi.fn()}
        onToggleSidebar={onToggle}
      />
    );
    fireEvent.click(screen.getByRole('button', {name: /ocultar herramientas|hide tools|‹/i}));
    expect(onToggle).toHaveBeenCalled();
  });
});
