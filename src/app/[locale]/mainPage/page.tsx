"use client";

import BookCard from "@/components/books/BookCard";
import BookCardProgress from "@/components/books/BookCardProgress";
import CalendarioRachas from "@/components/mainPage/Calendario";
import EventCard from "@/components/eventos/EventCard";
import Insignias from "@/components/mainPage/Insignias";
import { getCurrentUser } from "@/lib/authClient";
import { getAllBooks, getRandomBooks } from "@/services/bookService";
import { getFeaturedEvent, transformEventFromAPI } from "@/services/eventService";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import React from "react";
import { useTranslations } from "next-intl";
import { BookRecomendations } from "@/types/book";
import SeccionInsignias from "@/components/mainPage/SeccionInsignias";
import { getLecturas, Lectura } from "@/services/lecturasServices";

interface BookActual {
  title: string;
  author: string;
  imageUrl: string;
  href: string;
  porcentaje: number;
}

export default function MainPage() {
  const t = useTranslations("mainPage");
  const tBooks = useTranslations("leerAhora");

  const [books, setBooks] = useState<BookRecomendations[]>([]);
  const [loadingBooks, setLoadingBooks] = useState(true);
  const [errorBooks, setErrorBooks] = useState<string | null>(null);

  const [evento, setEvento] = useState<any>(null);
  const [loadingEvento, setLoadingEvento] = useState(true);
  const [errorEvento, setErrorEvento] = useState<string | null>(null);

  const [lecturas, setLecturas] = useState<Lectura[]>([]);
  const [loadingLecturas, setLoadingLecturas] = useState(true);
  const [errorLecturas, setErrorLecturas] = useState<string | null>(null);

  const books_actuales = t.raw("mainPage.books_actuales") as BookActual[];

  const router = useRouter();
  const [usuario, setUsuario] = useState<string>("Usuario");
  const [userId, setUserId] = useState<string>("");
  const [ready, setReady] = useState(false);

  const [racha, setRacha] = useState(0);

  // --------- Cargar usuario logueado ----------
  useEffect(() => {
    const u = getCurrentUser();

    // Si no hay sesión, redirige a login
    if (!u) {
      router.replace("/login");
      return;
    }

    // nombre viene del backend como `nombre`
    setUsuario(u.nombre || "Usuario");

    if (u?.id) {
      setUserId(u.id);
    }
    setRacha(u.racha_lectura.dias_consecutivos);
    setReady(true);
  }, [router]);

  // --------- Libros recomendados ----------
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoadingBooks(true);
        setErrorBooks(null);
        const allBooks = await getAllBooks();
        const randomSelection = getRandomBooks(allBooks, 5);
        setBooks(randomSelection);
      } catch (error) {
        console.error("Error cargando libros:", error);
        setErrorBooks("No se pudieron cargar los libros recomendados");
      } finally {
        setLoadingBooks(false);
      }
    };

    if (ready) {
      fetchBooks();
    }
  }, [ready]);

  //-------- Lecturas actuales -----------
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

    if (ready) {  // Solo cargar cuando el usuario esté listo
      loadLecturas();
    }
  }, [ready]);

  const lecturasActuales: Libro[] = useMemo(
    () =>
      LECTURAS_ACTUALES_BASE.map((b) => {
        const lecturaBack = b.libroId
          ? lecturas.find((l) => l.libro_id === b.libroId)
          : undefined;
        return {
          ...b,
          title: tBooks(`books.${b.slug}.title`),
          autor: tBooks(`books.${b.slug}.author`),
          progreso: lecturaBack?.porcentaje_lectura ?? b.progreso ?? 0,
        };
      }),
    [t, lecturas]
  );

  // --------- Evento recomendado ----------
  useEffect(() => {
    const fetchEvento = async () => {
      try {
        setLoadingEvento(true);
        setErrorEvento(null);
        const eventoFromAPI = await getFeaturedEvent();

        if (eventoFromAPI) {
          const eventoTransformado = transformEventFromAPI(eventoFromAPI);
          setEvento(eventoTransformado);
        }
      } catch (error) {
        console.error("Error cargando evento:", error);
        setErrorEvento("No se pudo cargar el evento destacado");
      } finally {
        setLoadingEvento(false);
      }
    };

    if (ready) {
      fetchEvento();
    }
  }, [ready]);

  if (!ready) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-7 gap-6 pt-3">
      <section title="Main section" className="md:col-span-5 pl-6 rounded-lg">
        <div title="Titulos" className="pb-6">
          {/* greeting usa el nombre del usuario */}
          <h2 title="Saludo" className="font-newsreader">
            {t("mainPage.greeting", { name: usuario })}
          </h2>
          <h4 className="font-newsreader">{t("mainPage.subtitle")}</h4>
        </div>

        <div
          title="Libros Recomendados"
          className="container flex gap-2 overflow-x-auto pb-6"
        >
          {loadingBooks ? (
            <p className="text-[var(--colorText)]">Cargando libros...</p>
          ) : errorBooks ? (
            <p className="text-red-500">{errorBooks}</p>
          ) : (
            books.map((book) => (
              <BookCard
                key={book._id}
                title={book.titulo}
                autor={book.autoresData[0]?.nombre}
                imageUrl={book.portada || "/Images/default-book.jpg"}
                href={`/miBiblioteca/libros/${book._id}`}
                data-testid="book-card"
              />
            ))
          )}
        </div>

        <div title="Lecturas Actuales" className="py-4">
          <h3 className="text-bold font-newsreader pb-4 ">
            {t("mainPage.currentReads")}{" "}
          </h3>
          <div title="Lecturas actuales" className="flex flex-col gap-3 pl-2">
            {lecturasActuales.map((book: Libro) => (
              <BookCardProgress
                key={book.title}
                title={book.title}
                autor={book.autor}
                imageUrl={book.imageUrl}
                href={`/reader/${book.title}`}
                porcentaje={book.progreso!}
                data-testid="book-card-progress"
              />
            ))}
          </div>

          <div title="Evento Destacado">
            {loadingEvento ? (
              <p className="text-[var(--colorText)]">Cargando evento...</p>
            ) : errorEvento || !evento ? (
              <p className="text-red-500">
                {errorEvento || "No hay eventos disponibles"}
              </p>
            ) : (
              <EventCard
                pretitulo={evento.pretitulo}
                title={evento.title}
                descripcion={evento.descripcion}
                imageUrl={evento.imageUrl}
                href={evento.href}
              />
            )}
          </div>
        </div>
      </section>

      <aside
        title="Side section"
        className="md:col-span-2 bg-[var(--colorMenus)] rounded-sm"
      >
        <div title="Calendario">
          <CalendarioRachas numStreaks={racha} />
        </div>

        {userId && (
          <SeccionInsignias userId={userId} />
        )}

      </aside>
    </div>
  );
}

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
    libroId: "692d0ec5354415bd74b89a6c", // 👈 ID real del libro La chica del tren
  },
  {
    slug: "harry-potter",
    imageUrl: "/Images/harry-potter.jpg",
    genero: "Fantasía",
    estado: "Leyendo",
    progreso: 85,
    libroId: "692cf01749a83d2851f4eded", // 👈 ID real del libro Harry Potter
  },
];