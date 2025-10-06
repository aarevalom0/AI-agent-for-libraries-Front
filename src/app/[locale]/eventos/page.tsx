'use client';

import React, { useState } from 'react';
import EventCard from '@/components/eventos/EventCard';
import { eventsData } from '@/lib/mock-data';
import { useTranslations } from 'next-intl';

const EventosPage = () => {
  const t = useTranslations('eventos');
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrar eventos basado en el término de búsqueda (ahora usando traducciones)
  const filteredEvents = eventsData.filter(event => {
    const title = t(`event${event.id}Title`);
    const description = t(`event${event.id}Description`);
    
    return title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           description.toLowerCase().includes(searchTerm.toLowerCase()) ||
           (event.location && event.location.toLowerCase().includes(searchTerm.toLowerCase()));
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
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <div key={event.id} role="listitem">
                  <EventCard
                    imageUrl={event.imageUrl}
                    href={event.href}
                    title={t(`event${event.id}Title`)}
                    descripcion={t(`event${event.id}Description`)}
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