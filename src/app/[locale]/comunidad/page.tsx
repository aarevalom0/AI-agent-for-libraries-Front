import SearchIcon from "@mui/icons-material/Search";
import {AutorCard} from "@/components/community/CommunityCard";

export default function ComunidadPage() {
  return (
    <div className="flex gap-5 flex-col p-5">
      <div className="flex justify-between items-center gap-4 mb-4">
        <h1
          title="Comunidad de Autores"
          className="text-2xl font-bold font-newsreader"
        >
          Comunidad de Autores
        </h1>

        <button
          className="px-4 py-2 bg-[var(--colorMenus)] text-white rounded hover:bg-[var(--colorPrincipal)] transition"
        >
          Crear Comunidad
        </button>
      </div>

      <div className="pl-2 flex items-center h-10 rounded-lg border border-gray-300 bg-gray-50 focus-within:ring-1 focus-within:ring-[var(--color-principal)]">
        <SearchIcon className="text-gray-500 " />
        <input
          type="text"
          placeholder="Buscar comunidades por nombre de autor"
          className="flex-1 p-2 text-sm bg-transparent focus:outline-none"
        />
      </div>

      <AutorCard
        autor="Haruki Murakami"
        descripcion="Sumérgete en universos oníricos y existenciales con el autor de Tokio Blues (Norwegian Wood)."
        imageUrl="/Images/Haruki.png"
        href="#"
      />

      <AutorCard
        autor="Isabel Allende"
        descripcion="Descubre las historias apasionantes de la autora de 'La casa de los espíritus'."
        imageUrl="/Images/Isabel.png"
        href="#"
      />

      <AutorCard
        autor="Margaret Atwood"
        descripcion="Explora futuros distópicos y realidades inquietantes con la autora de El cuento de la criada."
        imageUrl="/Images/Margaret.png"
        href="#"
      />

      <AutorCard
        autor="Stephen King"
        descripcion="Adéntrate en mundos de terror y suspenso con el autor de It y El resplandor."
        imageUrl="/Images/Stephen.png"
        href="#"
      />

    </div>
  );
}
