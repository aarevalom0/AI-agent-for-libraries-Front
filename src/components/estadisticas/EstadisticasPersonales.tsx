'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import styles from './Estadisticas.module.css'; 
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { getCurrentUser } from '@/lib/authClient';
import { getEstadisticasUsuario } from '@/services/estadisticasService';
import RankingLectores from '@/components/estadisticas/RankingLectores';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const EstadisticasPersonales = () => {
  const t = useTranslations('estadisticas');
  const [activeTab, setActiveTab] = useState<'Estadísticas' | 'Ranking'>('Estadísticas');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Estados para los datos del backend
  const [totalHoursRead, setTotalHoursRead] = useState(0);
  const [totalPagesReadThisYear, setTotalPagesReadThisYear] = useState(0);
  const [avgPagesPerDay, setAvgPagesPerDay] = useState(0);
  const [booksReadCount, setBooksReadCount] = useState(0);
  const [pagesPerMonth, setPagesPerMonth] = useState<number[]>(Array(12).fill(0));
  const [genresData, setGenresData] = useState<[string, number][]>([]);
  const [mostRecentBook, setMostRecentBook] = useState<string>('Ninguno');
  const [rachaLectura, setRachaLectura] = useState(0);

  useEffect(() => {
    const fetchEstadisticas = async () => {
      try {
        const user = getCurrentUser();
        console.log('👤 Usuario actual:', user);
        
        if (!user || !user.id) {
          console.error('❌ Usuario no autenticado');
          setError('Usuario no autenticado');
          setLoading(false);
          return;
        }

        console.log('🔍 Obteniendo estadísticas para usuario:', user.id);
        const data = await getEstadisticasUsuario(user.id);
        console.log('📊 Datos recibidos completos:', data);
        console.log('📊 Tipo de datos:', typeof data);

        // Validar que existan los datos
        if (!data) {
          console.error('❌ No se recibieron datos del servidor');
          throw new Error('No se recibieron datos del servidor');
        }

        // Procesar estadísticas con valores por defecto
        const stats = (data as any).estadisticas || {};
        const racha = (data as any).racha_lectura || {};

        console.log('📊 Estadísticas procesadas:', stats);
        console.log('🔥 Racha procesada:', racha);

        // Calcular horas de lectura (40 páginas por hora)
        const totalPaginas = stats.total_paginas_leidas || 0;
        const totalLibros = stats.total_libros_leidos || 0;
        
        setTotalHoursRead(Math.round(totalPaginas / 40));
        setTotalPagesReadThisYear(totalPaginas);
        setBooksReadCount(totalLibros);
        setRachaLectura(racha.dias_consecutivos || 0);

        // Calcular promedio de páginas por día
        const daysIntoYear = Math.floor(
          (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
        );
        setAvgPagesPerDay(daysIntoYear > 0 ? Math.round(stats.total_paginas_leidas / daysIntoYear) : 0);

        // Procesar géneros leídos
        // El backend devuelve un array: ["Ficción", "Misterio", "Literatura Clásica"]
        // Lo convertimos a formato [["Ficción", 1], ["Misterio", 1], ...]
        const generosArray = stats.generos_leidos || [];
        console.log('📚 Géneros recibidos:', generosArray);
        
        const genreCounts: { [key: string]: number } = {};
        
        if (Array.isArray(generosArray)) {
          generosArray.forEach((genre: string) => {
            genreCounts[genre] = (genreCounts[genre] || 0) + 1;
          });
        }
        
        const sortedGenres = Object.entries(genreCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5); // Top 5 géneros
        
        console.log('📊 Géneros procesados:', sortedGenres);
        setGenresData(sortedGenres as [string, number][]);

        setLoading(false);
      } catch (err) {
        console.error('❌ Error cargando estadísticas:', err);
        setError('Error al cargar las estadísticas');
        setLoading(false);
      }
    };

    fetchEstadisticas();
  }, []);
  // Mostrar loading
  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <p>Cargando estadísticas...</p>
        </div>
      </div>
    );
  }

  // Mostrar error
  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <p>❌ {error}</p>
        </div>
      </div>
    );
  }

  const lineChartData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    datasets: [
      {
        label: t('pagesPerMonth'),
        data: pagesPerMonth,
        borderColor: '#8D6E63',
        tension: 0.4,
      },
    ],
  };

  const barChartData = {
    labels: genresData.map(g => g[0]),
    datasets: [
      {
        label: t('booksRead'),
        data: genresData.map(g => g[1]),
        backgroundColor: '#EFEBE9',
        borderColor: '#D7CCC8',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#5D4037' } },
      y: { grid: { display: false }, ticks: { color: '#5D4037' } },
    },
  };

 return (
    <div className={styles.container}>
      <main className={styles.mainContent}>
        <h1 className={styles.title}>
          {activeTab === 'Estadísticas' ? t('personalStats') : t('ranking')}
        </h1>
        <div className={styles.tabs}>
          <button
            className={`${styles.tabButton} ${activeTab === 'Estadísticas' ? styles.active : ''}`}
            onClick={() => setActiveTab('Estadísticas')}
            title={t('personalStatsTooltip')}
          >
            {t('personalStats')}
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === 'Ranking' ? styles.active : ''}`}
            onClick={() => setActiveTab('Ranking')}
            title={t('rankingTooltip')}
          >
            {t('ranking')}
          </button>
        </div>

        {activeTab === 'Estadísticas' ? (
          <>
            <section className={styles.statsCards}>
              <div className={styles.card} title={t('readingHoursTooltip')}>
                <p className={styles.cardLabel}>{t('readingHours')}</p>
                <span className={styles.statNumber}>{totalHoursRead}</span>
              </div>
              <div className={styles.card} title={t('mostReadTooltip')}>
                <p className={styles.cardLabel}>{t('mostRead')}</p>
                <span className={styles.statTitle}>{mostRecentBook}</span>
              </div>
              <div className={styles.card} title={t('avgPagesTooltip')}>
                <p className={styles.cardLabel}>{t('avgPages')}</p>
                <span className={styles.statNumber}>{avgPagesPerDay}</span>
              </div>
            </section>

            <h2 className={styles.subtitle} title={t('readingSummaryTooltip')}>{t('readingSummary')}</h2>
            <section className={styles.summaryCard}>
              <p title={t('booksReadTooltip')}>{t('booksRead')}</p>
              <span>{booksReadCount} {t('booksRead')} {t('thisYear')}</span>
            </section>

            <section className={styles.chartsSection}>
              <div className={styles.chartCard}>
                <div className={styles.chartHeader}>
                  <p title={t('pagesPerMonthTooltip')}>{t('pagesPerMonth')}</p>
                  <span className={styles.statNumber}>{totalPagesReadThisYear}</span>
                  <span className={`${styles.statPercentage} ${styles.positive}`} title={t('thisYearTooltip')}>{t('thisYear')}</span>
                </div>
                <div className={styles.chartWrapper}>
                  <Line data={lineChartData} options={chartOptions} />
                </div>
              </div>
              <div className={styles.chartCard}>
                <div className={styles.chartHeader}>
                  <p title={t('genresTooltip')}>{t('genres')}</p>
                  <span className={styles.statNumber}>{genresData.length}</span>
                  <span className={`${styles.statPercentage} ${styles.positive}`} title={t('thisYearTooltip')}>{t('thisYear')}</span>
                </div>
                <div className={styles.chartWrapper}>
                  <Bar data={barChartData} options={chartOptions} />
                </div>
              </div>
            </section>
          </>
        ) : (
          <RankingLectores />
        )}
      </main>
    </div>
  );
};
export default EstadisticasPersonales;