import { Book } from '@/types/book';
import BookDetail from '../../../../components/books/BookDetail';

async function getBook(id: string): Promise<Book> {
    // Simula fetch a un backend
  return {
    id,
    title: '1984',
    author: 'George Orwell',
    cover: '/Images/1984.jpg',
    description: 'Una increíble novela distópica, donde el Gran Hermano siempre está vigilando a todos. Esta abarca temas de totalitarismo, vigilancia y libertad individual.',
    genres: ['Distopía', 'Ciencia Ficción', 'Filosofía Política'],
    infoURL: 'https://es.wikipedia.org/wiki/1984_(novela)',
    reviews: [
      { id: 'r1', author: 'Angie Gutiérrez', avatar: '/Images/Perfil1.png', rating: 5, text: 'Un libro impactante y provocador, realmente te hace reflexionar sobre la sociedad actual.', date: '2025-01-01', likes: 50, dislikes: 5 },
      { id: 'r2', author: 'Juan Díaz', avatar: '/Images/Perfil2.jpg', rating: 4, text: 'Buen libro, muy interesante y bien escrito.', date: '2025-02-01', likes: 30, dislikes: 10 },
      { id: 'r3', author: 'María López', avatar: '/Images/Perfil3.jpg', rating:5, text:'Una obra divina que se debería leer al menos una vez en la vida.', date: '2025-03-01', likes: 40, dislikes: 2 },],
    status: "leyendo"
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const book = await getBook(params.id);
  if (!book) return <div> Libro no encontrado</div>;
  return <BookDetail book={book} initialReviews={book.reviews} previousPage={'Mi biblioteca'} previousPageHref={'/miBiblioteca'} />;
}
