import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Headerfordetails from "./Headerfordetails";
import { API_OPTIONS } from "../constants/Apioptions";
import { RapidOptionsDetailsNowShowingMoviesDaimond } from "../constants/RapidOptionsForDetails";

const NowShowingMoviesFullDetailsPage = () => {
  const { id } = useParams();
  let movieId = id;
  if (id.startsWith("tt")) {
    movieId = id.substring(2);
  }
  console.log(movieId, "TMDB ID");

  const [NowShowingTrailerYTKEY, setNowShowingTrailerYTKEY] = useState(null);
  const [NowShowingIMDBID, setNowShowingIMDBID] = useState(null);
  const [NowShowingMoviesDetails, setNowShowingMoviesDetails] = useState(null);

  useEffect(() => {
    const NowShowingTrailerYTKEY = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        API_OPTIONS
      );
      const data = await response.json();
      if (data?.results) {
        const trailerVideos = data.results.filter(
          (movie) => movie.type === "Trailer"
        );
        if (trailerVideos.length > 0) {
          const randomTrailer =
            trailerVideos[Math.floor(Math.random() * trailerVideos.length)];
          setNowShowingTrailerYTKEY(randomTrailer.key);
        } else {
          console.log("No trailer videos found in the data");
        }
      } else {
        console.log("No results found in the data");
      }
    };

    NowShowingTrailerYTKEY();
  }, [id]);

  useEffect(() => {
    NowShowingTrailerYTKEY &&
      console.log(NowShowingTrailerYTKEY, " MOVIE YT KEY");
  }, [NowShowingTrailerYTKEY]);

  useEffect(() => {
    const getNowShowingIMDBID = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/external_ids`,
        API_OPTIONS
      );
      const data = await response.json();
      setNowShowingIMDBID(data?.imdb_id);
    };
    getNowShowingIMDBID();
  }, []);

  useEffect(() => {
    NowShowingIMDBID && console.log(NowShowingIMDBID, "IMDB ID");
  }, [NowShowingIMDBID]);

  useEffect(() => {
    const NowShowingMoviesDetails = async () => {
      if (NowShowingIMDBID) {
        // Check if NowShowingIMDBID is available
        const response = await fetch(
          `https://imdb146.p.rapidapi.com/v1/title/?id=${NowShowingIMDBID}`,
          RapidOptionsDetailsNowShowingMoviesDaimond
        );
        const data = await response.json();
        setNowShowingMoviesDetails(data);
      } else {
        console.log("NowShowingIMDBID is not available");
      }
    };
    NowShowingMoviesDetails();
  }, [NowShowingIMDBID]);

  useEffect(() => {
    NowShowingMoviesDetails && console.log(NowShowingMoviesDetails);
  }, [NowShowingMoviesDetails]);

  return (
    <div className=" w-[100vw] h-[500vh] bg-[#030C16] text-red-600">
      <div className="">
        <Headerfordetails />
      </div>
      <div className=" w-[98vw] mx-auto mt-4  h-[76.5vh] border-2 border-lime-400 glow5 rounded-lg  ">
        {NowShowingTrailerYTKEY ? (
          <iframe
            className=" w-[97vw] mx-auto h-[75vh] relative top-1 rounded-lg"
            src={`https://www.youtube.com/embed/${NowShowingTrailerYTKEY}?si=HxKbpBA7t2t3ulUK`}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        ) : (
          <div></div>
        )}
      </div>

      <div className=" w-[100vw] h-[100vh] bg-red-20 mt-10 border-t-[1px] border-gray-700"></div>
    </div>
  );
};

export default NowShowingMoviesFullDetailsPage;
