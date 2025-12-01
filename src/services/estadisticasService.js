import { API_BASE_URL } from './api.config';

/**
 * Obtiene las estadísticas del usuario desde el backend
 * Endpoint: GET /users/:user_id/estadisticas
 * @param {string} userId - ID del usuario
 * @returns {Promise<Object>} Estadísticas del usuario con formato:
 * {
 *   estadisticas: {
 *     total_libros_leidos, total_paginas_leidas, 
 *     tiempo_total_lectura, generos_leidos
 *   },
 *   racha_lectura: {
 *     dias_consecutivos, fecha_inicio_racha, ultima_fecha_lectura
 *   }
 * }
 */
export async function getEstadisticasUsuario(userId) {
  try {
    console.log(`📡 Llamando a: ${API_BASE_URL}/users/${userId}/estadisticas`);
    
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
    console.log('✅ Estadísticas recibidas:', data);
    return data;
  } catch (error) {
    console.error('❌ Error obteniendo estadísticas del usuario:', error);
    throw error;
  }
}

/**
 * Actualiza las estadísticas del usuario
 * Endpoint: PUT /users/:user_id/estadisticas
 * @param {string} userId - ID del usuario
 * @param {Object} estadisticasData - Datos de estadísticas a actualizar
 * @returns {Promise<Object>} Usuario actualizado
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
