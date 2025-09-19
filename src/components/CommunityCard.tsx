import Image from "next/image";
import BotonPersonalizado from "@/components/BotonPersonalizado";

interface ComunidadCardProp {
  autor?: string;
  categoria?: string;
  descripcion: string;
  imageUrl: string;
  href: string;
}

const AutorCard = ({ autor, descripcion, imageUrl, href }: ComunidadCardProp) => {
  return (
    <div className="flex py-8 max-w-full gap-6 overflow-hidden">
      <div className="flex flex-col gap-3 flex-1 min-w-0">
        <div
          title="nombre del autor o comunidad"
          className="font-newsreader pt-5"
        >
          <h3>{autor}</h3>
          <p className="text-[var(--colorSecundario)] text-[0.8rem] break-words">
            {descripcion}
          </p>
        </div>
        <div className="mt-auto pb-5">
          <BotonPersonalizado texto="Unirse" href={href} />
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
        />
      </div>
    </div>
  );
};

const ClubCard = ({
  categoria,
  descripcion,
  imageUrl,
  href,
}: ComunidadCardProp) => {
  return (
    <div className="flex py-8 max-w-full gap-6 overflow-hidden">
      <div className="flex flex-col gap-3 flex-1 min-w-0">
        <div title="categoria del club" className="font-newsreader pt-5">
          <h3>{categoria}</h3>
          <p className="text-[var(--colorSecundario)] text-[0.8rem] break-words">
            {descripcion}
          </p>
        </div>
        <div className="mt-auto pb-5">
          <BotonPersonalizado texto="Unirme al club" href={href} />
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
        />
      </div>
    </div>
  );
};

export { AutorCard, ClubCard };
