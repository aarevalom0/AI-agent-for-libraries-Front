'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { use } from 'react';

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const t = useTranslations('eventos');
  
  const handleShare = async () => {
    const shareData = {
      title: t(`event${id}Title`),
      text: t(`event${id}Description`),
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
  
  return (
    <>
      <title>{t('eventDetailPageTitle')}</title>
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
              src="/Images/secret-garden.jpg"
              alt={t('bookCoverAlt')}
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
                {t(`event${id}Title`)}
              </h1>
            </header>
            
            <div className="space-y-4 mb-6 bg-gray-50 p-4 rounded-lg">
  <div 
    className="flex items-start"
    title={t('eventDateTooltip')}
  >
    <span className="font-semibold text-[var(--colorPrincipal)] mr-3 min-w-[60px]">
      {t('date')}:
    </span>
    <time dateTime="2025-10-25" className="text-gray-700">
      {t(`event${id}Date`)}
    </time>
  </div>
  
  <div 
    className="flex items-start"
    title={t('eventTimeTooltip')}
  >
    <span className="font-semibold text-[var(--colorPrincipal)] mr-3 min-w-[60px]">
      {t('time')}:
    </span>
    <span className="text-gray-700">{t(`event${id}Time`)}</span>
  </div>
  
  <div 
    className="flex items-start"
    title={t('eventLocationTooltip')}
  >
    <span className="font-semibold text-[var(--colorPrincipal)] mr-3 min-w-[60px]">
      {t('location')}:
    </span>
    <address className="text-gray-700 not-italic">
      {t(`event${id}Location`)}
    </address>
  </div>
</div>
           <div 
              className="mb-8 border-t pt-6"
              title={t('eventDescriptionTooltip')}
            >
              <h2 className="text-xl font-semibold mb-3 text-[var(--colorPrincipal)]">
                {t('aboutEvent')}
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {t(`event${id}FullDescription`)}
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