'use client';

import React, { useState } from 'react';
import styles from '@/components/Estadisticas.module.css';
import { rankingData } from '@/lib/mock-data';

// Función para formatear minutos a "X h Y min"
const formatTime = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours} h ${minutes.toString().padStart(2, '0')} min`;
};

const RankingLectores = () => {
  const [timeFilter, setTimeFilter] = useState('Total');

  // En una app real, aquí harías una llamada a la API con el filtro seleccionado.
  // Por ahora, usamos los mismos datos para todos los filtros.
  const sortedData = [...rankingData].sort((a, b) => b.readingTime - a.readingTime);

  return (
    <div className={styles.rankingContainer}>
      <h2 className={styles.rankingTitle}>Ranking de Lectores</h2>

      <div className={styles.filterButtons}>
        {['Hoy', 'Semana', 'Mes', 'Total'].map((filter) => (
          <button
            key={filter}
            className={`${styles.filterButton} ${timeFilter === filter ? styles.active : ''}`}
            onClick={() => setTimeFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <table className={styles.rankingTable}>
        <thead>
          <tr>
            <th>Posición</th>
            <th>Lector</th>
            <th>Tiempo de Lectura</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}º</td>
              <td>{user.name}</td>
              <td>{formatTime(user.readingTime)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RankingLectores;