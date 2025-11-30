import Image from 'next/image';
import BotonPersonalizado from '@/components/elementos/BotonPersonalizado';

interface ComunidadCardProp {
  autor?: string;
  categoria?: string;
  descripcion: string;
  imageUrl: string;
  href: string;
  buttonText: string;
}

const AutorCard = ({ autor, descripcion, imageUrl, href, buttonText }: ComunidadCardProp) => {
  return (
    <div className="flex py-8 max-w-full gap-6 overflow-hidden">
      <div className="flex flex-col gap-3 flex-1 min-w-0">
        <div
          title="nombre del autor o comunidad"
          className="font-newsreader pt-5"
        >
          <h3>{autor}</h3>
          <p title={`descripcion del autor ${autor}`} className="text-[var(--colorSecundario)] text-[0.8rem] break-words">
            {descripcion}
          </p>
        </div>
        <div title={`unirse al autor ${autor}`} className="mt-auto pb-5">
          <BotonPersonalizado texto={buttonText} href={href} />
        </div>
      </div>

      <div
        className="relative w-[350px] h-[220px] flex-shrink-0"
        title={`Imagen para el autor ${autor}`}
      >
        <Image
          src={imageUrl}
          alt={`Imagen del autor ${autor}`}
          fill
          className="object-cover rounded-md"
          title={`Imagen del autor ${autor}`}
        />
      </div>
    </div>
  );
};

const ClubCard = ({categoria,descripcion,imageUrl, href, buttonText}: ComunidadCardProp) => {
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

export { AutorCard, ClubCard };
