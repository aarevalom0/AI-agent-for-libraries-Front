"use client";

export default function ReaderNavButtons({
  onPrev, onNext, disablePrev, disableNext,
}: {
  onPrev: () => void; onNext: () => void;
  disablePrev: boolean; disableNext: boolean;
}) {
  return (
    <div className="mt-4 flex gap-3">
      <button onClick={onPrev} disabled={disablePrev}
              className="px-4 py-2 rounded-lg border disabled:opacity-40">
        Capítulo Anterior
      </button>
      <button onClick={onNext} disabled={disableNext}
              className="px-4 py-2 rounded-lg bg-[var(--colorMenus)] text-white disabled:opacity-40">
        Siguiente Capítulo
      </button>
    </div>
  );
}
