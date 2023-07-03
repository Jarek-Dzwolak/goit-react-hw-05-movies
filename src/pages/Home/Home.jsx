import React, { useEffect, useState } from 'react';
import { getTrendingMovies } from 'Api'; // Importowanie funkcji getTrendingMovies z pliku api.js
import { Link } from 'react-router-dom';

export const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Pobieranie najpopularniejszych filmów przy ładowaniu komponentu
    fetchTrendingMovies();
  }, []);

  const fetchTrendingMovies = async () => {
    try {
      const trendingMovies = await getTrendingMovies();
      setMovies(trendingMovies);
    } catch (error) {
      // Obsługa błędu w przypadku nieudanego pobierania danych
      console.error(
        'Błąd podczas pobierania najpopularniejszych filmów:',
        error
      );
    }
  };

  return (
    <div>
      <h1>Najpopularniejsze filmy</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
