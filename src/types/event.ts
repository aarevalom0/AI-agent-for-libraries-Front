export interface Event {
  id: string;
  title: string;
  description: string; // Descripción corta para la tarjeta
  fullDescription: string; // Descripción larga para la página de detalle
  imageUrl: string;
  href: string;
  date: string;
  time: string;
  location: string;
}