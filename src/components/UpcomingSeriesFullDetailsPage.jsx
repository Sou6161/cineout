import React from "react";
import { useParams } from "react-router-dom";

const UpcomingSeriesFullDetailsPage = () => {
  const { title } = useParams();
  let movieId = title;
  if (title.startsWith("su")) {
    movieId = title.substring(2);
  }
  console.log(movieId, "TMDB ID");

  return <div>{movieId && console.log(movieId)} fyufuuff7f77f</div>;
};

export default UpcomingSeriesFullDetailsPage;
