import { Book } from '@/types/book';
import { Event } from '@/types/event';


export const userBooks: Book[] = [
  {
    id: '1',
    title: 'Cien Años de Soledad',
    author: 'Gabriel García Márquez',
    cover: '/Images/CienAniosSoledad.jpg',
    genres: ['Realismo Mágico'],
    status: 'leido',
    progress: 417,
    completionDate: '2025-02-15',
    reviews: []
  },
  {
    id: '2',
    title: '1984',
    author: 'George Orwell',
    cover: '/Images/1984.jpg',
    genres: ['Ciencia Ficción'],
    status: 'leido',
    progress: 328,
    completionDate: '2025-04-05',
    reviews: [
      { id: 'r1', author: 'Angie Gutiérrez', avatar: '/Images/Perfil1.png', rating: 5, text: 'Un libro impactante y provocador, realmente te hace reflexionar sobre la sociedad actual.', date: '2025-01-01', likes: 50, dislikes: 5 },
      { id: 'r2', author: 'Juan Díaz', avatar: '/Images/Perfil2.jpg', rating: 4, text: 'Buen libro, muy interesante y bien escrito.', date: '2025-02-01', likes: 30, dislikes: 10 },
      { id: 'r3', author: 'María López', avatar: '/Images/Perfil3.jpg', rating: 5, text: 'Una obra divina que se debería leer al menos una vez en la vida.', date: '2025-03-01', likes: 40, dislikes: 2 }
    ]
  },
  {
    id: '3',
    title: 'Dune',
    author: 'Frank Herbert',
    cover: '/Images/dune.jpg',
    genres: ['Ciencia Ficción'],
    status: 'leido',
    progress: 150,
    completionDate: '2025-04-05',   
    reviews: []
  },
  {
    id: '4',
    title: 'El Señor de los Anillos',
    author: 'J.R.R. Tolkien',
    cover: '/Images/lotr.jpg',
    genres: ['Fantasía', 'Ciencia Ficción'],
    status: 'leido',
    progress: 500,
    completionDate: '2025-08-22',
    reviews: []
  },
  {
    id: '5',
    title: 'Sapiens: De animales a dioses',
    author: 'Yuval Noah Harari',
    cover: '/Images/sapiens.jpg',
    description: 'Una breve historia de la humanidad que explora',
    genres: ['No Ficción', 'Historia'],
    infoURL: 'https://www.example.com/sapiens',
    status: 'leido',
    progress: 350,
    completionDate: '2024-11-10', // Libro del año pasado
    reviews: []
  },
  {
    id: '6',
    title: 'El Jardín Secreto',
    author: 'Frances Hodgson Burnett',
    cover: '/Images/harry-potter.jpg', // Placeholder image
    description: 'Un clásico de la literatura infantil sobre la magia de la amistad y la naturaleza.',
    genres: ['Clásico'],
    infoURL: 'https://www.example.com/el-jardin-secreto',
    status: 'leido',
    progress: 100,    
    completionDate: '2025-01-20',
    reviews: []
  },
  {
    id: '7',
    title: 'Tian Guan Ci Fu (Heaven Official\'s Blessing)',
    author: 'Mo Xiang Tong Xiu',
    cover: '', // Placeholder image
    description: 'Un clásico de la literatura infantil sobre la magia de la amistad y la naturaleza.',
    genres: ['Clásico', 'Fantasía', 'Ciencia Ficción', 'Danmei'],
    infoURL: 'https://www.example.com/el-jardin-secreto',
    status: 'leido',
    progress: 1000,    
    completionDate: '2025-09-05',
    reviews: []
  },
  {
    id: '8',
    title: 'La chica del tren',
    author: 'Paula Hawkins',
    cover: '/Images/girl-train.jpg',
    description: 'Un thriller psicológico lleno de giros inesperados que mantiene al lector atrapado hasta la última página.',
    genres: ['Thriller', 'Psicológico', 'Ficción'],
    infoURL: 'https://es.wikipedia.org/wiki/La_chica_del_tren_(novela)',
    status: 'leyendo',
    progress: 200,
    reviews: [
      { id: 'r4', author: 'Carlos Ramírez', avatar: '/Images/Perfil4.jpg', rating: 4, text: 'Muy atrapante, aunque algunas partes son un poco lentas.', date: '2025-04-01', likes: 20, dislikes: 3 },
      { id: 'r5', author: 'Sofía Torres', avatar: '/Images/Perfil5.jpg', rating: 5, text: 'No pude soltarlo, el final me dejó sin palabras.', date: '2025-05-01', likes: 35, dislikes: 2 },
      { id: 'r6', author: 'Luis Fernández', avatar: '/Images/Perfil6.jpg', rating: 3, text: 'El libro es bueno, pero esperaba más acción.', date: '2025-06-01', likes: 15, dislikes: 10 }
    ]
  },
  {
    id: '9',
    title: 'Harry Potter y la piedra filosofal',
    author: 'J.K. Rowling',
    cover: '/Images/harry-potter.jpg',
    description: 'La primera entrega de la saga de Harry Potter, donde conocemos al joven mago y lo acompañamos en sus inicios en Hogwarts. Una historia mágica de amistad, valentía y aventuras.',
    genres: ['Fantasía', 'Aventura', 'Juvenil'],
    infoURL: 'https://es.wikipedia.org/wiki/Harry_Potter_y_la_piedra_filosofal',
    status: 'leyendo',
    progress: 310,
    reviews: [
      { id: 'r7', author: 'Ana Morales', avatar: '/Images/Perfil7.jpg', rating: 5, text: 'Un inicio espectacular para una saga mágica. Me encantó desde la primera página.', date: '2025-07-01', likes: 60, dislikes: 4 },
      { id: 'r8', author: 'Pedro Sánchez', avatar: '/Images/Perfil8.jpg', rating: 4, text: 'Muy bueno, aunque al ser introductorio tiene partes más infantiles.', date: '2025-07-15', likes: 25, dislikes: 6 },
      { id: 'r9', author: 'Laura Vélez', avatar: '/Images/Perfil9.jpg', rating: 5, text: 'Un clásico moderno que marcó mi infancia. Siempre lo recomiendo.', date: '2025-08-01', likes: 70, dislikes: 2 }
    ]
  },
];
export interface RankingUser {
  id: string;
  name: string;
  readingTime: number; // Tiempo total en minutos
}

export const rankingData: RankingUser[] = [
  { id: '1', name: 'Ana García', readingTime: 15015 }, // 250h 15m
  { id: '2', name: 'Carlos López', readingTime: 14745 }, // 245h 45m
  { id: '3', name: 'Sofía Martínez', readingTime: 13830 }, // 230h 30m
  { id: '4', name: 'Javier Pérez', readingTime: 13200 }, // 220h 00m
  { id: '5', name: 'Isabel Rodríguez', readingTime: 12920 }, // 215h 20m
  { id: '6', name: 'Miguel Álvarez', readingTime: 12350 }, // 205h 50m
  { id: '7', name: 'Laura Gómez', readingTime: 11800 },
  { id: '8', name: 'David Fernández', readingTime: 11500 },
];


export const eventsData: Event[] = [
  {
    id: '1',
    title: 'Reunión del Club de Lectura: “El jardín secreto”',
    description: 'Acompáñanos en una discusión sobre la novela clásica de Frances Hodgson Burnett. Comparte tus pensamientos e interpretaciones con otros lectores.',
    fullDescription: 'Únete a nuestro club de lectura mensual para una velada encantadora discutiendo "El jardín secreto". Exploraremos los temas de la amistad, la naturaleza y la transformación personal. El evento es gratuito y abierto a todos. ¡No olvides traer tu copia del libro!',
    imageUrl: '/Images/girl-train.jpg',
    href: '/eventos/1',
    date: '25 de Octubre, 2025',
    time: '7:00 PM - 8:30 PM',
    location: 'Biblioteca Central, Sala de Conferencias B',
  },
  {
    id: '2',
    title: 'Charla con la autora: Amelia Stone',
    description: 'Conoce a Amelia Stone, autora de “Susurros del pasado”, mientras comparte su proceso de escritura y responde preguntas del público.',
    fullDescription: 'Amelia Stone, la aclamada autora de la saga "Susurros del pasado", nos visitará para una sesión íntima de preguntas y respuestas. Descubre sus inspiraciones, su proceso creativo y qué le depara el futuro. Habrá una firma de libros al final del evento.',
    imageUrl: '/Images/clublecturavirtual.jpg',
    href: '/eventos/2',
    date: '12 de Noviembre, 2025',
    time: '6:00 PM - 7:30 PM',
    location: 'Librería El Gran Saber, Piso 2',
  },
];