"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { CHAPTERS } from "./chapters";
import { useReaderState } from "@/components/reader/useReaderState";
import ReaderHeader from "@/components/reader/ReaderHeader";
import ReaderViewport from "@/components/reader/ReaderViewport";
import ReaderNavButtons from "@/components/reader/ReaderNavButtons";
import ReaderSidebar from "@/components/reader/ReaderSidebar";

export default function ReaderPage() {
  const { slug } = useParams<{ slug: string }>();
  const book = CHAPTERS[slug];
  if (!book) {
    return (
      <main className="px-6 py-10">
        <p className="mb-4">Libro no encontrado.</p>
        <Link href="/leerAhora" className="text-[var(--colorMenus)] hover:underline">← Volver</Link>
      </main>
    );
  }

  const {
    state, containerRef, applyClasses,
    goPrev, goNext, onAddNote, onDeleteNote,
    setSetting, toggleSidebar
  } = useReaderState(slug, book.chapters.length);

  const chapterText = book.chapters[state.chapter] ?? "";

  return (
    <main className="grid grid-cols-1 lg:grid-cols-12 gap-6 px-6 md:px-10 py-6">
      <section className={["border rounded-xl p-6",
        state.settings.sidebarOpen ? "lg:col-span-8" : "lg:col-span-12"].join(" ")}>
        <ReaderHeader title={book.title} chapter={state.chapter} />
        <ReaderViewport ref={containerRef} className={applyClasses} fontSize={state.settings.fontSize}>
          {chapterText}
        </ReaderViewport>
        <ReaderNavButtons
          onPrev={goPrev}
          onNext={goNext}
          disablePrev={state.chapter === 0}
          disableNext={state.chapter >= book.chapters.length - 1}
        />
      </section>

      {!state.settings.sidebarOpen && (
        <button
          onClick={toggleSidebar}
          aria-label="Mostrar herramientas"
          className="fixed right-6 top-1/2 -translate-y-1/2
                     w-9 h-9 rounded-full border bg-white shadow z-20
                     flex items-center justify-center"
          title="Mostrar herramientas"
        >
          ›
        </button>
      )}

      {state.settings.sidebarOpen && (
        <ReaderSidebar
          settings={state.settings}
          onSet={setSetting}
          notes={state.notes.filter(n => n.chapter === state.chapter)}
          onAddNote={onAddNote}
          onDeleteNote={onDeleteNote}
          onToggleSidebar={toggleSidebar}
        />
      )}
    </main>
  );
}
