import SearchIcon from "@mui/icons-material/Search";
import {ClubCard} from "@/components/community/CommunityCard";

export default function ClubesPage() {
  return (
    <div className="flex gap-5 flex-col p-5">
      <div className="flex justify-between items-center gap-4 mb-4">
        <h1
          title="Clubes de Lectura"
          className="text-2xl font-bold font-newsreader"
        >
          Clubes de Lectura
        </h1>

      </div>

      <div className="pl-2 flex items-center h-10 rounded-lg border border-gray-300 bg-gray-50 focus-within:ring-1 focus-within:ring-[var(--color-principal)]">
        <SearchIcon className="text-gray-500 " />
        <input
          type="text"
          placeholder="Buscar comunidades por nombre de autor"
          className="flex-1 p-2 text-sm bg-transparent focus:outline-none"
        />
      </div>

      <ClubCard
        categoria="Ciencia Ficción"
        descripcion="Explora mundos futuristas y tecnologías avanzadas con otros entusiastas de la ciencia ficción."
        imageUrl="/images/comunidad/club-ciencia-ficcion.jpg"
        href="/comunidad/club/ciencia-ficcion"
      />
      <ClubCard
        categoria="Misterio y Suspenso"
        descripcion="Sumérgete en tramas intrigantes y resuelve enigmas junto a otros amantes del misterio."
        imageUrl="/images/comunidad/club-misterio.jpg"
        href="/comunidad/club/misterio"
      />
      
    </div>
  );
}
