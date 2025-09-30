import React from 'react';
import EventCard from '@/components/eventos/EventCard';
import { eventsData } from '@/lib/mock-data';

const EventosPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 font-sans text-[var(--colorSecundario)]">
      <header className="mb-12">
        <h1 className="font-serif text-5xl text-[var(--colorPrincipal)] mb-2">
          Eventos Cercanos
        </h1>
        <p className="text-lg text-gray-600">
          Descubre próximos eventos literarios en tu área y conecta con otros amantes de los libros.
        </p>
        <div className="mt-8 relative flex items-center bg-[var(--color-input-bg)] rounded-lg p-3 border border-[var(--color-input-border)]">
          <svg className="w-5 h-5 text-gray-500 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
          </svg>
          <input
            type="text"
            placeholder="Busca eventos por título, autor o ubicación."
            className="w-full bg-transparent outline-none placeholder-gray-500 text-[var(--foreground)]"
          />
        </div>
      </header>

      <main>
        <h2 className="font-serif text-3xl text-[var(--colorPrincipal)] mb-4">
          Próximos Eventos
        </h2>
        <div className="flex flex-col">
          {eventsData.map((event) => (
            <EventCard
              key={event.id}
              title={event.title}
              descripcion={event.description}
              imageUrl={event.imageUrl}
              href={event.href}
            />
          ))}
        </div>
      </main>
    </div>
  );
};


export default EventosPage;