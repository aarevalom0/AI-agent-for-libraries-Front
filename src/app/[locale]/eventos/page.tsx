'use client';

import React, { useState, useEffect } from 'react';
import EventCard from '@/components/eventos/EventCard';
import { getAllEvents } from '@/services/eventService';
import { useTranslations } from 'next-intl';

interface EventoAPI {
  id: string | number;
  titulo?: string;
  nombre?: string;
  descripcion?: string;
  descripcion_corta?: string;
  imagen?: string;
  portada?: string;
  ubicacion?: string;
  fecha?: string;
  hora?: string;
}

const EventosPage = () => {
  const t = useTranslations('eventos');
  const [searchTerm, setSearchTerm] = useState('');
  const [events, setEvents] = useState<EventoAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const data = await getAllEvents();
        setEvents(data);
        setError(null);
      } catch (err) {
        console.error('Error cargando eventos:', err);
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filtrar eventos basado en el término de búsqueda
  const filteredEvents = events.filter(event => {
    const searchLower = searchTerm.toLowerCase();
    return (
      event.titulo?.toLowerCase().includes(searchLower) ||
      event.nombre?.toLowerCase().includes(searchLower) ||
      event.descripcion?.toLowerCase().includes(searchLower) ||
      event.descripcion_corta?.toLowerCase().includes(searchLower) ||
      event.ubicacion?.toLowerCase().includes(searchLower)
    );
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  return (
    <>
      <title>{t('pageTitle')}</title>
      <div className="max-w-4xl mx-auto px-4 py-8 font-sans text-[var(--colorSecundario)]">
        <header className="mb-12">
          <h1 className="font-serif text-5xl text-[var(--colorPrincipal)] mb-2">
            {t('title')}
          </h1>
          <p className="text-lg text-gray-600">
            {t('description')}
          </p>
          <div className="mt-8 relative flex items-center bg-[var(--color-input-bg)] rounded-lg p-3 border border-[var(--color-input-border)]">
            <svg 
              className="w-5 h-5 text-gray-500 mr-3" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20" 
              fill="currentColor"
              aria-hidden="true"
            >
              <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
            </svg>
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              className="w-full bg-transparent outline-none placeholder-gray-500 text-[var(--foreground)] focus:ring-2 focus:ring-[var(--colorPrincipal)] focus:ring-opacity-50 rounded"
              aria-label={t('searchAriaLabel')}
              value={searchTerm}
              onChange={handleSearchChange}
              title={t('searchInputTooltip')}
            />
          </div>
        </header>

        <main role="main">
          <h2 className="font-serif text-3xl text-[var(--colorPrincipal)] mb-4">
            {t('upcoming')}
          </h2>
          <div 
            className="flex flex-col"
            role="list"
            aria-label={t('eventsList')}
          >
            {loading ? (
              <div className="text-center py-8">
                <p className="text-gray-500 text-lg">{t('loading') || 'Cargando eventos...'}</p>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-red-500 text-lg">{t('errorLoading') || 'Error al cargar eventos'}</p>
                <p className="text-gray-400 text-sm mt-2">{error}</p>
              </div>
            ) : filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <div key={event.id} role="listitem">
                  <EventCard
                    imageUrl={event.imagen || event.portada || '/Images/default-event.jpg'}
                    href={`/eventos/${event.id}`}
                    title={event.titulo || event.nombre || t('untitledEvent')}
                    descripcion={event.descripcion_corta || event.descripcion || ''}
                  />
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 text-lg">
                  {searchTerm ? t('noEventsFound') : t('noEvents')}
                </p>
                {searchTerm && (
                  <p className="text-gray-400 text-sm mt-2">
                    {t('tryDifferentSearch')}
                  </p>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default EventosPage;