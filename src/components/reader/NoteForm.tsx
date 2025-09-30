"use client";
import { useState } from "react";

export default function NoteForm({ onAdd }: { onAdd: (text: string) => void }) {
  const [value, setValue] = useState("");
  return (
    <form onSubmit={(e) => { e.preventDefault(); onAdd(value); setValue(""); }}
          className="flex gap-2 mb-3">
      <input value={value} onChange={(e) => setValue(e.target.value)}
             placeholder="Agregar nota" className="flex-1 border rounded-lg px-3 py-2" />
      <button className="px-3 py-2 rounded-lg bg-[var(--colorMenus)] text-white">Guardar</button>
    </form>
  );
}
