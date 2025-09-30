"use client";

import NoteForm from "./NoteForm";
import NotesList, { Note } from "./NotesList";

export default function ReaderSidebar({
  settings, onSet, notes, onAddNote, onDeleteNote, onToggleSidebar,
}: {
  settings: {
    night: boolean; font: "Newsreader"|"serif"|"sans";
    fontSize: number; bg: "default"|"cream"|"sepia";
  };
  onSet: (s: Partial<typeof settings>) => void;
  notes: Note[];
  onAddNote: (text: string) => void;
  onDeleteNote: (id: string) => void;
  onToggleSidebar: () => void;
}) {
  return (
    <aside className="relative lg:col-span-4 border rounded-xl p-4">
      <button
        onClick={onToggleSidebar}
        aria-label="Ocultar herramientas"
        className="flex items-center justify-center w-8 h-8 rounded-full border bg-white shadow
                   absolute -left-4 top-6 z-10"
        title="Ocultar herramientas"
      >
        ‹
      </button>

      <h3 className="font-semibold mb-3 text-[var(--colorMenus)]">Herramientas de Lectura</h3>

      <div className="space-y-4">
        <label className="flex items-center gap-3"></label>
        <div>
          <label className="block text-sm mb-1">Fuente</label>
          <select className="w-full border rounded-lg px-3 py-2"
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
              { key: "default", className: "bg-white border" },
              { key: "cream",   className: "bg-[#F8F4EA] border" },
              { key: "sepia",   className: "bg-[#F3E5D0] border" },
            ].map(b => (
              <button key={b.key as string}
                onClick={() => onSet({ bg: b.key as any, night: false })}
                aria-label={b.key as string}
                className={`w-7 h-7 rounded-full ${b.className} ${
                  settings.bg === b.key ? "outline outline-2 outline-[var(--colorMenus)]" : ""
                }`} />
            ))}
          </div>
        </div>

        <div className="pt-2 border-t">
          <h4 className="font-medium mb-2">Notas</h4>
          <NoteForm onAdd={onAddNote} />
          <NotesList notes={notes} onDelete={onDeleteNote} />
        </div>
      </div>
    </aside>
  );
}
