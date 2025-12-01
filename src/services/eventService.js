import { API_BASE_URL } from './api.config';

export async function getAllEvents() {
  try {
    const response = await fetch(`${API_BASE_URL}/eventos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error obteniendo eventos:', error);
    throw error;
  }
}

export async function getEventById(eventId) {
  try {
    const response = await fetch(`${API_BASE_URL}/eventos/${eventId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error obteniendo evento ${eventId}:`, error);
    throw error;
  }
}


export async function getFeaturedEvent() {
    try {
        const allEvents = await getAllEvents();
        return allEvents[0] || null;
    } catch {
        throw error;
    }
}


export function transformEventFromAPI(eventFromAPI) {
  return {
    id: eventFromAPI.id,
    pretitulo: eventFromAPI.categoria || 'Evento destacado',
    title: eventFromAPI.titulo || eventFromAPI.nombre,
    descripcion: eventFromAPI.descripcion_corta || eventFromAPI.descripcion,
    imageUrl: eventFromAPI.imagen || eventFromAPI.portada,
    href: `/eventos/${eventFromAPI.id}`,
    // Campos adicionales si los necesitas
    fecha: eventFromAPI.fecha,
    hora: eventFromAPI.hora,
    ubicacion: eventFromAPI.ubicacion,
  };
}

export async function inscribirUsuarioEvento(eventoId, inscripcionData) {
  try {
    const response = await fetch(`${API_BASE_URL}/eventos/${eventoId}/inscripcion`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inscripcionData),
    });
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error inscribiendo usuario al evento:', error);
    throw error;
  }
}