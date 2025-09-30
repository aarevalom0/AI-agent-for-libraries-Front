import SearchIcon from "@mui/icons-material/Search";
import EventCard from '@/components/eventos/EventCard';

export default function ComunidadPage() {
  return (
    <div className="w-full">

      <div className="flex justify-between items-center gap-4 mb-4">
        <h1 title="Comunidad de Autores" className="text-2xl font-bold font-newsreader">
          Comunidad de Autores
        </h1>

        <button 
          className="px-4 py-2 bg-[var(--colorMenus)] text-white rounded hover:bg-[var(--colorPrincipal)] transition"
        >
          Crear Comunidad
        </button>
      </div>

      <div className="pl-2 flex items-center h-10 rounded-lg border border-gray-300 bg-gray-50 focus-within:ring-1 focus-within:ring-[var(--color-principal)] ">
        <SearchIcon className="text-gray-500 " />
        <input
        type="text"
        placeholder="Buscar comunidades por nombre de autor"
        className="flex-1 p-2 text-sm bg-transparent focus:outline-none"/>
      </div>

      <EventCard
        title="Club de Lectura: Ciencia Ficción"
        descripcion="Únete a nuestro club de lectura mensual donde exploramos los mejores libros de ciencia ficción."
        imageUrl="/Images/dune.jpg"
        href="#"
      />

      <EventCard
        title="Foro de Autores Emergentes"
        descripcion="Un espacio para que los autores emergentes compartan sus obras y reciban retroalimentación constructiva."
        imageUrl="/Images/authors.jpg"
        href="#"
      />
    </div>
  );
}



