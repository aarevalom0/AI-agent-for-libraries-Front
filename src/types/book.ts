import { AutorData } from "./author";
import { Review } from "./review";

export interface Book {
  id: string;
  title: string;
  author: string;
  cover?: string;
  description?: string;
  genres?: string[];
  infoURL?: string;
  status: 'leido' | 'leyendo' | 'por-leer';
  progress?: number; 
  completionDate?: string; 
  reviews: Review[];
}


export interface BookRecomendations {
  _id: string;
  titulo: string;
  autoresData: AutorData[];
  portada: string;
  descripcion?: string;
  genero?: string;
}
