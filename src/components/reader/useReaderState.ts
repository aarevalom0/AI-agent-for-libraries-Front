"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  loadReader,
  saveReader,
  setChapter,
  addNote,
  deleteNote,
  updateSettings,
  type ReaderState,
} from "@/lib/readingClient";

export function useReaderState(slug: string, totalChapters: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<ReaderState>(() => loadReader(slug));

  // Cargar al cambiar slug
  useEffect(() => {
    const s = loadReader(slug);
    setState(s);
    requestAnimationFrame(() => {
      if (containerRef.current) {
        containerRef.current.scrollTop = s.scroll || 0;
      }
    });
  }, [slug]);

  // Persistir scroll
  useEffect(() => {
    const div = containerRef.current;
    if (!div) return;

    const onScroll = () => {
      const next = saveReader(slug, { scroll: div.scrollTop });
      setState(next);
    };

    div.addEventListener("scroll", onScroll, { passive: true });
    return () => div.removeEventListener("scroll", onScroll);
  }, [slug]);

  // Clases del contenedor del reader
  const applyClasses = useMemo(() => {
    const s = state.settings;
    const fontClass =
      s.font === "Newsreader"
        ? "font-newsreader"
        : s.font === "serif"
        ? "font-serif"
        : "font-sans";

    return `${fontClass} reader-root`;
  }, [state.settings.font]);

  // Atributos para el contenedor raíz del reader
  const readerAttrs = useMemo(
    () => ({
      "data-theme": state.settings.night ? "night" : "day",
      "data-bg": state.settings.bg,
    }),
    [state.settings.night, state.settings.bg],
  );

  // Acciones de navegación
  function goPrev() {
    if (state.chapter === 0) return;
    const next = setChapter(slug, state.chapter - 1);
    setState(next);
    requestAnimationFrame(() => {
      if (containerRef.current) containerRef.current.scrollTop = 0;
    });
  }

  function goNext() {
    if (state.chapter >= totalChapters - 1) return;
    const next = setChapter(slug, state.chapter + 1);
    setState(next);
    requestAnimationFrame(() => {
      if (containerRef.current) containerRef.current.scrollTop = 0;
    });
  }

  // Notas
  function onAddNote(text: string) {
    if (!text.trim()) return;
    const next = addNote(slug, state.chapter, text.trim());
    setState(next);
  }

  function onDeleteNote(id: string) {
    const next = deleteNote(slug, id);
    setState(next);
  }

  // ⚠️ clave: setSetting estable con useCallback
  const setSetting = useCallback(
    (partial: Partial<ReaderState["settings"]>) => {
      const next = updateSettings(slug, partial);
      setState(next);
    },
    [slug],
  );

  const toggleSidebar = () =>
    setSetting({ sidebarOpen: !state.settings.sidebarOpen });

  return {
    state,
    containerRef,
    applyClasses,
    readerAttrs,
    goPrev,
    goNext,
    onAddNote,
    onDeleteNote,
    setSetting,
    toggleSidebar,
  };
}
