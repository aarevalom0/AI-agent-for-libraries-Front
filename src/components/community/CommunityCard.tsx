import Image from 'next/image';
import BotonPersonalizado from '@/components/elementos/BotonPersonalizado';
import { Calendar, Star } from 'lucide-react';

interface puntuacion {
  id: string;
  puntuacion: number;
  fecha_puntuacion: Date;
}
interface ComunidadCardProp {
  nombre?: string;
  descripcion?: string;
  authorId?: string;
  fecha_creacion?: Date;
  puntuaciones?: Array<puntuacion>;
}

interface ClubCardProp {
  categoria: string;
  descripcion: string;
  imageUrl: string;
  href: string;
  buttonText: string;
}



const ClubCard = ({categoria,descripcion,imageUrl, href, buttonText}: ClubCardProp) => {
  return (
    <div className="flex py-8 max-w-full gap-6 overflow-hidden">
      <div className="flex flex-col gap-3 flex-1 min-w-0">
        <div title="categoria del club" className="font-newsreader pt-5">
          <h3>{categoria}</h3>
          <p title={`descripcion del club ${categoria}`} className="text-[var(--colorSecundario)] text-[0.8rem] break-words">
            {descripcion}
            
          </p>
        </div>
        <div title={`unirse al club ${categoria}`} className="mt-auto pb-5">
          <BotonPersonalizado texto={buttonText} href={href} />
        </div>
      </div>

      <div
        className="relative w-[350px] h-[220px] flex-shrink-0"
        title={`Imagen para el club ${categoria}`}
      >
        <Image
          src={imageUrl}
          alt={`Imagen del club ${categoria}`}
          fill
          className="object-cover rounded-md"
          title={`Imagen del club ${categoria}`}
        />
      </div>
    </div>
  );
};


const CommunityCard = ({nombre, descripcion, authorId, fecha_creacion, puntuaciones}:ComunidadCardProp) => {
  const formatearFecha = (fecha: Date) => {
    return fecha.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  const score = () => {
    if (!puntuaciones || puntuaciones.length === 0  || puntuaciones.some(p => p.puntuacion === undefined || puntuaciones === null)) return '0.0';
    let total = 0;
    for (let i = 0; i < puntuaciones.length; i++) {
      total += puntuaciones[i].puntuacion;
    }
    return (total / puntuaciones.length).toFixed(1);
  };

  return (
    <div className="flex py-8 max-w-full gap-6 overflow-hidden">
      <div className="flex flex-col gap-3 flex-1 min-w-0">
        
        <div title="nombre de la comunidad" >
          <h3 className="text-xl font-bold">
            {nombre}
          </h3>
          <p 
            title={`descripcion de la comunidad ${nombre}`} 
          >
            {descripcion}
          </p>
        </div>
      </div>
      <div >
          {puntuaciones && puntuaciones.length > 0 && (
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
              <span className="font-medium">{score()}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-[var(--colorSecundario)]" />
            <span>{formatearFecha(fecha_creacion!)}</span>
          </div>
        </div>

      
    </div>
  );
}
export { CommunityCard, ClubCard };
