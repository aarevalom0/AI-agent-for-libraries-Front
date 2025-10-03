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



export default function MainPage() {
  const t = useTranslations('mainPage');

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
          <BookCard
            title="Cien años de soledad"
            autor="Gabriel García Márquez"
            imageUrl="/Images/CienAniosSoledad.jpg"
            href='/libros/detalles/cienaniosdesoledad'
          />
          <BookCard
            title="Dune"
            autor="Frank Herbert"
            imageUrl="/Images/dune.jpg"
            href='/libros/detalles/dune'
          />
          <BookCard
            title="El señor de los anillos"
            autor="J.R.R. Tolkien"
            imageUrl="/Images/lotr.jpg"
            href='/libros/detalles/lotr'
          />

          <BookCard
            title="Sapiens: De animales a dioses"
            autor="Yuval Noah Harari"
            imageUrl="/Images/sapiens.jpg"
            href='/libros/detalles/sapiens'
          />
          <BookCard
            title="La chica del tren"
            autor="Paula Hawkins"
            imageUrl="/Images/girl-train.jpg"
            href='/libros/detalles/girl-train'
          />
        </div>

        <div title='Lecturas Actuales' className='py-4'>
          <h3 className='text-bold font-newsreader pb-4 '>{t('mainPage.currentReads')} </h3>
          <div title="Lecturas actuales" className='flex flex-col gap-3 pl-2'>
            <BookCardProgress
              title="La chica del tren"
              autor="Paula Hawkins"
              imageUrl="/Images/girl-train.jpg"
              href='/leerahora/girl-train'
              porcentaje={42}
            />
            <BookCardProgress
              title="1984"
              autor="George Orwell"
              imageUrl="/Images/1984.jpg"
              href="/libros/detalles/1984"
              porcentaje={20}
            />
            <BookCardProgress
              title="Harry Potter y la piedra filosofal"
              autor="J.K. Rowling"
              imageUrl="/Images/harry-potter.jpg"
              href="/libros/detalles/harry-potter"
              porcentaje={37}
            />

          </div>

          <div title="Evento Destacado">
            <EventCard
              pretitulo='Evento destacado'
              title='Club de lectura virtual'
              descripcion='Acompáñanos en una charla sobre “La última crónica” con la autora Emily Carter.'
              imageUrl='/Images/clublecturavirtual.jpg'
              href='/eventos/clublecturavirtual'
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
