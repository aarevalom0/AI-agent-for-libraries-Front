"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import BookReading from "@/components/books/BookReading";
import Pagination from "@/components/navigation/Pagination";
import BookGrid from "@/components/books/BookGrid";
import { getLecturas, Lectura } from "@/services/lecturasServices";

/* -------------------- Tipos -------------------- */

type GeneroTexto =
  | "Fantasía"
  | "Ciencia Ficción"
  | "Clásico"
  | "Misterio"
  | "No Ficción";

type EstadoTexto = "Leyendo" | "Pendiente" | "Completado";

type Libro = {
  slug: string;
  title: string;
  autor: string;
  imageUrl: string;
  genero: GeneroTexto;
  estado: EstadoTexto;
  progreso?: number;
};

type LibroBase = {
  slug: string;
  imageUrl: string;
  genero: GeneroTexto;
  estado: EstadoTexto;
  progreso?: number;
  libroId?: string; // 👈 id real del libro en Mongo (si lo tienes)
};

type GenreCode = "all" | "fantasy" | "scifi" | "classic" | "mystery" | "nonfiction";
type StatusCode = "all" | "reading" | "pending" | "completed";

/* -------------------- Datos base (sin textos) -------------------- */

const LECTURAS_ACTUALES_BASE: LibroBase[] = [
  {
    slug: "1984",
    imageUrl: "/Images/1984.jpg",
    genero: "Ciencia Ficción",
    estado: "Leyendo",
    progreso: 60,
    libroId: "691f49fa3faa28be5ca3b4ca", // 👈 ID real del libro 1984
  },
  {
    slug: "girl-train",
    imageUrl: "/Images/girl-train.jpg",
    genero: "Misterio",
    estado: "Leyendo",
    progreso: 30,
  },
  {
    slug: "harry-potter",
    imageUrl: "/Images/harry-potter.jpg",
    genero: "Fantasía",
    estado: "Leyendo",
    progreso: 85,
  },
];

const CATALOGO_BASE: LibroBase[] = [
  {
    slug: "secret-garden",
    imageUrl: "/Images/secret-garden.jpg",
    genero: "Clásico",
    estado: "Pendiente",
  },
  {
    slug: "pride-prejudice",
    imageUrl: "/Images/pride.jpg",
    genero: "Clásico",
    estado: "Pendiente",
  },
  {
    slug: "to-kill-mockingbird",
    imageUrl: "/Images/mockingbird.jpg",
    genero: "Clásico",
    estado: "Pendiente",
  },
  {
    slug: "1984",
    imageUrl: "/Images/1984.jpg",
    genero: "Ciencia Ficción",
    estado: "Pendiente",
    libroId: "691f49fa3faa28be5ca3b4ca",
  },
  {
    slug: "great-gatsby",
    imageUrl: "/Images/gatsby.jpg",
    genero: "Clásico",
    estado: "Pendiente",
  },
  {
    slug: "dune",
    imageUrl: "/Images/dune.jpg",
    genero: "Ciencia Ficción",
    estado: "Pendiente",
  },
  {
    slug: "lotr",
    imageUrl: "/Images/lotr.jpg",
    genero: "Fantasía",
    estado: "Pendiente",
  },
  {
    slug: "sapiens",
    imageUrl: "/Images/sapiens.jpg",
    genero: "No Ficción",
    estado: "Pendiente",
  },
  {
    slug: "cien-anios",
    imageUrl: "/Images/CienAniosSoledad.jpg",
    genero: "Fantasía",
    estado: "Pendiente",
  },
];

/* -------------------- Helpers para filtros -------------------- */

const genreCodeOf = (g: GeneroTexto): GenreCode =>
  (
    {
      "Fantasía": "fantasy",
      "Ciencia Ficción": "scifi",
      "Clásico": "classic",
      "Misterio": "mystery",
      "No Ficción": "nonfiction",
    } as const
  )[g] ?? "all";

const statusCodeOf = (s: EstadoTexto): StatusCode =>
  (
    {
      "Leyendo": "reading",
      "Pendiente": "pending",
      "Completado": "completed",
    } as const
  )[s] ?? "all";

/* -------------------- Componente principal -------------------- */

export default function LeerAhoraPage() {
  const t = useTranslations("leerAhora");

  const [q, setQ] = useState("");
  const [fGenero, setFGenero] = useState<GenreCode>("all");
  const [fEstado, setFEstado] = useState<StatusCode>("all");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 5;

  const [lecturas, setLecturas] = useState<Lectura[]>([]);
  const [loadingLecturas, setLoadingLecturas] = useState(true);
  const [errorLecturas, setErrorLecturas] = useState<string | null>(null);

  // Cargar lecturas desde el backend
  useEffect(() => {
    const loadLecturas = async () => {
      try {
        setLoadingLecturas(true);
        setErrorLecturas(null);
        const data = await getLecturas();
        setLecturas(data);
      } catch (e) {
        console.error("Error cargando lecturas:", e);
        setErrorLecturas("No se pudieron cargar tus lecturas.");
      } finally {
        setLoadingLecturas(false);
      }
    };
    loadLecturas();
  }, []);

  // Libros actuales: mezclamos datos base + porcentaje real (si hay lectura asociada)
  const lecturasActuales: Libro[] = useMemo(
    () =>
      LECTURAS_ACTUALES_BASE.map((b) => {
        const lecturaBack = b.libroId
          ? lecturas.find((l) => l.libro_id === b.libroId)
          : undefined;

        return {
          ...b,
          title: t(`books.${b.slug}.title`),
          autor: t(`books.${b.slug}.author`),
          progreso:
            lecturaBack?.porcentaje_lectura ??
            b.progreso ??
            0,
        };
      }),
    [t, lecturas]
  );

  // Catálogo traducido
  const catalogo: Libro[] = useMemo(
    () =>
      CATALOGO_BASE.map((b) => ({
        ...b,
        title: t(`books.${b.slug}.title`),
        autor: t(`books.${b.slug}.author`),
      })),
    [t]
  );

  // Filtro + búsqueda
  const filtrados = useMemo(() => {
    const s = q.trim().toLowerCase();

    return catalogo.filter((b) => {
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
  }, [q, fGenero, fEstado, catalogo]);

  const totalPages = Math.max(1, Math.ceil(filtrados.length / PAGE_SIZE));
  const pageBooks = filtrados.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <main className="px-6 md:px-12 lg:px-24 py-10">
      {/* Lecturas actuales */}
      <section className="mb-12">
        <h2 className="text-4xl font-newsreader text-[var(--colorMenus)] mb-8">
          {t("title_current")}
        </h2>

        {loadingLecturas && (
          <p className="text-[var(--colorText)] mb-4">Cargando lecturas...</p>
        )}
        {errorLecturas && (
          <p className="text-red-500 mb-4">{errorLecturas}</p>
        )}

        <div className="flex flex-col gap-8">
          {lecturasActuales.map((b) => (
            <div key={b.slug} className="flex items-center justify-between">
              <BookReading
                title={b.title}
                autor={`${t("author")}: ${b.autor}`}
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
        <p className="text-[var(--colorText)] mb-6">
          {t("subtitle_discover")}
        </p>

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
              <span className="text-[var(--text)]">
                {t("filter_genre")}:
              </span>
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
              <span className="text-[var(--text)]">
                {t("filter_status")}:
              </span>
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

        {/* Grilla de libros */}
        <BookGrid books={pageBooks} />

        {/* Paginación */}
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />

        {/* Mensaje vacío */}
        {pageBooks.length === 0 && (
          <p className="text-[var(--colorText)] mt-4">{t("empty")}</p>
        )}
      </section>
    </main>
  );
}
