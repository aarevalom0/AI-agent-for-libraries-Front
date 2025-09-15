import { Book } from '@/types/book';
import BookDetail from '../../../../components/BookDetail';

async function getBook(id: string): Promise<Book> {
    // Simula fetch a un backend
  return {
    id,
      title: "La chica del tren",
      author: "Paula Hawkins",
      cover: "/Images/girl-train.jpg",
      description:
        "Un thriller psicológico lleno de giros inesperados que mantiene al lector atrapado hasta la última página.",
      genres: ['Thriller', 'Psicológico', 'Ficción'],
      infoURL: "https://es.wikipedia.org/wiki/La_chica_del_tren_(novela)",
      reviews: [
      {
          id: "r4",
          author: "Carlos Ramírez",
          avatar: "/Images/Perfil4.jpg",
          rating: 4,
          text: "Muy atrapante, aunque algunas partes son un poco lentas.",
          date: "2025-04-01",
          likes: 20,
          dislikes: 3,
        },
        {
          id: "r5",
          author: "Sofía Torres",
          avatar: "/Images/Perfil5.jpg",
          rating: 5,
          text: "No pude soltarlo, el final me dejó sin palabras.",
          date: "2025-05-01",
          likes: 35,
          dislikes: 2,
        },
        {
          id: "r6",
          author: "Luis Fernández",
          avatar: "/Images/Perfil6.jpg",
          rating: 3,
          text: "El libro es bueno, pero esperaba más acción.",
          date: "2025-06-01",
          likes: 15,
          dislikes: 10,
        }
      ],
      status: "leyendo"
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const book = await getBook(params.id);
  if (!book) return <div> Libro no encontrado</div>;
  return <BookDetail book={book} initialReviews={book.reviews} previousPage={'Mi biblioteca'} previousPageHref={'/miBiblioteca'} />;
}
