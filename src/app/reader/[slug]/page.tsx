"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { CHAPTERS } from "@/app/reader/[slug]/chapters";
import {
  loadReader, saveReader, setChapter, setScroll,
  addNote, deleteNote, updateSettings, type ReaderState
} from "@/lib/readingClient";
import { useParams } from "next/navigation";

export default function ReaderPage({ params }: { params: { slug: string } }) {
  const { slug } = useParams<{ slug: string }>(); 
  const book = CHAPTERS[slug];
  const containerRef = useRef<HTMLDivElement>(null);

  // estado UI
  const [state, setState] = useState<ReaderState>(() => loadReader(slug));
  const total = book?.chapters.length ?? 0;

  // si el libro no existe
  if (!book) {
    return (
      <main className="px-6 py-10">
        <p className="mb-4">Libro no encontrado.</p>
        <Link href="/leerAhora" className="text-[var(--colorMenus)] hover:underline">← Volver</Link>
      </main>
    );
  }

  // restaurar scroll al montar o al cambiar de cap
  useEffect(() => {
    const s = loadReader(slug);
    setState(s);
    // aplica scroll en el próximo frame
    requestAnimationFrame(() => {
      if (containerRef.current) containerRef.current.scrollTop = s.scroll || 0;
    });
  }, [slug]);

  // guardar scroll en caliente
  useEffect(() => {
    const div = containerRef.current;
    if (!div) return;
    const onScroll = () => {
      setState(prev => {
        const next = saveReader(slug, { scroll: div.scrollTop });
        return next;
      });
    };
    div.addEventListener("scroll", onScroll, { passive: true });
    return () => div.removeEventListener("scroll", onScroll);
  }, [slug]);

  // helpers
  const chapterText = useMemo(() => book.chapters[state.chapter] ?? "", [book, state.chapter]);
  const title = book.title;

  const applyClasses = useMemo(() => {
    const s = state.settings;
    const fontClass =
      s.font === "Newsreader" ? "font-newsreader" :
      s.font === "serif" ? "font-serif" : "font-sans";
    const bgClass =
      s.bg === "cream" ? "bg-[#F8F4EA]" :
      s.bg === "sepia" ? "bg-[#F3E5D0]" :
      "bg-white";
    const textClass = s.night ? "bg-[#1c1b1a] text-[#EDE9E4]" : `${bgClass} text-[var(--colorText)]`;
    return `${fontClass} ${textClass}`;
  }, [state.settings]);

  // acciones
  function goPrev() {
    if (state.chapter === 0) return;
    const next = setChapter(slug, state.chapter - 1);
    setState(next);
    requestAnimationFrame(() => { if (containerRef.current) containerRef.current.scrollTop = 0; });
  }
  function goNext() {
    if (state.chapter >= total - 1) return;
    const next = setChapter(slug, state.chapter + 1);
    setState(next);
    requestAnimationFrame(() => { if (containerRef.current) containerRef.current.scrollTop = 0; });
  }
  function onAddNote(form: FormData) {
    const text = String(form.get("note") || "").trim();
    if (!text) return;
    const next = addNote(slug, state.chapter, text);
    setState(next);
  }
  function onDeleteNote(id: string) {
    const next = deleteNote(slug, id);
    setState(next);
  }
  function setSetting(partial: Partial<ReaderState["settings"]>) {
    const next = updateSettings(slug, partial);
    setState(next);
  }

const toggleSidebar = () =>
setSetting({ sidebarOpen: !state.settings.sidebarOpen });

 return (
  <main className="grid grid-cols-1 lg:grid-cols-12 gap-6 px-6 md:px-10 py-6">
    {/* Contenido */}
    <section
      className={[
        "border rounded-xl p-6",
        state.settings.sidebarOpen ? "lg:col-span-8" : "lg:col-span-12",
      ].join(" ")}
    >
      <div className="mb-2">
        <Link href="/leerAhora" className="text-[var(--colorMenus)] hover:underline">
          ← Volver a Leer Ahora
        </Link>
      </div>

      <h1 className="text-3xl font-newsreader text-[var(--colorMenus)]">{title}</h1>
      <p className="text-sm text-[var(--colorText)] mb-4">Capítulo {state.chapter + 1}</p>

      <div
        ref={containerRef}
        className={`h-[65vh] overflow-y-auto rounded-lg px-4 py-3 ${applyClasses}`}
        style={{ fontSize: state.settings.fontSize }}
      >
        <article className="prose max-w-none whitespace-pre-wrap leading-7">
          {chapterText}
        </article>
      </div>

      <div className="mt-4 flex gap-3">
        <button
          onClick={goPrev}
          disabled={state.chapter === 0}
          className="px-4 py-2 rounded-lg border disabled:opacity-40"
        >
          Capítulo Anterior
        </button>

        <button
          onClick={goNext}
          disabled={state.chapter >= total - 1}
          className="px-4 py-2 rounded-lg bg-[var(--colorMenus)] text-white disabled:opacity-40"
        >
          Siguiente Capítulo
        </button>
      </div>
    </section>

    {/* Sidebar (se guarda abierto/cerrado) */}
    {!state.settings.sidebarOpen && (
    <button
        onClick={toggleSidebar}
        aria-label="Mostrar herramientas"
        className="fixed right-6 top-1/5 -translate-y-1/2
                w-9 h-9 rounded-full border bg-white shadow z-20
                flex items-center justify-center"
        title="Mostrar herramientas"
    >
        ›
    </button>
    )}


    {state.settings.sidebarOpen && (
    <aside className="relative lg:col-span-4 border rounded-xl p-4">
    {/* Botón flecha para ocultar el panel */}
    <button
      onClick={toggleSidebar}
      aria-label="Ocultar herramientas"
      className="flex items-center justify-center
                 w-8 h-8 rounded-full border bg-white shadow
                 absolute -left-4 top-6 z-10"   // <- clave: absolute + z-10
      title="Ocultar herramientas"
    >
      ‹
    </button>

    <h3 className="font-semibold mb-3 text-[var(--colorMenus)]">Herramientas de Lectura</h3>

        <div className="space-y-4">
          {/* Modo nocturno */}
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={state.settings.night}
              onChange={(e) => setSetting({ night: e.target.checked })}
            />
            <span>Modo nocturno</span>
          </label>

          {/* Fuente */}
          <div>
            <label className="block text-sm mb-1">Fuente</label>
            <select
              className="w-full border rounded-lg px-3 py-2"
              value={state.settings.font}
              onChange={(e) => setSetting({ font: e.target.value as any })}
            >
              <option value="Newsreader">Newsreader</option>
              <option value="serif">Serif</option>
              <option value="sans">Sans Serif</option>
            </select>
          </div>

          {/* Tamaño */}
          <div>
            <label className="block text-sm mb-1">
              Tamaño de fuente: {state.settings.fontSize}px
            </label>
            <input
              type="range"
              min={14}
              max={28}
              step={1}
              value={state.settings.fontSize}
              onChange={(e) => setSetting({ fontSize: Number(e.target.value) })}
              className="w-full"
            />
          </div>

          {/* Fondo */}
          <div>
            <label className="block text-sm mb-1">Color de fondo</label>
            <div className="flex gap-2">
              {[
                { key: "default", className: "bg-white border" },
                { key: "cream", className: "bg-[#F8F4EA] border" },
                { key: "sepia", className: "bg-[#F3E5D0] border" },
              ].map((b) => (
                <button
                  key={b.key}
                  onClick={() => setSetting({ bg: b.key as any, night: false })}
                  className={`w-7 h-7 rounded-full ${b.className} ${
                    state.settings.bg === b.key ? "outline outline-2 outline-[var(--colorMenus)]" : ""
                  }`}
                  aria-label={b.key}
                />
              ))}
            </div>
          </div>

          {/* Notas */}
          <div className="pt-2 border-t">
            <h4 className="font-medium mb-2">Notas</h4>
            <form action={(fd) => onAddNote(fd)} className="flex gap-2 mb-3">
              <input
                name="note"
                placeholder="Agregar nota"
                className="flex-1 border rounded-lg px-3 py-2"
              />
              <button className="px-3 py-2 rounded-lg bg-[var(--colorMenus)] text-white">
                Guardar
              </button>
            </form>

            <ul className="space-y-2">
              {state.notes
                .filter((n) => n.chapter === state.chapter)
                .map((n) => (
                  <li
                    key={n.id}
                    className="border rounded-lg px-3 py-2 text-sm flex items-start gap-2"
                  >
                    <span className="flex-1">{n.text}</span>
                    <button
                      onClick={() => onDeleteNote(n.id)}
                      className="text-xs underline"
                    >
                      Eliminar
                    </button>
                  </li>
                ))}
              {state.notes.filter((n) => n.chapter === state.chapter).length === 0 && (
                <p className="text-sm text-[var(--colorText)]">
                  Sin notas en este capítulo.
                </p>
              )}
            </ul>
          </div>
        </div>
      </aside>
    )}
  </main>
);
}