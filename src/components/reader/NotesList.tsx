"use client";

export type Note = { id: string; chapter: number; text: string };

export default function NotesList({
  notes,
  onDelete,
  emptyLabel,
}: {
  notes: Note[];
  onDelete: (id: string) => void;
  emptyLabel: string;
}) {
  if (!notes.length) {
    return <p className="text-sm text-[var(--colorText)]">{emptyLabel}</p>;
  }

  return (
    <ul className="space-y-2">
      {notes.map((n) => (
        <li key={n.id} className="border rounded-lg px-3 py-2 text-sm flex items-start gap-2">
          <span className="flex-1">{n.text}</span>
          <button onClick={() => onDelete(n.id)} className="text-xs underline">
            {/* puedes traducir “Eliminar” también si quieres */}
            Eliminar
          </button>
        </li>
      ))}
    </ul>
  );
}
