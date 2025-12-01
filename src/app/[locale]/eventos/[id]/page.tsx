'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { use, useEffect, useState } from 'react';
import { getEventById } from '@/services/eventService';

interface EventoDetalle {
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

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const t = useTranslations('eventos');
  const [event, setEvent] = useState<EventoDetalle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const data = await getEventById(id);
        setEvent(data);
        setError(null);
      } catch (err) {
        console.error('Error cargando evento:', err);
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);
  
  const handleShare = async () => {
    if (!event) return;
    
    const shareData = {
      title: event.titulo || event.nombre || t('untitledEvent'),
      text: event.descripcion_corta || event.descripcion || '',
      url: window.location.href
    };
    
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert(t('linkCopied') || '¡Enlace copiado al portapapeles!');
      }
    } catch (err) {
      console.error('Error al compartir:', err);
    }
  };

  if (loading) {
    return (
      <>
        <title>{t('eventDetailPageTitle')}</title>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <p className="text-center text-gray-500 text-lg">{t('loading') || 'Cargando evento...'}</p>
        </div>
      </>
    );
  }

  if (error || !event) {
    return (
      <>
        <title>{t('eventDetailPageTitle')}</title>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <p className="text-center text-red-500 text-lg">{t('errorLoading') || 'Error al cargar evento'}</p>
          {error && <p className="text-center text-gray-400 text-sm mt-2">{error}</p>}
          <div className="text-center mt-4">
            <Link href="/eventos" className="text-[var(--colorPrincipal)] hover:underline">
              {t('backToEvents') || 'Volver a eventos'}
            </Link>
          </div>
        </div>
      </>
    );
  }
  
  return (
    <>
      <title>{event.titulo || event.nombre || t('eventDetailPageTitle')}</title>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li><Link href="/eventos" className="hover:text-[var(--colorPrincipal)]">{t('eventsNav')}</Link></li>
            <li aria-hidden="true">›</li>
            <li aria-current="page" className="text-gray-900">{t('eventDetail')}</li>
          </ol>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          <div 
            className="lg:w-1/2"
            title={t('eventImageTooltip')}
          >
            <Image
              src={event.imagen || event.portada || '/Images/default-event.jpg'}
              alt={event.titulo || event.nombre || t('eventImageAlt')}
              width={600}
              height={800}
              className="w-full rounded-lg shadow-lg object-cover"
              title={t('bookImageTooltip')}
            />
          </div>
          
          <div className="lg:w-1/2">
            <header className="mb-6">
              <h1 
                className="font-serif text-4xl text-[var(--colorPrincipal)] mb-4"
                title={t('eventTitleTooltip')}
              >
                {event.titulo || event.nombre || t('untitledEvent')}
              </h1>
            </header>
            
            <div className="space-y-4 mb-6 bg-gray-50 p-4 rounded-lg">
  {event.fecha && (
    <div 
      className="flex items-start"
      title={t('eventDateTooltip')}
    >
      <span className="font-semibold text-[var(--colorPrincipal)] mr-3 min-w-[60px]">
        {t('date')}:
      </span>
      <time className="text-gray-700">
        {event.fecha}
      </time>
    </div>
  )}
  
  {event.hora && (
    <div 
      className="flex items-start"
      title={t('eventTimeTooltip')}
    >
      <span className="font-semibold text-[var(--colorPrincipal)] mr-3 min-w-[60px]">
        {t('time')}:
      </span>
      <span className="text-gray-700">{event.hora}</span>
    </div>
  )}
  
  {event.ubicacion && (
    <div 
      className="flex items-start"
      title={t('eventLocationTooltip')}
    >
      <span className="font-semibold text-[var(--colorPrincipal)] mr-3 min-w-[60px]">
        {t('location')}:
      </span>
      <address className="text-gray-700 not-italic">
        {event.ubicacion}
      </address>
    </div>
  )}
</div>
           <div 
              className="mb-8 border-t pt-6"
              title={t('eventDescriptionTooltip')}
            >
              <h2 className="text-xl font-semibold mb-3 text-[var(--colorPrincipal)]">
                {t('aboutEvent')}
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {event.descripcion || event.descripcion_corta || t('noDescription')}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/eventos/${id}/inscripcion`}
                className="bg-[var(--colorPrincipal)] text-white px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity focus:ring-2 focus:ring-[var(--colorPrincipal)] focus:ring-opacity-50 text-center"
                title={t('registerTooltip')}
              >
                {t('registerEvent')}
              </Link>
              <button 
                onClick={handleShare}
                className="border-2 border-[var(--colorPrincipal)] text-[var(--colorPrincipal)] px-8 py-3 rounded-lg font-medium hover:bg-[var(--colorPrincipal)] hover:text-white transition-colors focus:ring-2 focus:ring-[var(--colorPrincipal)] focus:ring-opacity-50"
                title={t('shareTooltip')}
              >
                {t('shareEvent')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}