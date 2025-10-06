import React from 'react';
import { useTranslations } from 'next-intl';
import { Metadata } from 'next';
import EstadisticasPersonales from '@/components/estadisticas/EstadisticasPersonales';

export const metadata: Metadata = {
  title: 'Estadísticas de Lectura - BookClub',
  description: 'Visualiza tu progreso de lectura y estadísticas personales',
};

const EstadisticasPage = () => {
  const t = useTranslations('estadisticas');
  
  return (
    <>
      <title>{t('pageTitle')}</title>
      <div className="max-w-6xl mx-auto px-4 py-8 font-sans">
        <header className="mb-8">
          <h1 
            className="font-serif text-4xl text-[var(--colorPrincipal)] mb-2"
            title={t('titleTooltip')}
          >
            {t('title')}
          </h1>
          <p 
            className="text-lg text-gray-600"
            title={t('descriptionTooltip')}
          >
            {t('description')}
          </p>
        </header>

        <main role="main">
          <EstadisticasPersonales />
        </main>
      </div>
    </>
  );
};

export default EstadisticasPage;