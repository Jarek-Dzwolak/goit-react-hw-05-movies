import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { searchMovies } from 'Api';
import styles from './Movies.module.css';

const Movies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const results = await searchMovies(searchQuery);
      setSearchResults(results);
      navigate(`?query=${searchQuery}`);
    } catch (error) {
      console.error('Błąd podczas wyszukiwania filmów:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Wyszukiwarka filmów</h1>
      <div className={styles.input_container}>
        <input
          type="text"
          value={searchQuery}
          onChange={event => setSearchQuery(event.target.value)}
          className={styles.input}
        />
        <button onClick={handleSearch} className={styles.button}>
          Szukaj
        </button>
      </div>
      <ul className={styles.movie_list}>
        {searchResults.map(movie => (
          <li key={movie.id} className={styles.movie_item}>
            <Link
              to={{
                pathname: `/movies/${movie.id}`,
                search: `?query=${searchQuery}`,
              }}
              className={styles.movie_link}
            >
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                className={styles.movie_image}
              />
              <div className={styles.movie_details}>
                <h2 className={styles.movie_title}>{movie.title}</h2>
                <p className={styles.movie_overview}>{movie.overview}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;
