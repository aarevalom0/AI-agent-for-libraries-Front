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
import { useEffect, useState } from "react";
import React from "react";
import { useTranslations } from "next-intl";
import { BookRecomendations } from "@/types/book";

interface BookActual {
  title: string;
  author: string;
  imageUrl: string;
  href: string;
  porcentaje: number;
}

export default function MainPage() {
  const t = useTranslations("mainPage");

  const [books, setBooks] = useState<BookRecomendations[]>([]);
  const [loadingBooks, setLoadingBooks] = useState(true);
  const [errorBooks, setErrorBooks] = useState<string | null>(null);

  const [evento, setEvento] = useState<any>(null);
  const [loadingEvento, setLoadingEvento] = useState(true);
  const [errorEvento, setErrorEvento] = useState<string | null>(null);

  const books_actuales = t.raw("mainPage.books_actuales") as BookActual[];

  const router = useRouter();
  const [usuario, setUsuario] = useState<string>("Usuario");
  const [ready, setReady] = useState(false);

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
                href={`/reader/${book._id}`}
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
            {books_actuales.map((book: BookActual) => (
              <BookCardProgress
                key={book.title}
                title={book.title}
                autor={book.author}
                imageUrl={book.imageUrl}
                href={book.href}
                porcentaje={book.porcentaje}
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
          <CalendarioRachas numStreaks={9} />
        </div>

        <div
          title="Insignias y logros"
          className="justify-between items-center w-full px-4 pb-4"
        >
          <h2
            title="Titulo sección"
            className="text-xl font-bold !font-newsreader !text-[var(--colorClaro)]"
          >
            {t("mainPage.badgesTitle")}
          </h2>
          <div
            title="Insignias"
            className="grid gap-3 grid-cols-[repeat(auto-fit,minmax(10rem,1fr))]"
          >
            <Insignias
              nombre="Insignia Muchos Libros"
              imageUrl="/Images/Insignia1.jpg"
              data-testid="Insignias"
            />
            <Insignias
              nombre="Insignia Gato lector"
              imageUrl="/Images/Insignia2.jpeg"
              data-testid="Insignias"
            />
            <Insignias
              nombre="Insignia Gato cafetero"
              imageUrl="/Images/Insignia3.jpeg"
              data-testid="Insignias"
            />
            <Insignias
              nombre="Insignia Libros muy altos"
              imageUrl="/Images/Insignia4.jpeg"
              data-testid="Insignias"
            />
            <Insignias
              nombre="Insignia Libros cafeteros"
              imageUrl="/Images/Insignia5.jpeg"
              data-testid="Insignias"
            />
            <Insignias
              nombre="Espacio nuevas Insignias"
              imageUrl=""
              data-testid="Insignias"
            />
            <Insignias
              nombre="Espacio nuevas Insignias"
              imageUrl=""
              data-testid="Insignias"
            />
            <Insignias
              nombre="Espacio nuevas Insignias"
              imageUrl=""
              data-testid="Insignias"
            />
          </div>
        </div>
      </aside>
    </div>
  );
}
