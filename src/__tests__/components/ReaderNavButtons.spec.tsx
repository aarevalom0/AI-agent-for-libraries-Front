import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReaderNavButtons from '@/components/reader/ReaderNavButtons';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => ({ prev: 'Anterior', next: 'Siguiente' } as any)[key] ?? key,
}));

describe('ReaderNavButtons', () => {
  it('dispara prev/next y respeta disabled', async () => {
    const user = userEvent.setup();
    const onPrev = jest.fn();
    const onNext = jest.fn();

    const { rerender } = render(
      <ReaderNavButtons onPrev={onPrev} onNext={onNext} disablePrev={false} disableNext={true} />
    );

    await user.click(screen.getByRole('button', { name: 'Anterior' }));
    expect(onPrev).toHaveBeenCalled();

    expect(screen.getByRole('button', { name: 'Siguiente' })).toBeDisabled();

    rerender(
      <ReaderNavButtons onPrev={onPrev} onNext={onNext} disablePrev={true} disableNext={false} />
    );

    expect(screen.getByRole('button', { name: 'Anterior' })).toBeDisabled();
    await user.click(screen.getByRole('button', { name: 'Siguiente' }));
    expect(onNext).toHaveBeenCalled();
  });
});
