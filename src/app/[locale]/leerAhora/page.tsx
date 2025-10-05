"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import BookReading from "@/components/books/BookReading";
import Pagination from "@/components/navigation/Pagination";
import BookGrid from "@/components/books/BookGrid";

type Libro = {
  slug: string;
  title: string;
  autor: string;
  imageUrl: string;
  // El catálogo original trae el género/estado en ES (texto). Los mapeamos a códigos.
  genero: "Fantasía" | "Ciencia Ficción" | "Clásico" | "Misterio" | "No Ficción";
  estado: "Leyendo" | "Pendiente" | "Completado";
  progreso?: number;
};

/* ------------------------- Datos de ejemplo ------------------------- */
const LECTURAS_ACTUALES: Libro[] = [
  { slug: "1984", title: "1984", autor: "George Orwell", imageUrl: "/Images/1984.jpg", genero: "Ciencia Ficción", estado: "Leyendo", progreso: 60 },
  { slug: "girl-train", title: "The girl on the train", autor: "Paula Hawkins", imageUrl: "/Images/girl-train.jpg", genero: "Misterio", estado: "Leyendo", progreso: 30 },
  { slug: "harry-potter", title: "Harry Potter and the Philosopher's Stone", autor: "J.K. Rowling", imageUrl: "/Images/harry-potter.jpg", genero: "Fantasía", estado: "Leyendo", progreso: 85 },
];

const CATALOGO: Libro[] = [
  { slug: "secret-garden", title: "The Secret Garden", autor: "Frances H. Burnett", imageUrl: "/Images/secret-garden.jpg", genero: "Clásico", estado: "Pendiente" },
  { slug: "pride-prejudice", title: "Pride and Prejudice", autor: "Jane Austen", imageUrl: "/Images/pride.jpg", genero: "Clásico", estado: "Pendiente" },
  { slug: "to-kill-mockingbird", title: "To Kill a Mockingbird", autor: "Harper Lee", imageUrl: "/Images/mockingbird.jpg", genero: "Clásico", estado: "Pendiente" },
  { slug: "1984", title: "1984", autor: "George Orwell", imageUrl: "/Images/1984.jpg", genero: "Ciencia Ficción", estado: "Pendiente" },
  { slug: "great-gatsby", title: "The Great Gatsby", autor: "F. Scott Fitzgerald", imageUrl: "/Images/gatsby.jpg", genero: "Clásico", estado: "Pendiente" },
  { slug: "dune", title: "Dune", autor: "Frank Herbert", imageUrl: "/Images/dune.jpg", genero: "Ciencia Ficción", estado: "Pendiente" },
  { slug: "lotr", title: "The lord of the rings", autor: "J.R.R. Tolkien", imageUrl: "/Images/lotr.jpg", genero: "Fantasía", estado: "Pendiente" },
  { slug: "sapiens", title: "Sapiens A Brief History Of Humankind", autor: "Yuval Noah Harari", imageUrl: "/Images/sapiens.jpg", genero: "No Ficción", estado: "Pendiente" },
  { slug: "cien-anios", title: "One Hundred Years of Solitude", autor: "Gabriel García Márquez", imageUrl: "/Images/CienAniosSoledad.jpg", genero: "Fantasía", estado: "Pendiente" },
];

type GenreCode = "all" | "fantasy" | "scifi" | "classic" | "mystery" | "nonfiction";
type StatusCode = "all" | "reading" | "pending" | "completed";

const genreCodeOf = (g: Libro["genero"]): GenreCode =>
  (
    {
      "Fantasía": "fantasy",
      "Ciencia Ficción": "scifi",
      "Clásico": "classic",
      "Misterio": "mystery",
      "No Ficción": "nonfiction",
    } as const
  )[g] ?? "all";

const statusCodeOf = (s: Libro["estado"]): StatusCode =>
  (
    {
      "Leyendo": "reading",
      "Pendiente": "pending",
      "Completado": "completed",
    } as const
  )[s] ?? "all";

/* ------------------------- Componente principal ------------------------- */
export default function LeerAhoraPage() {
  const t = useTranslations("leerAhora");

  const [q, setQ] = useState("");
  const [fGenero, setFGenero] = useState<GenreCode>("all");
  const [fEstado, setFEstado] = useState<StatusCode>("all");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 5;

  // Filtro con códigos estables 
  const filtrados = useMemo(() => {
    const s = q.trim().toLowerCase();
    return CATALOGO.filter((b) => {
      const okQ =
        !s ||
        b.title.toLowerCase().includes(s) ||
        b.autor.toLowerCase().includes(s);

      const gCode = genreCodeOf(b.genero);
      const eCode = statusCodeOf(b.estado);

      const okG = fGenero === "all" || gCode === fGenero;
      const okE = fEstado === "all" || eCode === fEstado;

      return okQ && okG && okE;
    });
  }, [q, fGenero, fEstado]);

  const totalPages = Math.max(1, Math.ceil(filtrados.length / PAGE_SIZE));
  const pageBooks = filtrados.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <main className="px-6 md:px-12 lg:px-24 py-10">
      {/* Lecturas actuales */}
      <section className="mb-12">
        <h2 className="text-4xl font-newsreader text-[var(--colorMenus)] mb-8">
          {t("title_current")}
        </h2>

        <div className="flex flex-col gap-8">
          {LECTURAS_ACTUALES.map((b) => (
            <div key={b.slug} className="flex items-center justify-between">
              <BookReading
                title={b.title}
                autor= {`${t("author")}: ${b.autor}`}
                imageUrl={b.imageUrl}
                progreso={b.progreso}
              />
              <Link href={`/reader/${b.slug}`} className="btn">
                {t("continue")}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Explorar / catálogo */}
      <section>
        <h2 className="text-4xl font-newsreader text-[var(--colorMenus)] mb-2">
          {t("title_discover")}
        </h2>
        <p className="text-[var(--colorText)] mb-6">{t("subtitle_discover")}</p>

        {/* Búsqueda + filtros */}
        <div className="flex flex-col gap-3 mb-6">
          <input
            className="w-full rounded-xl border px-4 py-3"
            placeholder={t("search_placeholder")}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPage(1);
            }}
          />

          <div className="flex flex-wrap gap-3">
            {/* Filtro género */}
            <label className="flex items-center gap-2">
              <span className="text-[var(--text)]">{t("filter_genre")}:</span>
              <select
                className="rounded-xl border px-4 py-2"
                value={fGenero}
                onChange={(e) => {
                  setFGenero(e.target.value as GenreCode);
                  setPage(1);
                }}
              >
                <option value="all">{t("all")}</option>
                <option value="fantasy">{t("genre.fantasy")}</option>
                <option value="scifi">{t("genre.scifi")}</option>
                <option value="classic">{t("genre.classic")}</option>
                <option value="mystery">{t("genre.mystery")}</option>
                <option value="nonfiction">{t("genre.nonfiction")}</option>
              </select>
            </label>

            {/* Filtro estado */}
            <label className="flex items-center gap-2">
              <span className="text-[var(--text)]">{t("filter_status")}:</span>
              <select
                className="rounded-xl border px-4 py-2"
                value={fEstado}
                onChange={(e) => {
                  setFEstado(e.target.value as StatusCode);
                  setPage(1);
                }}
              >
                <option value="all">{t("all")}</option>
                <option value="reading">{t("status.reading")}</option>
                <option value="pending">{t("status.pending")}</option>
                <option value="completed">{t("status.completed")}</option>
              </select>
            </label>
          </div>
        </div>

        {/* grilla */}
        <BookGrid books={pageBooks} />

        {/* paginación */}
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />

        {/* vacío */}
        {pageBooks.length === 0 && (
          <p className="text-[var(--colorText)] mt-4">{t("empty")}</p>
        )}
      </section>
    </main>
  );
}
