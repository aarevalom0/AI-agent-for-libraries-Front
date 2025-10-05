"use client";

import BookCard from "@/components/books/BookCard";
import BookCardProgress from "@/components/books/BookCardProgress";
import CalendarioRachas from "@/components/mainPage/Calendario";
import EventCard from "@/components/eventos/EventCard";
import Insignias from "@/components/mainPage/Insignias";
import { getCurrentUser, isLoggedIn } from "@/lib/authClient";
import { useRouter } from "next/navigation";   
import { useEffect, useState } from "react";
import React from "react";
import { useTranslations } from 'next-intl';

interface Book {
  title: string;
  author: string;
  imageUrl: string;
  href: string;
}

interface BookActual {
  title: string;
  author: string;
  imageUrl: string;
  href: string;
  porcentaje:number;
}



export default function MainPage() {
  const t = useTranslations('mainPage');
  const books = t.raw('mainPage.books') as Book[];
  const books_actuales = t.raw('mainPage.books_actuales') as BookActual[];

  const router = useRouter();
  const [usuario, setUsuario] = useState<string>("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const ok = isLoggedIn();
    if (!ok) {
      router.replace("/login");
      return;
    }
    const u = getCurrentUser();
    setUsuario(u?.name ?? "Usuario");
    setReady(true);
  }, [router]);

  if (!ready) return null;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-7 gap-6 pt-3">
      <section title="Main section" className="md:col-span-5 pl-6 rounded-lg">
        <div title="Titulos" className='pb-6'>
          <h2 title="Saludo" className='font-newsreader'>{t('mainPage.greeting', { name: usuario })}</h2>
          <h4 className='font-newsreader'>{t('mainPage.subtitle')}</h4>
        </div>

        <div title="Libros Recomendados" className='container flex gap-2 overflow-x-auto pb-6' >
          {books.map((book: Book, idx: number) => (
            <BookCard
              key={idx}
              title={book.title}
              autor={book.author}
              imageUrl={book.imageUrl}
              href={book.href}
            />
          ))}
        </div>

        <div title='Lecturas Actuales' className='py-4'>
          <h3 className='text-bold font-newsreader pb-4 '>{t('mainPage.currentReads')} </h3>
          <div title="Lecturas actuales" className='flex flex-col gap-3 pl-2'>
             {books_actuales.map((book: BookActual) => (
                <BookCardProgress
                  key={book.title}
                  title={book.title}
                  autor={book.author}
                  imageUrl={book.imageUrl}
                  href={book.href}
                  porcentaje={book.porcentaje}
                />
             ))}
  
          </div>

          <div title="Evento Destacado">
            <EventCard
              pretitulo={t('mainPage.featuredEvent.pretitle')}
              title={t('mainPage.featuredEvent.title')}
              descripcion={t('mainPage.featuredEvent.description')}
              imageUrl={t('mainPage.featuredEvent.imageUrl')}
              href={t('mainPage.featuredEvent.href')}
            />
          </div>
        </div>
        
      </section>

      <aside title="Side section" className="md:col-span-2 bg-[var(--colorMenus)] rounded-sm">
        <div title="Calendario">
          <CalendarioRachas
            numStreaks={9}
          />
        </div>

        <div title="Insignias y logros" className=" justify-between items-center w-full px-4 pb-4">
          <h2 title="Titulo sección" className="text-xl font-bold !font-newsreader !text-[var(--colorClaro)]">
            {t('mainPage.badgesTitle')}
          </h2>
          <div className="grid gap-3 grid-cols-[repeat(auto-fit,minmax(10rem,1fr))]"> 
            <Insignias
              nombre="Insignia Muchos Libros"
              imageUrl= "/Images/Insignia1.jpg"
            />
            <Insignias
              nombre="Insignia Gato lector"
              imageUrl= "/Images/Insignia2.jpeg"
            />
            <Insignias
              nombre="Insignia Gato cafetero"
              imageUrl= "/Images/Insignia3.jpeg"
            />
            <Insignias
              nombre="Insignia Libros muy altos"
              imageUrl= "/Images/Insignia4.jpeg"
            />
            <Insignias
              nombre="Insignia Libros cafeteros"
              imageUrl= "/Images/Insignia5.jpeg"
            />
            <Insignias
              nombre="Espacio nuevas Insignias"
              imageUrl= ""
            />
             <Insignias
              nombre="Espacio nuevas Insignias"
              imageUrl= ""
            />
             <Insignias
              nombre="Espacio nuevas Insignias"
              imageUrl= ""
            />
            

          </div>
        </div>

      </aside>
        
    </div>

  );
}
