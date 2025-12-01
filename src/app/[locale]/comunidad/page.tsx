"use client";
import SearchIcon from "@mui/icons-material/Search";
import {CommunityCard} from "@/components/community/CommunityCard";
import CrearComunidad from "./crearComunidad/page";
import { useTranslations } from 'next-intl';
import BotonPersonalizado from "@/components/elementos/BotonPersonalizado";
import { getAllCommunities } from "@/services/communityService";
import { useEffect, useState } from "react";

interface puntuacion {
  id: string;
  puntuacion: number;
  fecha_puntuacion: Date;
}
interface Community {
  nombre: string;
  descripcion: string;
  authorId: string;
  fecha_creacion: string;
  puntuaciones: puntuacion[];
}
export default function ComunidadPage() {
  const t = useTranslations('communityPage');
  
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        setLoading(true);
        const data = await getAllCommunities();
        setCommunities(data);
      } catch (err) {
        console.error("Error fetching communities:", err);
        setError("Error al cargar las comunidades.");
      } finally {
        setLoading(false);
      }
    };

    fetchCommunities();
  }, []);

  return (
    <div className="flex gap-5 flex-col p-5">
      <div className="flex justify-between items-center gap-4 mb-4">
        <h1
          title="Comunidad de Autores"
          className="text-2xl font-bold font-newsreader"
        >
          {t('communityPage.title')}
        </h1>


        <BotonPersonalizado
          texto={t('communityPage.createCommunity')}
          href="/comunidad/crearComunidad"
          ariaLabel={t('communityPage.createCommunity')}
        />
      </div>

      <div className="border-t border-gray-300">
        {loading ? (
                <div className="flex justify-center items-center h-64">
                    <p className="text-lg text-[var(--text)]">Cargando libros...</p>
                </div>
            ) : error ? (
                <div className="flex justify-center items-center h-64">
                    <p className="text">No se pudieron cargar las comunidades.</p>
                </div>
            ) : (
                <div>
                    {communities.map((community) => (
                        <CommunityCard
                            key={community.nombre}
                            nombre={community.nombre}
                            descripcion={community.descripcion}
                            authorId={community.authorId}
                            fecha_creacion={new Date(community.fecha_creacion)}
                            puntuaciones={community.puntuaciones}
                        />
                    ))}
                </div>
            )}
      </div>




      
    </div>
  );
}
