// Routes.jsx
import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
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
import FullDetailsPage from "./FullDetailsPage";
import AllVideoGallery from "./AllVideoGallery";
import AllPhotosGallery from "./AllPhotosGallery";
import Top250Movies from "./Top250Movies";
import MostPopularMoviesMenu from "./MostPopularMoviesMenu";
import TopBoxOfficeMenu from "./TopBoxOfficeMenu";
import Top250TvShows from "./Top250TvShows";
import MostPopularTvShowsMenu from "./MostPopularTvShowsMenu";
import SeeAllResultsMenu from "./SeeAllResultsMenu";
import SearchDataDetailsMenu from "./SearchDataDetailsMenu";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../constants/Firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../Reduxstore/UserSlice";
import NowShowingMoviesFullDetailsPage from "./NowShowingMoviesFullDetailsPage";
import UpcomingMoviesFullDetailsPage from "./UpcomingSeriesFullDetailsPage";

const AppRoutes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        // navigate("/home");
      } else {
        dispatch(removeUser());
        // navigate("/home");
      }
    });
  }, []);

  return (
    <Routes>
      <Route path="/home" element={<Maincontainer />} />
      <Route path="/name/:id" element={<NowShowingMoviesFullDetailsPage />} />
      <Route path="/name/:title" element={<UpcomingMoviesFullDetailsPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/title/:imdbId" element={<FullDetailsPage />} />
      <Route path="/fan-favourites" element={<Whattowatch />} />
      <Route path="/Top-Box-Office" element={<BoxOffice />} />
      <Route path="/coming-soon" element={<Comingsooninside />} />
      <Route path="/born-today" element={<BornTodayMain />} />
      <Route path="/news/top" element={<TopNews />} />
      <Route path="/news/movie" element={<MovieNews />} />
      <Route path="/tv-series-news" element={<TvNews />} />
      <Route path="/news/celebrity" element={<CelebrityNews />} />
      <Route
        path="/charts/top-english-movies"
        element={<TopRatedEnglishMovies />}
      />
      <Route
        path="/title/:imdbId/video-gallery"
        element={<AllVideoGallery />}
      />
      <Route
        path="/title/:imdbId/photo-gallery"
        element={<AllPhotosGallery />}
      />
      <Route path="/chart/top" element={<Top250Movies />} />
      <Route path="/chart/moviemeter" element={<MostPopularMoviesMenu />} />
      <Route path="/chart/boxoffice" element={<TopBoxOfficeMenu />} />
      <Route path="/chart/toptv" element={<Top250TvShows />} />
      <Route path="/chart/tvmeter" element={<MostPopularTvShowsMenu />} />
      <Route path={`/find/`} element={<SeeAllResultsMenu />} />
      {/* <Route path="/head/:id" element={<SearchDataDetailsMenu />} /> */}

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
