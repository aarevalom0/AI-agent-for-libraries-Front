import SearchIcon from "@mui/icons-material/Search";
import {AutorCard} from "@/components/community/CommunityCard";
import { useTranslations } from 'next-intl';

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

        <button
          className="px-4 py-2 bg-[var(--colorMenus)] text-white rounded hover:bg-[var(--colorPrincipal)] transition"
        >
          {t('communityPage.createCommunity')}
        </button>
      </div>

      <div className="pl-2 flex items-center h-10 rounded-lg border border-gray-300 bg-gray-50 focus-within:ring-1 focus-within:ring-[var(--color-principal)]">
        <SearchIcon className="text-gray-500 " />
        <input
          type="text"
          placeholder={t('communityPage.searchPlaceholder')}
          className="flex-1 p-2 text-sm bg-transparent focus:outline-none"
        />
      </div>

      {authors.map((author, idx) => (
        <AutorCard
          key={idx}
          autor={author.name}
          descripcion={author.description}
          imageUrl={author.imageUrl}
          href={author.href}
          buttonText={t('communityPage.joinButton')}
        />
      ))}

      
    </div>
  );
}
