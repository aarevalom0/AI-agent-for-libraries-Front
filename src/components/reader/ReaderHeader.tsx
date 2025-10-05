"use client";
import Link from "next/link";

export default function ReaderHeader({
  title, chapter,
}: { title: string; chapter: number }) {
  return (
    <>
      <div className="mb-2">
        <Link href="/leerAhora" className="text-[var(--colorMenus)] hover:underline">
          ← Volver a Leer Ahora
        </Link>
      </div>
      <h1 className="text-3xl font-newsreader text-[var(--colorMenus)]">{title}</h1>
      <div className="text-sm text-[var(--colorText)] mb-4">Capítulo {chapter + 1}</div>
    </>
  );
}
