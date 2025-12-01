import { API_BASE_URL } from './api.config';

/**
 * Obtiene las estadísticas del usuario desde el backend
 * Endpoint: GET /users/:user_id/estadisticas
 */
export async function getEstadisticasUsuario(userId) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/estadisticas`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Error HTTP ${response.status}:`, errorText);
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('❌ Error obteniendo estadísticas del usuario:', error);
    throw error;
  }
}

/**
 * Actualiza las estadísticas del usuario
 */
export async function updateEstadisticasUsuario(userId, estadisticasData) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/estadisticas`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(estadisticasData),
    });
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error actualizando estadísticas del usuario:', error);
    throw error;
  }
}

/**
 * Obtiene el Ranking Global de lectores
 * Endpoint: GET /users/ranking/global
 */
export async function getRankingGlobal() {
  try {
    const response = await fetch(`${API_BASE_URL}/users/ranking/global`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('🏆 Ranking recibido:', data);
    return data;
  } catch (error) {
    console.error('❌ Error obteniendo ranking:', error);
    throw error;
  }
}