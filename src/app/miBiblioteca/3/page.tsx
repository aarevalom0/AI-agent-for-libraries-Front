import BookDetail from '../../../components/BookDetail';

async function getBook(id: string) {
  // Simula fetch a un backend
  return {
    id,
    title: "Harry Potter y la piedra filosofal",
    author: "J.K. Rowling",
    cover: "/Images/harry-potter.jpg",
    description:
      "La primera entrega de la saga de Harry Potter, donde conocemos al joven mago y lo acompañamos en sus inicios en Hogwarts. Una historia mágica de amistad, valentía y aventuras.",
    reviews: [
      {
        id: "r7",
        author: "Ana Morales",
        avatar: "/Images/Perfil7.jpg",
        rating: 5,
        text: "Un inicio espectacular para una saga mágica. Me encantó desde la primera página.",
        date: "2025-07-01",
        likes: 60,
        dislikes: 4,
      },
      {
        id: "r8",
        author: "Pedro Sánchez",
        avatar: "/Images/Perfil8.jpg",
        rating: 4,
        text: "Muy bueno, aunque al ser introductorio tiene partes más infantiles.",
        date: "2025-07-15",
        likes: 25,
        dislikes: 6,
      },
      {
        id: "r9",
        author: "Laura Vélez",
        avatar: "/Images/Perfil9.jpg",
        rating: 5,
        text: "Un clásico moderno que marcó mi infancia. Siempre lo recomiendo.",
        date: "2025-08-01",
        likes: 70,
        dislikes: 2,
      },
    ],
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const book = await getBook(params.id);
  if (!book) return <div> Libro no encontrado</div>;
  return <BookDetail book={book} initialReviews={book.reviews} />;
}
