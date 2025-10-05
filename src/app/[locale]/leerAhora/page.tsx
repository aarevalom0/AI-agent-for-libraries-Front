"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import BookReading from "@/components/books/BookReading";
import Pagination from "@/components/navigation/Pagination";
import BookGrid from "@/components/books/BookGrid";

type Libro = {
  slug: string;
  title: string;
  autor: string;
  imageUrl: string;
  genero: "Fantasía" | "Ciencia Ficción" | "Clásico" | "Misterio" | "No Ficción";
  estado: "Leyendo" | "Pendiente" | "Completado";
  progreso?: number; // 0-100
};

const LECTURAS_ACTUALES: Libro[] = [
  {slug: "1984",title: "1984",autor: "George Orwell",imageUrl: "/Images/1984.jpg",genero: "Ciencia Ficción",estado: "Leyendo",progreso: 60,},
  {slug: "girl-train",title: "La chica del tren",autor: "Paula Hawkins",imageUrl: "/Images/girl-train.jpg",genero: "Misterio",estado: "Leyendo",progreso: 30,},
  {slug: "harry-potter",title: "Harry Potter y la piedra filosofal",autor: "J.K. Rowling",imageUrl: "/Images/harry-potter.jpg",genero: "Fantasía",estado: "Leyendo",progreso: 85,},];


const CATALOGO: Libro[] = [
  { slug: "secret-garden", title: "The Secret Garden", autor: "Frances H. Burnett", imageUrl: "/Images/secret-garden.jpg", genero: "Clásico", estado: "Pendiente" },
  { slug: "pride-prejudice", title: "Pride and Prejudice", autor: "Jane Austen", imageUrl: "/Images/pride.jpg", genero: "Clásico", estado: "Pendiente" },
  { slug: "to-kill-mockingbird", title: "To Kill a Mockingbird", autor: "Harper Lee", imageUrl: "/Images/mockingbird.jpg", genero: "Clásico", estado: "Pendiente" },
  { slug: "1984", title: "1984", autor: "George Orwell", imageUrl: "/Images/1984.jpg", genero: "Ciencia Ficción", estado: "Pendiente" },
  { slug: "great-gatsby", title: "The Great Gatsby", autor: "F. Scott Fitzgerald", imageUrl: "/Images/gatsby.jpg", genero: "Clásico", estado: "Pendiente" },
  { slug: "dune", title: "Dune", autor: "Frank Herbert", imageUrl: "/Images/dune.jpg", genero: "Ciencia Ficción", estado: "Pendiente" },
  { slug: "lotr", title: "El señor de los anillos", autor: "J.R.R. Tolkien", imageUrl: "/Images/lotr.jpg", genero: "Fantasía", estado: "Pendiente" },
  { slug: "sapiens", title: "Sapiens: De animales a dioses", autor: "Yuval Noah Harari", imageUrl: "/Images/sapiens.jpg", genero: "No Ficción", estado: "Pendiente" },
  { slug: "cien-anios", title: "Cien años de soledad", autor: "Gabriel García Márquez", imageUrl: "/Images/CienAniosSoledad.jpg", genero: "Fantasía", estado: "Pendiente" },
];


export default function LeerAhoraPage() {
  // ---- estado UI básico
  const [q, setQ] = useState("");
  const [fGenero, setFGenero] = useState<string>("Todos");
  const [fEstado, setFEstado] = useState<string>("Todos");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 5;

  // ---- filtrado + búsqueda (simple)
  const filtrados = useMemo(() => {
    const s = q.trim().toLowerCase();
    return CATALOGO.filter(b => {
      const okQ = !s || b.title.toLowerCase().includes(s) || b.autor.toLowerCase().includes(s);
      const okG = fGenero === "Todos" || b.genero === fGenero;
      const okE = fEstado === "Todos" || b.estado === fEstado;
      return okQ && okG && okE;
    });
  }, [q, fGenero, fEstado]);

  const totalPages = Math.max(1, Math.ceil(filtrados.length / PAGE_SIZE));
  const pageBooks = filtrados.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // reset página si cambian filtros
  function onChangeFiltro<T extends React.SetStateAction<string>>(setter: (v: T) => void) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (e: React.ChangeEvent<HTMLSelectElement>) => { setter(e.target.value as any); setPage(1); };
  }

  return (
    <main className="px-6 md:px-12 lg:px-24 py-10">
      {/* Lecturas actuales */}
      <section className="mb-12">
        <h2 className="text-4xl font-newsreader text-[var(--colorMenus)] mb-8">Lecturas actuales</h2>

        <div className="flex flex-col gap-8">
          {LECTURAS_ACTUALES.map(b => (
            <div key={b.slug} className="flex items-center justify-between">
              <BookReading
                title={b.title}
                autor={b.autor}
                imageUrl={b.imageUrl}
                progreso={b.progreso}
              />

              <Link href={`/reader/${b.slug}`} className="btn">
              Seguir Leyendo
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Explorar / catálogo */}
      <section>
        <h2 className="text-4xl font-newsreader text-[var(--colorMenus)] mb-4">Encuentra tu próxima lectura</h2>
        <p className="text-[var(--colorText)] mb-6">Explora tu colección de libros y sumérgete en tu próxima aventura de lectura.</p>

        {/* barra de búsqueda */}
        <div className="flex flex-col gap-3 mb-6">
          <input
            className="w-full rounded-xl border px-4 py-3"
            placeholder="Busca libros por título o autor."
            value={q}
            onChange={(e) => { setQ(e.target.value); setPage(1); }}
          />
          <div className="flex flex-wrap gap-3">
            <select className="rounded-xl border px-4 py-2" value={fGenero} onChange={onChangeFiltro(setFGenero)}>
              <option>Todos</option>
              <option>Fantasía</option>
              <option>Ciencia Ficción</option>
              <option>Clásico</option>
              <option>Misterio</option>
              <option>No Ficción</option>
            </select>
            <select className="rounded-xl border px-4 py-2" value={fEstado} onChange={onChangeFiltro(setFEstado)}>
              <option>Todos</option>
              <option>Pendiente</option>
              <option>Leyendo</option>
              <option>Completado</option>
            </select>
          </div>
        </div>

        {/* grilla de libros */}
        <BookGrid books={pageBooks} />

        {/* paginación simple */}
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </section>
    </main>
  );
}
