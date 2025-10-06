"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useLocale } from "next-intl";
import { getChapters } from "./chapters";
import { useReaderState } from "@/components/reader/useReaderState";
import ReaderHeader from "@/components/reader/ReaderHeader";
import ReaderViewport from "@/components/reader/ReaderViewport";
import ReaderNavButtons from "@/components/reader/ReaderNavButtons";
import ReaderSidebar from "@/components/reader/ReaderSidebar";

export default function ReaderPage() {
  const locale = useLocale();
  const CHAPTERS = getChapters(locale);
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

  useEffect(() => {
    setSetting({ night: false });
    // opcional: limpiar rastro si se venía en dark por error
    document.documentElement.classList.remove("dark");
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (state.settings.night) root.classList.add("dark");
    else root.classList.remove("dark");

    return () => root.classList.remove("dark");
  }, [state.settings.night]);

  return (
    <div className={`reader ${state.settings.night ? "reader-dark" : ""}`} data-bg={state.settings.bg}>
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-6 px-6 md:px-10 py-6">
        <section className={[
          "border reader-border rounded-xl p-6 reader-surface",
          state.settings.sidebarOpen ? "lg:col-span-8" : "lg:col-span-12",
        ].join(" ")}>
          <ReaderHeader title={book.title} chapter={state.chapter} />

          <ReaderViewport
          ref={containerRef}
          className={applyClasses}          
          fontSize={state.settings.fontSize}
          bg={state.settings.bg}
          night={state.settings.night}
        >
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
            title="Mostrar herramientas"
            className="fixed right-6 top-1/2 -translate-y-1/2
                       w-9 h-9 rounded-full border
                       border-[var(--colorMenus)] bg-[var(--colorMenus)] text-white
                       shadow z-20 flex items-center justify-center"
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
    </div>
  );
}
