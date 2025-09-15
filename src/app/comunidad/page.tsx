import SearchIcon from "@mui/icons-material/Search";
import CommunityCard from "@/components/CommunityCard";

export default function ComunidadPage() {
  return (
    <>
      <div className="flex justify-between items-center gap-4 mb-4">
        <h1 title="Comunidad de Autores" className="text-2xl font-bold font-newsreader">
          Comunidad de Autores
        </h1>

        <button 
          className="px-4 py-2 bg-[var(--colorMenus)] text-white rounded hover:bg-[var(--colorPrincipal)] transition"
        >
          Unirse a la Comunidad
        </button>
      </div>

      <div className="pl-2 flex items-center h-10 rounded-lg border border-gray-300 bg-gray-50 focus-within:ring-1 focus-within:ring-[var(--color-principal)] ">
        <SearchIcon className="text-gray-500 " />
        <input
        type="text"
        placeholder="Buscar comunidades por nombre de autor"
        className="flex-1 p-2 text-sm bg-transparent focus:outline-none"/>
      </div>

      <CommunityCard
        autor="Haruki Murakami"
        descripcion="Sumérgete en el mundo surrealista de Murakami, donde lo cotidiano se mezcla con lo fantástico en relatos que exploran la soledad, el amor y la búsqueda de identidad."
        imageUrl="/Images/circulo-lectores.jpg"
      />

      <CommunityCard
        autor="Isabel Allende"
        descripcion="Explora las ricas tradiciones y la historia de América Latina a través de las narrativas apasionadas de Allende, que entrelazan lo mágico con lo real en historias de amor, pérdida y esperanza."
        imageUrl="/Images/comunidad2.jpg"
      />
      <CommunityCard
        autor="Gabriel García Márquez"
        descripcion="Adéntrate en el realismo mágico de García Márquez, donde lo extraordinario se convierte en parte de la vida cotidiana, revelando las complejidades de la naturaleza humana y la historia de América Latina."
        imageUrl="/Images/comunidad3.jpg"
      />
      <CommunityCard
        autor="Chimamanda Ngozi Adichie"
        descripcion="Descubre las poderosas narrativas de Adichie, que abordan temas de identidad, feminismo y la diáspora africana, ofreciendo una perspectiva fresca y crítica sobre la sociedad contemporánea."
        imageUrl="/Images/comunidad4.jpg"
      />

      <CommunityCard
        autor="J.K. Rowling"
        descripcion="Adéntrate en el mundo mágico de Harry Potter, donde la amistad, el coraje y la lucha contra el mal se entrelazan en una narrativa épica que ha cautivado a millones."
        imageUrl="/Images/comunidad5.jpg"
      />

    </>
  );
}



