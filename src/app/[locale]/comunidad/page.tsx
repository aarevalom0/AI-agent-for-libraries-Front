import SearchIcon from "@mui/icons-material/Search";
import {AutorCard} from "@/components/community/CommunityCard";
import CrearComunidad from "./crearComunidad/page";
import { useTranslations } from 'next-intl';
import BotonPersonalizado from "@/components/elementos/BotonPersonalizado";

interface Community {
  name: string;
  description: string;
  imageUrl: string;
  href: string;
}
export default function ComunidadPage() {
  const t = useTranslations('communityPage');
  const authors = t.raw('communityPage.authors') as Community[];


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



      {authors.map((author, idx) => (
        <AutorCard
          key={idx}
          autor={author.name}
          descripcion={author.description}
          imageUrl={author.imageUrl}
          href={"#"}
          buttonText={t('communityPage.joinButton')}
        />
      ))}

      
    </div>
  );
}
