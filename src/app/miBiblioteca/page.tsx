import BookCard from '@/components/BookCard';
import SideMenu from '@/components/SideMenu';
import Search from '@mui/icons-material/Search';

const books = [
  { id: '1', title: '1984', autor: 'George Orwell', imageUrl: '/Images/1984.jpg', href: '/miBiblioteca/1' },
  { id: '2', title: 'La chica del tren', autor: 'Paula Hawkins', imageUrl: '/Images/girl-train.jpg', href: '/miBiblioteca/2' },
  { id: '3', title: 'Harry Potter y la piedra filosofal', autor: 'J.K. Rowling', imageUrl: '/Images/harry-potter.jpg', href: '/miBiblioteca/3' },
];

export default function BibliotecaPage() {
  return (
    <div className="p-8 flex gap-5">
      <div>
        <SideMenu/>
      </div>

      <div className='w-full'>
        {/* Header con título y botón */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Mi Biblioteca</h1>
          <button className="px-4 py-2 border border-white text-white rounded-lg hover:bg-white hover:text-black transition">
            Solicitar libro
          </button>
        </div>

        {/* Barra de búsqueda */}
        <div className="mb-8 w-full">
          <div className="flex items-center w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-[var(--colorPrimario)]">
            <Search className="w-5 h-5 text-gray-400 mr-3" />
            <input
              type="text"
              placeholder="Buscar en mi biblioteca"
              className="w-full bg-transparent outline-none text-white placeholder-gray-400"
            />
          </div>
        </div>

        {/* Grid de libros */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {books.map((b) => (
            <BookCard
              key={b.id}
              title={b.title}
              autor={b.autor}
              imageUrl={b.imageUrl}
              href={`/miBiblioteca/${b.id}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
