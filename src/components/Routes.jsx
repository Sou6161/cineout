// Routes.jsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Header from "./Header";
import Maincontainer from "./Maincontainer";
import Fanfavourites from "./Fanfavourites";
import Secondcontainer from "./Secondcontainer";
import Whattowatch from "./Whattowatch";
import Comingsooninside from "./Comingsooninside";
import BornTodayMain from "./BornTodayPerson";
import TopNews from "./TopNews";
import MovieNews from "./MovieNews";
import TvNews from "./TvNews";
import CelebrityNews from "./CelebrityNews";
import BoxOffice from "./BoxOffice";
import MostPopularMoviesCharts from "./MostPopularMoviesCharts";
import IMDBTop250MoviesCharts from "./IMDBTop250MoviesCharts";
import TopRatedEnglishMovies from "./TopRatedEnglishMovies";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<Maincontainer />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/fan-favourites" element={<Whattowatch />} />
      <Route path="/Top-Box-Office" element={<BoxOffice />} />
      <Route path="/coming-soon" element={<Comingsooninside />} />
      <Route path="/born-today" element={<BornTodayMain />} />
      <Route path="/news/top" element={<TopNews />} />
      <Route path="/news/movie" element={<MovieNews />} />
      <Route path="/tv-series-news" element={<TvNews />} />
      <Route path="/news/celebrity" element={<CelebrityNews />} />
      <Route path="/charts/most-popular-movies" element={<MostPopularMoviesCharts/>}/>
      <Route path="/charts/top-250-movies" element={<IMDBTop250MoviesCharts/>}/>
      <Route path="/charts/top-english-movies" element={<TopRatedEnglishMovies/>}/>
      <Route
        path="/"
        element={
          <>
            {/* <Header/> */}
            <Maincontainer />
          </>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
