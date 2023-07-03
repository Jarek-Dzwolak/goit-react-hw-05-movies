import axios from 'axios';

const API_KEY = 'f2bec2f8de04498ca2fd18780a529a31';
const BASE_URL = 'https://api.themoviedb.org/3';

// Metoda do pobierania listy najpopularniejszych filmów
export const getTrendingMovies = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`
    );
    return response.data.results;
  } catch (error) {
    console.error('Błąd podczas pobierania najpopularniejszych filmów:', error);
    throw error;
  }
};

// Metoda do wyszukiwania filmów po słowie kluczowym
export const searchMovies = async keyword => {
  try {
    const response = await axios.get(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${keyword}`
    );
    return response.data.results;
  } catch (error) {
    console.error('Błąd podczas wyszukiwania filmów:', error);
    throw error;
  }
};

// Metoda do pobierania pełnych informacji o filmie
export const getMovieDetails = async movieId => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error('Błąd podczas pobierania informacji o filmie:', error);
    throw error;
  }
};

// Metoda do pobierania informacji o zespole aktorskim dla filmu
export const getMovieCredits = async movieId => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`
    );
    return response.data.cast;
  } catch (error) {
    console.error(
      'Błąd podczas pobierania informacji o zespole aktorskim:',
      error
    );
    throw error;
  }
};

// Metoda do pobierania recenzji dla filmu
export const getMovieReviews = async movieId => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`
    );
    return response.data.results;
  } catch (error) {
    console.error('Błąd podczas pobierania recenzji:', error);
    throw error;
  }
};
