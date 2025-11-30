import { API_BASE_URL } from './api.config';

/**
 * Obtiene las insignias del usuario actual
 * @param {string} userId - ID del usuario
 * @returns {Promise<Array>} Array de insignias del usuario
 */
export async function getUserBadges(userId:string) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/insignias`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Si necesitas autenticación:
        // 'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    const badges = await response.json();
    return badges;
  } catch (error) {
    console.error('Error obteniendo insignias:', error);
    throw error;
  }
}


export function transformBadgeFromAPI(badgeFromAPI:any) {
  return {
    id: badgeFromAPI.id,
    nombre: badgeFromAPI.nombre,
    imageUrl: badgeFromAPI.icono, 
    descripcion: badgeFromAPI.descripcion,
  };
}


export function fillBadgeSlots(userBadges:any, totalSlots = 8) {

  const transformedBadges = userBadges.map(transformBadgeFromAPI);
  const emptySlots = totalSlots - transformedBadges.length;
  
  const emptyBadges = Array(Math.max(0, emptySlots)).fill(null).map((_, index) => ({
    id: `empty-${index}`,
    nombre: 'Espacio nuevas Insignias',
    imageUrl: '',
  }));

  return [...transformedBadges, ...emptyBadges];
}