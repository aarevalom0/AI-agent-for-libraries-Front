"use client";

import { useRef } from "react";

export default function NoteForm({
  onAdd,
  placeholder,
  saveLabel,
}: {
  onAdd: (text: string) => void;
  placeholder: string;
  saveLabel: string;
}) {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const value = (ref.current?.value || "").trim();
        if (value) onAdd(value);
        if (ref.current) ref.current.value = "";
      }}
      className="flex gap-2 mb-3"
    >
      <input
        ref={ref}
        placeholder={placeholder}
        className="flex-1 border rounded-lg px-3 py-2"
      />
      <button className="px-3 py-2 rounded-lg bg-[var(--colorMenus)] text-white">
        {saveLabel}
      </button>
    </form>
  );
}
