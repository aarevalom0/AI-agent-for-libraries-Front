"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useLocale } from "next-intl";
import { getChapters } from "./chapters";
import { useReaderState } from "@/components/reader/useReaderState";
import ReaderHeader from "@/components/reader/ReaderHeader";
import ReaderViewport from "@/components/reader/ReaderViewport";
import ReaderNavButtons from "@/components/reader/ReaderNavButtons";
import ReaderSidebar from "@/components/reader/ReaderSidebar";
import {
  getLecturas,
  createLectura,
  updateLectura,
} from "@/services/lecturasServices";
import { crearNota } from "@/services/notasService";

export default function ReaderPage() {
  const locale = useLocale();
  const CHAPTERS = getChapters(locale);
  const { slug } = useParams<{ slug: string }>();
  const book = CHAPTERS[slug];

  if (!book) {
    return (
      <main className="px-6 py-10">
        <p className="mb-4">Libro no encontrado.</p>
        <Link
          href="/leerAhora"
          className="text-[var(--colorMenus)] hover:underline"
        >
          ← Volver
        </Link>
      </main>
    );
  }

  const libroId: string | undefined = book.libroId;
  const totalChapters = book.chapters.length;

  const [lecturaId, setLecturaId] = useState<string | null>(null);

  const {
    state,
    containerRef,
    applyClasses,
    goPrev,
    goNext,
    onAddNote,        // notas locales (localStorage)
    onDeleteNote,
    setSetting,
    toggleSidebar,
  } = useReaderState(slug, totalChapters);

  const chapterText = book.chapters[state.chapter] ?? "";

  // 1) Inicializar Lectura en el backend
useEffect(() => {
  if (!libroId) return;

  const initLectura = async () => {
    try {
      const todas = await getLecturas(); // ya trae solo del usuario actual
      let lectura = todas.find((l) => l.libro_id === libroId);

      if (!lectura) {
        lectura = await createLectura({
          libro_id: libroId,
          porcentaje_lectura: 0,
        });
      }

      if (lectura) {
        setLecturaId(lectura.id);
      }
    } catch (e) {
      console.error("Error inicializando lectura:", e);
    }
  };

  initLectura();
}, [libroId]);

  // 2) Sincronizar porcentaje de lectura
  useEffect(() => {
    if (!lecturaId) return;

    const porcentaje = Math.round(((state.chapter + 1) / totalChapters) * 100);

    const syncProgress = async () => {
      try {
        await updateLectura(lecturaId, { porcentaje_lectura: porcentaje });
      } catch (e) {
        console.error("Error actualizando porcentaje de lectura:", e);
      }
    };

    syncProgress();
  }, [state.chapter, lecturaId, totalChapters]);

  // 3) Handler para guardar nota: local + backend
const handleAddNote = useCallback(
  async (texto: string) => {
    if (!texto.trim() || !lecturaId) return;

    try {
      await crearNota(lecturaId, {
        capitulo: state.chapter,     // o state.chapter + 1 si quieres 1-based
        contenido: texto.trim(),
      });
      onAddNote(texto); // sigue actualizando el estado local
    } catch (e) {
      console.error(e);
      alert("No se pudo guardar la nota.");
    }
  },
  [lecturaId, state.chapter, onAddNote]
);


  // 4) modo día/noche
  useEffect(() => {
    setSetting({ night: false });
    document.documentElement.classList.remove("dark");
  }, [setSetting]);

  useEffect(() => {
    const root = document.documentElement;
    if (state.settings.night) root.classList.add("dark");
    else root.classList.remove("dark");

    return () => root.classList.remove("dark");
  }, [state.settings.night]);

  return (
    <div
      className={`reader ${state.settings.night ? "reader-dark" : ""}`}
      data-bg={state.settings.bg}
    >
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-6 px-6 md:px-10 py-6">
        <section
          className={[
            "border reader-border rounded-xl p-6 reader-surface",
            state.settings.sidebarOpen ? "lg:col-span-8" : "lg:col-span-12",
          ].join(" ")}
        >
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
            disableNext={state.chapter >= totalChapters - 1}
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
            notes={state.notes.filter((n) => n.chapter === state.chapter)}
            onAddNote={handleAddNote}   // 👈 aquí usamos el handler nuevo
            onDeleteNote={onDeleteNote}
            onToggleSidebar={toggleSidebar}
          />
        )}
      </main>
    </div>
  );
}
