"use client";

import NoteForm from "./NoteForm";
import NotesList, { Note } from "./NotesList";

export default function ReaderSidebar({
  settings, onSet, notes, onAddNote, onDeleteNote, onToggleSidebar,
}: {
  settings: { night: boolean; font: "Newsreader"|"serif"|"sans"; fontSize: number; bg: "default"|"cream"|"sepia"; };
  onSet: (s: Partial<typeof settings>) => void;
  notes: Note[];
  onAddNote: (text: string) => void;
  onDeleteNote: (id: string) => void;
  onToggleSidebar: () => void;
}) {
  return (
    <aside className="relative lg:col-span-4 border reader-border rounded-xl p-4 reader-surface">
      <button
        onClick={onToggleSidebar}
        aria-label="Ocultar herramientas"
        title="Ocultar herramientas"
        className="absolute -left-4 top-6 z-10
                   flex h-8 w-8 items-center justify-center rounded-full
                   border border-[var(--colorMenus)] bg-[var(--colorMenus)] text-white shadow"
      >
        ‹
      </button>

      <h3 className="font-semibold mb-3 text-[var(--colorMenus)]">Herramientas de Lectura</h3>

      <div className="space-y-4">
        <label className="flex items-center gap-3">
          <input type="checkbox" checked={settings.night} onChange={(e) => onSet({ night: e.target.checked })} />
          <span>Modo nocturno</span>
        </label>

        <div>
          <label className="block text-sm mb-1">Fuente</label>
          <select className="w-full border reader-border rounded-lg px-3 py-2 reader-surface"
                  value={settings.font}
                  onChange={(e) => onSet({ font: e.target.value as any })}>
            <option value="Newsreader">Newsreader</option>
            <option value="serif">Serif</option>
            <option value="sans">Sans Serif</option>
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1">Tamaño de fuente: {settings.fontSize}px</label>
          <input type="range" min={14} max={28} step={1} className="w-full"
                 value={settings.fontSize}
                 onChange={(e) => onSet({ fontSize: Number(e.target.value) })}/>
        </div>

        <div>
          <label className="block text-sm mb-1">Color de fondo</label>
          <div className="flex gap-2">
            {[
              { key: "default", className: "border reader-border reader-surface" },
              { key: "cream",   className: "border bg-[#F8F4EA]" },
              { key: "sepia",   className: "border bg-[#F3E5D0]" },
            ].map(b => (
              <button key={b.key as string}
                onClick={() => onSet({ bg: b.key as any })}
                aria-label={b.key as string}
                className={`w-7 h-7 rounded-full ${b.className} ${
                  settings.bg === b.key ? "outline outline-2 outline-[var(--colorMenus)]" : ""
                }`} />
            ))}
          </div>
        </div>

        <div className="pt-2 border-t reader-border">
          <h4 className="font-medium mb-2">Notas</h4>
          <NoteForm onAdd={onAddNote} />
          <NotesList notes={notes} onDelete={onDeleteNote} />
        </div>
      </div>
    </aside>
  );
}
