"use client";
import { useState, useEffect } from 'react';
import Insignias from '@/components/mainPage/Insignias';
import { getUserBadges, fillBadgeSlots } from '@/services/insigniaService';
import { useTranslations } from 'next-intl';
interface SeccionInsigniasProps {
  userId: string;
}
export default function SeccionInsignias({ userId }: SeccionInsigniasProps) {
  const t = useTranslations("mainPage");
  const [badges, setBadges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        setLoading(true);
        setError(null);
        const userBadges = await getUserBadges(userId);
        const badgesWithSlots = fillBadgeSlots(userBadges, 8);
        setBadges(badgesWithSlots);
      } catch (err) {
        console.error('Error cargando insignias:', err);
        setError('No se pudieron cargar las insignias');
        
        // Fallback: mostrar 8 espacios vacíos
        setBadges(fillBadgeSlots([], 8));
      } finally {
        setLoading(false);
      }
    };
    if (userId) {
      fetchBadges();
    }
  }, [userId]);

  return (
    <div title="Insignias y logros" className="justify-between items-center w-full px-4 pb-4">
      <h2 title="Titulo sección" className="text-xl font-bold !font-newsreader !text-[var(--colorClaro)]">
        {t('mainPage.badgesTitle')}
      </h2>
      
      {loading ? (
        <p className="text-[var(--colorClaro)] text-sm mt-2">Cargando insignias...</p>
      ) : error ? (
        <p className="text-red-400 text-sm mt-2">{error}</p>
      ) : null}
      
      <div title="Insignias" className="grid gap-3 grid-cols-[repeat(auto-fit,minmax(10rem,1fr))]">
        {badges.map((badge) => (
          <Insignias
            key={badge.id}
            nombre={badge.nombre}
            imageUrl={badge.imageUrl}
            data-testid="Insignias"
          />
        ))}
      </div>
    </div>
  );
}