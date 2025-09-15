import { eventsData } from '@/lib/mock-data';
import Image from 'next/image';
import Link from 'next/link';

// Esta función de Next.js recibe los parámetros de la URL
export default function EventDetailPage({ params }: { params: { id: string } }) {
  // Buscamos el evento en nuestros datos usando el ID de la URL
  const event = eventsData.find((e) => e.id === params.id);

  // Si no se encuentra el evento, mostramos un mensaje amigable
  if (!event) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">Evento no encontrado</h1>
        <p className="mt-4">El evento que buscas no existe o ha sido movido.</p>
        <Link href="/mainPage" className="mt-6 inline-block bg-[var(--color-principal)] text-white px-6 py-2 rounded-md">
          Volver a Eventos
        </Link>
      </div>
    );
  }

  // Si se encuentra el evento, mostramos todos sus detalles
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        {/* Columna de la imagen */}
        <div className="relative h-80 md:h-full rounded-lg overflow-hidden">
          <Image
            src={event.imageUrl}
            alt={`Imagen de ${event.title}`}
            fill
            className="object-cover"
          />
        </div>

        {/* Columna de la información */}
        <div className="flex flex-col">
          <h1 className="font-serif text-4xl font-bold text-[var(--color-principal)] mb-4">
            {event.title}
          </h1>
          
          <div className="space-y-4 text-lg text-[var(--color-secundario)] mb-6">
            <p><strong>Fecha:</strong> {event.date}</p>
            <p><strong>Hora:</strong> {event.time}</p>
            <p><strong>Lugar:</strong> {event.location}</p>
          </div>

          <p className="text-base leading-relaxed text-[var(--foreground)]">
            {event.fullDescription}
          </p>

          <div className="mt-auto pt-8">
             <Link href="/mainPage" className="inline-block bg-[var(--color-principal)] text-white px-8 py-3 rounded-lg hover:opacity-90 transition-opacity">
                Inscribirse al evento
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}