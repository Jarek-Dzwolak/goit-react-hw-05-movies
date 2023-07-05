import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { getMovieDetails, getMovieCredits, getMovieReviews } from 'Api';
import Cast from 'components/Cast/Cast';
import Reviews from 'components/Reviews/Reviews';
import styles from './MovieDetails.module.css';
import { Outlet } from 'react-router-dom';

const MovieDetails = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [showCast, setShowCast] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [cast, setCast] = useState(null);
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    fetchMovieDetails();
    fetchMovieCredits();
    fetchMovieReviews();
  }, []);

  const fetchMovieDetails = async () => {
    try {
      const movieDetails = await getMovieDetails(movieId);
      setMovie(movieDetails);
    } catch (error) {
      console.error('Błąd podczas pobierania informacji o filmie:', error);
    }
  };

  const fetchMovieCredits = async () => {
    try {
      const movieCredits = await getMovieCredits(movieId);
      setCast(movieCredits);
    } catch (error) {
      console.error(
        'Błąd podczas pobierania informacji o zespole aktorskim:',
        error
      );
    }
  };

  const fetchMovieReviews = async () => {
    try {
      const movieReviews = await getMovieReviews(movieId);
      setReviews(movieReviews);
    } catch (error) {
      console.error('Błąd podczas pobierania recenzji:', error);
    }
  };

  const handleShowCast = () => {
    setShowCast(true);
    setShowReviews(false);
  };

  const handleShowReviews = () => {
    setShowReviews(true);
    setShowCast(false);
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.movieDetails}>
      <div className={styles.details}>
        <div className={styles.goBackContainer}>
          <button onClick={goBack}>Go Back</button>
        </div>
        <img
          className={styles.poster}
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <h1 className={styles.title}>{movie.title}</h1>
        <p>{movie.overview}</p>
        <p>Rating: {movie.vote_average}</p>
        <p>Genres: {movie.genres.map(genre => genre.name).join(', ')}</p>
        <div className={styles.buttonContainer}>
          <button onClick={handleShowCast}>Cast</button>
          <button onClick={handleShowReviews}>Reviews</button>
        </div>
        {showCast && cast && (
          <div className={styles.castContainer}>
            <Cast movieId={movieId} cast={cast} />
          </div>
        )}
        {showReviews && reviews && (
          <div className={styles.reviewsContainer}>
            <Reviews movieId={movieId} Reviews={reviews} />
          </div>
        )}
      </div>
      <Outlet />
    </div>
  );
};

export default MovieDetails;
