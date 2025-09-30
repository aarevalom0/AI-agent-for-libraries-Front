// src/data/readerBooks.ts
export type Review = {
  id: string; author: string; avatar?: string;
  rating: number; text: string; date: string;
  likes?: number; dislikes?: number;
};

export type Book = {
  id: string;             // igual al slug
  title: string;
  author: string;
  cover: string;          // ruta en /public/Images
  description: string;
  genres: string[];
  infoURL?: string;
  reviews: Review[];
  status?: "Leyendo" | "Pendiente" | "Completado";
};

export const BOOKS: Record<string, Book> = {
  "1984": {
    id: "1984",
    title: "1984",
    author: "George Orwell",
    cover: "/Images/1984.jpg",
    description:
      "Distopía sobre vigilancia total y manipulación del lenguaje.",
    genres: ["Ciencia Ficción", "Distopía"],
    reviews: [
      { id: "n1", author: "Angie", rating: 5, text: "Impactante.", date: "2025-01-01" },
      { id: "n2", author: "Juan",  rating: 4, text: "Muy actual.", date: "2025-02-01" },
    ],
    status: "Leyendo",
  },

  "girl-train": {
    id: "girl-train",
    title: "La chica del tren",
    author: "Paula Hawkins",
    cover: "/Images/girl-train.jpg",
    description:
      "Thriller psicológico con giros que mantiene la tensión hasta el final.",
    genres: ["Misterio", "Thriller"],
    reviews: [
      { id: "gt1", author: "Sofía", rating: 5, text: "No pude soltarlo.", date: "2025-05-01" },
      { id: "gt2", author: "Luis",  rating: 3, text: "Esperaba más acción.", date: "2025-06-01" },
    ],
    status: "Leyendo",
  },

  "harry-potter": {
    id: "harry-potter",
    title: "Harry Potter y la piedra filosofal",
    author: "J.K. Rowling",
    cover: "/Images/harry-potter.jpg",
    description:
      "Inicio de la saga: amistad, magia y aventura en Hogwarts.",
    genres: ["Fantasía", "Aventura", "Juvenil"],
    reviews: [
      { id: "hp1", author: "Ana",  rating: 5, text: "Mágico inicio.", date: "2025-07-01" },
      { id: "hp2", author: "Pedro", rating: 4, text: "Muy entretenido.", date: "2025-07-15" },
    ],
    status: "Leyendo",
  },

  "dune": {
    id: "dune",
    title: "Dune",
    author: "Frank Herbert",
    cover: "/Images/dune.jpg",
    description:
      "Épica de ciencia ficción sobre poder, ecología y destino en Arrakis.",
    genres: ["Ciencia Ficción"],
    reviews: [{ id: "du1", author: "Marcos", rating: 5, text: "Universo inmenso.", date: "2025-03-20" }],
    status: "Pendiente",
  },

  "lotr": {
    id: "lotr",
    title: "El señor de los anillos",
    author: "J.R.R. Tolkien",
    cover: "/Images/lotr.jpg",
    description:
      "La compañía del anillo emprende la misión de destruir el Anillo Único.",
    genres: ["Fantasía", "Aventura"],
    reviews: [{ id: "lo1", author: "Lau", rating: 5, text: "Clásico absoluto.", date: "2025-03-03" }],
    status: "Pendiente",
  },

  "sapiens": {
    id: "sapiens",
    title: "Sapiens: De animales a dioses",
    author: "Yuval Noah Harari",
    cover: "/Images/sapiens.jpg",
    description:
      "Historia de la humanidad: de la prehistoria a la era moderna.",
    genres: ["No Ficción", "Historia"],
    reviews: [{ id: "sa1", author: "Irene", rating: 5, text: "Revela patrones de nuestra especie.", date: "2025-01-02" }],
    status: "Pendiente",
  },

  "cien-anios": {
    id: "cien-anios",
    title: "Cien años de soledad",
    author: "Gabriel García Márquez",
    cover: "/Images/CienAniosSoledad.jpg",
    description:
      "Realismo mágico en la saga de la familia Buendía en Macondo.",
    genres: ["Ficción", "Realismo mágico"],
    reviews: [{ id: "ca1", author: "Carlos", rating: 5, text: "Obra maestra latinoamericana.", date: "2025-02-11" }],
    status: "Pendiente",
  },

  "secret-garden": {
    id: "secret-garden",
    title: "The Secret Garden",
    author: "Frances H. Burnett",
    cover: "/Images/secret-garden.jpg",
    description: "Amistad, naturaleza y crecimiento personal.",
    genres: ["Clásico"],
    reviews: [{ id: "sg1", author: "Irene", rating: 5, text: "Encantador.", date: "2025-01-02" }],
    status: "Pendiente",
  },

  "pride-prejudice": {
    id: "pride-prejudice",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    cover: "/Images/pride.jpg",
    description: "Romance y crítica social con diálogos brillantes.",
    genres: ["Clásico"],
    reviews: [{ id: "pp1", author: "Carlos", rating: 5, text: "Obra maestra.", date: "2025-02-11" }],
    status: "Pendiente",
  },

  "to-kill-mockingbird": {
    id: "to-kill-mockingbird",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    cover: "/Images/mockingbird.jpg",
    description: "Justicia, empatía y racismo en el sur de EE. UU.",
    genres: ["Clásico"],
    reviews: [{ id: "tkm1", author: "Vale", rating: 5, text: "Conmovedor.", date: "2025-04-01" }],
    status: "Pendiente",
  },

  "great-gatsby": {
    id: "great-gatsby",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    cover: "/Images/gatsby.jpg",
    description: "Sueño americano, lujo y desilusión en los años 20.",
    genres: ["Clásico"],
    reviews: [{ id: "gg1", author: "Lau", rating: 4, text: "Prosa hermosa.", date: "2025-03-03" }],
    status: "Pendiente",
  },
};

