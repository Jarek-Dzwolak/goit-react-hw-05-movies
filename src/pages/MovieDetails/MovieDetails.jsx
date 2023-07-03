import React from 'react';
import { useParams } from 'react-router-dom';

export const MovieDetails = () => {
  const { productId } = useParams();

  return <div>Strona domowa {productId}</div>;
};

export default MovieDetails;
