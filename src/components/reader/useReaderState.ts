"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  loadReader, saveReader, setChapter, addNote, deleteNote,
  updateSettings, type ReaderState
} from "@/lib/readingClient";
import { setGlobalDarkMode } from "@/app/layoutWrapper";


export function useReaderState(slug: string, totalChapters: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<ReaderState>(() => loadReader(slug));

  // cargar al cambiar slug
  useEffect(() => {
    const s = loadReader(slug);
    setState(s);
    requestAnimationFrame(() => {
      if (containerRef.current) containerRef.current.scrollTop = s.scroll || 0;
    });
  }, [slug]);

  // persistir scroll
  useEffect(() => {
    const div = containerRef.current;
    if (!div) return;
    const onScroll = () => setState(saveReader(slug, { scroll: div.scrollTop }));
    div.addEventListener("scroll", onScroll, { passive: true });
    return () => div.removeEventListener("scroll", onScroll);
  }, [slug]);

  // aplicar dark global
  useEffect(() => setGlobalDarkMode(state.settings.night), [state.settings.night]);

  // helpers
    const applyClasses = useMemo(() => {
  const s = state.settings;
  const fontClass =
    s.font === "Newsreader" ? "font-newsreader" :
    s.font === "serif" ? "font-serif" : "font-sans";

  // colores globales: no dependen de state.settings.night
  return `${fontClass} reader-surface`;
}, [state.settings.font]);


  // acciones
  function goPrev() {
    if (state.chapter === 0) return;
    const next = setChapter(slug, state.chapter - 1);
    setState(next);
    requestAnimationFrame(() => { if (containerRef.current) containerRef.current.scrollTop = 0; });
  }
  function goNext() {
    if (state.chapter >= totalChapters - 1) return;
    const next = setChapter(slug, state.chapter + 1);
    setState(next);
    requestAnimationFrame(() => { if (containerRef.current) containerRef.current.scrollTop = 0; });
  }
  function onAddNote(text: string) {
    if (!text.trim()) return;
    setState(addNote(slug, state.chapter, text.trim()));
  }
  function onDeleteNote(id: string) {
    setState(deleteNote(slug, id));
  }
  function setSetting(partial: Partial<ReaderState["settings"]>) {
    const next = updateSettings(slug, partial);
    setState(next);
    if (partial.night !== undefined) setGlobalDarkMode(partial.night);
  }
  const toggleSidebar = () => setSetting({ sidebarOpen: !state.settings.sidebarOpen });

  return {
    state, setState,
    containerRef, applyClasses,
    goPrev, goNext, onAddNote, onDeleteNote,
    setSetting, toggleSidebar,
  };
}
