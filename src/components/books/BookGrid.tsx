// components/books/BookGrid.tsx
"use client";

import BookCard from "@/components/books/BookCard";

type Libro = {
  slug: string;
  title: string;
  autor: string;
  imageUrl: string;
  genero: "Fantasía" | "Ciencia Ficción" | "Clásico" | "Misterio" | "No Ficción";
  estado: "Leyendo" | "Pendiente" | "Completado";
  progreso?: number;
};

type BookGridProps = {
  books: Libro[];
};

export default function BookGrid({ books }: BookGridProps) {
  if (books.length === 0) {
    return (
      <p className="text-[var(--colorText)]">
        No se encontraron libros con los filtros actuales.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-8">
      {books.map((b) => (
        <BookCard
          key={b.slug}
          title={b.title}
          autor={b.autor}
          imageUrl={b.imageUrl}
          href={`/reader/${b.slug}`}
        />
      ))}
    </div>
  );
}