import React, { useEffect, useState } from 'react';
import { getMovieReviews } from 'Api';

export const Reviews = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchMovieReviews();
  }, []);

  const fetchMovieReviews = async () => {
    try {
      const reviewsData = await getMovieReviews(movieId);
      setReviews(reviewsData);
    } catch (error) {
      console.error('Błąd podczas pobierania recenzji:', error);
    }
  };

  return (
    <div>
      <h2>Reviews</h2>
      {reviews.map(review => (
        <div key={review.id}>
          <p>{review.author}</p>
          <p>{review.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
