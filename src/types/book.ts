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
}
