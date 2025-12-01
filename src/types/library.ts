
export enum EstadoLectura {
  LEIDO = 'leído',
  LEYENDO = 'leyendo',
  POR_LEER = 'por_leer'
}


export interface Progreso {
  pagina_actual: number;
  porcentaje: number;
}


export interface LibroEnLibreria {
  libro_id: string | LibroDetails;
  estado: EstadoLectura;
  fecha_agregado: Date | string;
  fecha_inicio_lectura: Date | string | null;
  fecha_fin_lectura: Date | string | null;
  progreso?: Progreso;
}


export interface LibroDetails {
  _id: string;
  id?: string;
  titulo: string;
  autores: Array<{ nombre: string; [key: string]: any }>;
  portada: string;
  descripcion?: string;
  paginas?: number;
  [key: string]: any;
}


export interface LibraryEntity {
  id?: string;
  _id?: string;
  usuario_id: string;
  nombre: string;
  descripcion?: string;
  icon?:string;
  libros: LibroEnLibreria[];
  createdAt?: Date | string;
  updatedAt?: Date | string;
}


export interface LibraryWithBooks extends LibraryEntity {
  libros: LibroEnLibreriaWithDetails[];
}


export interface LibroEnLibreriaWithDetails extends Omit<LibroEnLibreria, 'libro_id'> {
  libro_id: LibroDetails;
}


export interface BookInLibrary {
  id: string;
  title: string;
  author: string;
  cover: string;
  estado: EstadoLectura;
  progreso: number;
  paginaActual: number;
  fechaAgregado: string | Date;
}


export interface CollectionDetails {
  id: string;
  nombre: string;
  descripcion?: string;
  libros: BookInLibrary[];
}

export interface LibraryItem {
  id: string;
  _id?: string;
  nombre: string;
  descripcion?: string;
  icon?:string;
  totalLibros: number;
}


export interface CreateLibraryDto {
  usuario_id: string;
  nombre: string;
  descripcion?: string;
  icon?:string;
  libros?: LibroEnLibreria[];
}


export interface UpdateLibraryDto {
  nombre?: string;
  descripcion?: string;
  icon?:string;
  libros?: LibroEnLibreria[];
}


export interface AddBookToLibraryDto {
  libro_id: string;
  estado?: EstadoLectura;
  fecha_agregado?: Date | string;
}


export interface UpdateProgressDto {
  pagina_actual: number;
  porcentaje: number;
}


export interface UpdateStatusDto {
  estado: EstadoLectura;
}


export interface GetCollectionsResponse {
  data: LibraryItem[];
  total: number;
}


export interface GetLibraryResponse extends LibraryEntity {
  libros: LibroEnLibreriaWithDetails[];
}


export interface GetAllBooksResponse extends Array<LibroEnLibreriaWithDetails> {}


export interface BibliotecaState {
  collections: LibraryItem[];
  allBooks: BookInLibrary[];
  currentCollection: CollectionDetails | null;
  loading: boolean;
  error: string | null;
  selectedCollection: string; // 'mi_biblioteca' o ID de colección
}


export type BibliotecaAction = 
  | { type: 'SET_COLLECTIONS'; payload: LibraryItem[] }
  | { type: 'SET_ALL_BOOKS'; payload: BookInLibrary[] }
  | { type: 'SET_CURRENT_COLLECTION'; payload: CollectionDetails }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_SELECTED_COLLECTION'; payload: string }
  | { type: 'ADD_COLLECTION'; payload: LibraryItem }
  | { type: 'REMOVE_COLLECTION'; payload: string }
  | { type: 'UPDATE_BOOK_PROGRESS'; payload: { bookId: string; progreso: number; paginaActual: number } }
  | { type: 'RESET' };