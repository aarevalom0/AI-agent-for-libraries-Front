'use client';

import React, { useEffect, useState } from 'react';
import styles from './Estadisticas.module.css';
import { getRankingGlobal } from '@/services/estadisticasService';

const RankingLectores = () => {
  const [ranking, setRanking] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const data = await getRankingGlobal();
        setRanking(data);
      } catch (error) {
        console.error("Error cargando ranking:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRanking();
  }, []);

  if (loading) {
    return <p className={styles.loadingText}>Cargando ranking...</p>;
  }

  return (
    <div className={styles.rankingContainer}>
      <h2 className={styles.rankingTitle}>Ranking de Lectores</h2>
      
      {/* Filtros visuales (opcional si solo tienes un ranking global) */}
      <div className={styles.filterButtons}>
        <button className={`${styles.filterButton} ${styles.active}`}>Global</button>
      </div>

      <table className={styles.rankingTable}>
        <thead>
          <tr>
            <th>Posición</th>
            <th>Lector</th>
            <th>Libros Leídos</th>
            <th>Tiempo de Lectura (días)</th>
          </tr>
        </thead>
        <tbody>
          {ranking.length > 0 ? (
            ranking.map((user) => (
              <tr key={user.id}>
                <td>{user.posicion}°</td>
                <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {user.foto_perfil && (
                            <img 
                                src={user.foto_perfil} 
                                alt={user.nombre} 
                                style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover' }}
                            />
                        )}
                        <span>{user.nombre}</span>
                    </div>
                </td>
                <td>{user.libros_leidos}</td>
                {/* Mostramos el tiempo. Si el backend manda días, mostramos días. */}
                <td>{user.tiempo_lectura} días</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} style={{ textAlign: 'center', padding: '20px' }}>
                Aún no hay datos de lectura registrados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RankingLectores;