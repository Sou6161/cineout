import React from "react";
import { useParams } from "react-router-dom";

const UpcomingMoviesFullDetailsPage = () => {
  const { title } = useParams();
  let movieId = title;
  if (title.startsWith("nm")) {
    movieId = title.substring(2);
  }
  console.log(movieId, "TMDB ID");

  return <div>{movieId && console.log(movieId)}</div>;
};

export default UpcomingMoviesFullDetailsPage;
