'use client';

import React from 'react';
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
import { userBooks } from '@/lib/mock-data'; // Importar datos simulados
import { Book } from '@/types/book';
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

// --- Funciones de Cálculo ---
const currentYear = new Date().getFullYear();
const booksReadThisYear = userBooks.filter(
  (book) =>
    book.status === 'leido' &&
    book.completionDate &&
    new Date(book.completionDate).getFullYear() === currentYear
);

const totalPagesReadThisYear = booksReadThisYear.reduce((sum, book) => sum + (book.progress ?? 0), 0);

// Estimación: 40 páginas por hora
const totalHoursRead = Math.round(totalPagesReadThisYear / 40);

const daysIntoYear = Math.floor(
  (Date.now() - new Date(currentYear, 0, 0).getTime()) / (1000 * 60 * 60 * 24)
);
const avgPagesPerDay = daysIntoYear > 0 ? Math.round(totalPagesReadThisYear / daysIntoYear) : 0;

// Para el gráfico de páginas por mes
const pagesPerMonth = Array(12).fill(0);
booksReadThisYear.forEach((book) => {
  if (book.completionDate) {
    const month = new Date(book.completionDate).getMonth(); // 0 = Enero, 11 = Diciembre
    pagesPerMonth[month] += book.progress;
  }
});

// Para el gráfico de géneros
const genreCounts: { [key: string]: number } = {};
booksReadThisYear.forEach((book) => {
  // Itera sobre el array de géneros de cada libro
  if (book.genres) {
    book.genres.forEach((genre) => {
      genreCounts[genre] = (genreCounts[genre] || 0) + 1;
    });
  }
});
const sortedGenres = Object.entries(genreCounts).sort((a, b) => b[1] - a[1]);
const allBooksRead = userBooks.filter((book) => book.status === 'leido');
const mostRecentBook = allBooksRead.reduce((latest, current) => {
    if (!latest) return current;
    const latestDate = new Date(latest.completionDate!);
    const currentDate = new Date(current.completionDate!);
    return currentDate > latestDate ? current : latest;
}, null as Book | null);

const EstadisticasPersonales = () => {
  const [activeTab, setActiveTab] = React.useState<'Estadísticas' | 'Ranking'>('Estadísticas');
  const lineChartData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    datasets: [
      {
        label: 'Páginas leídas',
        data: pagesPerMonth,
        borderColor: '#8D6E63',
        tension: 0.4,
      },
    ],
  };

  const barChartData = {
    labels: sortedGenres.map(g => g[0]),
    datasets: [
      {
        label: 'Libros leídos',
        data: sortedGenres.map(g => g[1]),
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
          {activeTab === 'Estadísticas' ? 'Estadísticas Personales' : 'Ranking'}
        </h1>
        <div className={styles.tabs}>
          <button
            className={`${styles.tabButton} ${activeTab === 'Estadísticas' ? styles.active : ''}`}
            onClick={() => setActiveTab('Estadísticas')}
          >
            Estadísticas Personales
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === 'Ranking' ? styles.active : ''}`}
            onClick={() => setActiveTab('Ranking')}
          >
            Ranking
          </button>
        </div>

        {activeTab === 'Estadísticas' ? (
          <>
            <section className={styles.statsCards}>
              <div className={styles.card}>
                <p>Horas de lectura acumuladas</p>
                <span className={styles.statNumber}>{totalHoursRead}</span>
              </div>
              <div className={styles.card}>
                <p>Libro más leído (reciente)</p>
                <span className={styles.statTitle}>{mostRecentBook ? mostRecentBook.title : 'Ninguno'}</span>
              </div>
              <div className={styles.card}>
                <p>Promedio de páginas/día</p>
                <span className={styles.statNumber}>{avgPagesPerDay}</span>
              </div>
            </section>

            <h2 className={styles.subtitle}>Resumen de Lectura</h2>
            <section className={styles.summaryCard}>
              <p>Cantidad de libros leídos</p>
              <span>{booksReadThisYear.length} libros este año</span>
            </section>

            <section className={styles.chartsSection}>
              <div className={styles.chartCard}>
                <div className={styles.chartHeader}>
                  <p>Páginas leídas por mes</p>
                  <span className={styles.statNumber}>{totalPagesReadThisYear}</span>
                  <span className={`${styles.statPercentage} ${styles.positive}`}>Este año</span>
                </div>
                <div className={styles.chartWrapper}>
                  <Line data={lineChartData} options={chartOptions} />
                </div>
              </div>
              <div className={styles.chartCard}>
                <div className={styles.chartHeader}>
                  <p>Géneros más frecuentes</p>
                  <span className={styles.statNumber}>{sortedGenres.length}</span>
                  <span className={`${styles.statPercentage} ${styles.positive}`}>Este año</span>
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