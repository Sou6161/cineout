import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApiOptionsfordetails } from "../constants/ApiOptionsForDetails";
import {
  RapidOPtionsDetailsRatingsWolf,
  RapidOptionsDetails,
  RapidOptionsDetailsChalo,
  RapidOptionsDetailsRatingsChalo,
  RapidOptionsDetailsRatingsRoman,
  RapidOptionsDetailsWanda,
  RapidOptionsDetailsWolf,
} from "../constants/RapidOptionsForDetails";
import Headerfordetails from "./Headerfordetails";
import { PiVideoFill } from "react-icons/pi";
import { FaImages } from "react-icons/fa6";
import { addAllVideos } from "../Reduxstore/MovieAllVideosSlice";
import { Link } from "react-router-dom";
import { addAllPhotos } from "../Reduxstore/MovieAllPhotosSlice";

const FullDetailsPage = () => {
  const [fullDetails, setFullDetails] = useState(null);
  const [apiData, setapiData] = useState(null);
  const [imdbIdFromApi, setImdbIdFromApi] = useState(null);
  const [imdbidSeriesFromApi, setImdbidSeriesFromApi] = useState(null);
  const [movieId, setMovieId] = useState(null);
  const [MovieTrailer, setMovieTrailer] = useState();
  const [MoviePhotos, setMoviePhotos] = useState(null);
  const [MovieFullInfo, setMovieFullInfo] = useState(null);
  const [AllRatings, setAllRatings] = useState(null);
  const dispatchAllVideos = useDispatch();
  const dispatchAllPhotos = useDispatch();

  const finalID = useSelector((state) => state.nowshowingit.nowshowit);

  const getFullDetails = async (finalID) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${finalID}/external_ids`,
      ApiOptionsfordetails
    );

    const jsondetails = await data.json();
    setFullDetails(jsondetails);
  };

  useEffect(() => {
    if (finalID) {
      setMovieId(finalID);
      localStorage.setItem("finalID", finalID);
      getFullDetails(finalID);
    }
  }, [finalID]);

  useEffect(() => {
    if (fullDetails) {
      setapiData(fullDetails);
    }
  }, [fullDetails]);

  useEffect(() => {
    if (apiData) {
      if (apiData.imdb_id) {
        setImdbIdFromApi(apiData.imdb_id);
        localStorage.setItem("imdbIdFromApi", apiData.imdb_id);
      } else {
        getSeriesDetails(finalID);
      }
    }
  }, [apiData]);

  const getSeriesDetails = async (finalID) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/tv/${finalID}/external_ids`,
      ApiOptionsfordetails
    );

    const jsondetails = await data.json();
    setImdbidSeriesFromApi(jsondetails.imdb_id);
  };

  useEffect(() => {
    if (imdbidSeriesFromApi) {
      console.log(imdbidSeriesFromApi);
      localStorage.setItem("imdbidSeriesFromApi", imdbidSeriesFromApi);
    }
  }, [imdbidSeriesFromApi]);

  useEffect(() => {
    const storedFinalID = localStorage.getItem("finalID");
    if (storedFinalID) {
      setMovieId(storedFinalID);
      getFullDetails(storedFinalID);
    }
  }, []);

  useEffect(() => {
    if (movieId) {
      getMovieDetails();
    }
  }, [movieId]);

  const getMovieDetails = async () => {
    let response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      ApiOptionsfordetails
    );
    let data = await response.json();
    let Trailer = data.results;

    if (!Trailer || Trailer.length === 0) {
      response = await fetch(
        `https://api.themoviedb.org/3/tv/${movieId}/videos?language=en-US`,
        ApiOptionsfordetails
      );
      data = await response.json();
      Trailer = data.results;
    }

    setMovieTrailer(Trailer);
  };

  useEffect(() => {
    dispatchAllVideos(addAllVideos(MovieTrailer));
  }, [MovieTrailer]);

  const getMoviePhotos = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/1011985/images",
      ApiOptionsfordetails
    );
    const data = await response.json();
    const Photos = data.backdrops;
    setMoviePhotos(Photos);
  };

  useEffect(() => {
    getMoviePhotos();
  }, []);

  useEffect(() => {
    if (MoviePhotos) {
      dispatchAllPhotos(addAllPhotos(MoviePhotos));
      console.log(MoviePhotos);
    }
  }, [MoviePhotos]);

  const getDetails = async (id) => {
    const response = await fetch(
      `https://imdb8.p.rapidapi.com/title/v2/get-extend-details?tconst=${id}`,
      RapidOptionsDetailsWanda
    );
    const data = await response.json();
    if (id === imdbIdFromApi) {
      // console.log(imdbIdFromApi);
      setMovieFullInfo(data.data);
      sessionStorage.setItem("Movietitle", JSON.stringify(data.data));
    } else {
      sessionStorage.setItem("Seriestitle", JSON.stringify(data.data));
    }
  };

  useEffect(() => {
    const storedTitle = JSON.parse(sessionStorage.getItem("Movietitle"));
    const storedSeries = JSON.parse(sessionStorage.getItem("Seriestitle"));
    if (storedTitle && storedTitle.id === imdbIdFromApi) {
      setMovieFullInfo(storedTitle);
    } else if (storedSeries && storedSeries.id === imdbidSeriesFromApi) {
      setMovieFullInfo(storedSeries);
    } else if (imdbIdFromApi) {
      sessionStorage.removeItem("Movietitle"); // Clear the session storage
      getDetails(imdbIdFromApi);
    } else if (imdbidSeriesFromApi) {
      console.log(imdbidSeriesFromApi);
      sessionStorage.removeItem("Seriestitle"); // Clear the session storage
      getDetails(imdbidSeriesFromApi);
    }
  }, [imdbIdFromApi, imdbidSeriesFromApi]);

  useEffect(() => {
    if (MovieFullInfo) {
      // console.log(MovieFullInfo);
    }
  }, [MovieFullInfo]);

  useEffect(() => {
    if (MovieFullInfo) {
      sessionStorage.setItem("Movietitle", JSON.stringify(MovieFullInfo));
    }
  }, [MovieFullInfo]);

  useEffect(() => {
    if (MovieTrailer) {
    }
  }, [MovieTrailer]);

  const getRatings = async (imdbId, storageName) => {
    const response = await fetch(
      `https://imdb-com.p.rapidapi.com/title/details?tconst=${imdbId}`,
      RapidOptionsDetailsRatingsChalo
    );
    const data = await response.json();
    // Always update the data in session storage
    sessionStorage.setItem(storageName, JSON.stringify(data.data));
    // Store the data in AllRatings state
    setAllRatings(data);
  };

  useEffect(() => {
    AllRatings && console.log(AllRatings.data);
  }, [AllRatings]);

  useEffect(() => {
    // If imdbIdFromApi doesn't change, use imdbidSeriesFromApi
    const imdbId = imdbIdFromApi ? imdbIdFromApi : imdbidSeriesFromApi;
    // Determine the storage name based on the ID
    const storageName =
      imdbId === imdbIdFromApi ? "MovieRatings" : "SeriesRatings";
    getRatings(imdbId, storageName);
  }, [imdbIdFromApi, imdbidSeriesFromApi]);

  return (
    <div className=" w-[100vw] h-[100vh] bg-black">
      <div className=" w-[100vw] h-[9vh] border-b-[3px] border-yellow-400 bg-black">
        <Headerfordetails />
      </div>
      <div className=" w-[100vw] h-[64vh] bg-black flex">
        <div className=" w-[65.2vw] rounded-lg h-[60vh] relative mt-5 ml-2">
          {/* {MovieTrailer && console.log(MovieTrailer)} */}
          {MovieTrailer &&
            (() => {
              const trailer = MovieTrailer.find(
                (movie) =>
                  movie.name === "Official Trailer" ||
                  movie.name === "Official Trailer 1" ||
                  movie.name === "Teaser Trailer" ||
                  movie.name === "Little Sweetheart Trailer 1990" ||
                  movie.name === "Official Trailer [ENG SUB]" ||
                  movie.name === "Official Trailer [Subtitled]" ||
                  movie.name === "Official Trailer [Subtitled]" ||
                  movie.name === "Trailer [Subtitled]" ||
                  movie.name === "My Hero Academia - Official Trailer 1" ||
                  movie.name ===
                    "Alice Through The Looking Glass - In Theaters Tomorrow!" ||
                  movie.name ===
                    "Opening 15 | We Go! - Hiroshi Kitadani [Subtitled]"
              );

              if (trailer) {
                const youtubeUrl = `https://www.youtube.com/embed/${trailer.key}`;
                return (
                  <div style={{ position: "relative" }}>
                    <iframe
                      className=" w-[67vw] h-[60vh]  rounded-lg  border-b- border-t-  hover:border-blu-500   border-re-700 glow3"
                      src={youtubeUrl}
                      title={trailer.name}
                      frameborder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>
                  </div>
                );
              }
              return null;
            })()}
        </div>
        <div className=" mt-4 rounded-lg ml-[4vw] right-4 flex w-[30vw] h-[60vh] bg-red-30 relative">
          {/* <div className="absolute inset-100 backdrop-blur-md rounded-lg"></div> */}
          <Link to={`/title/tt${movieId}/video-gallery`}>
            <div className="w-[28vw] h-[25vh] rounded-lg opacity-80 relative top-10 mb-10 overflow-hidden glow">
              <img
                src="https://wallpapers.com/images/featured/doctor-strange-pictures-6es4yutxrbl0nas9.jpg"
                alt=""
                className="relative   rounded-lg w-[28vw]  h-[25vh] object-cover"
              />
              <div className="absolute  inset-0 bg-black/20 backdrop-blur-md">
                <PiVideoFill className="w-[4vw] h-[22vh]  mx-[11vw] text-white hover:text-black hover:brightness-150" />
                <h1 className="-my-[3.5vw] mx-[11.4vw] font-bold text-[1.1vw] text-orange-400">
                  Videos
                </h1>
              </div>
            </div>
          </Link>
        </div>

        <div className="rounded-lg flex  right-3 relative">
          <div className="absolute inset-0 backdrop-blur-md"></div>
          <Link to={`/title/tt${movieId}/photo-gallery`}>
            <div className="w-[28vw] h-[25vh] rounded-lg opacity-80 relative top-[30vh] glow2 mt-7 right-[28vw] overflow-hidden">
              <img
                src="https://www.cinematographe.it/wp-content/uploads/2023/12/Robert-Downey-Jr.jpg"
                alt=""
                className="relative rounded-lg w-[28vw] h-[25vh] object-cover"
              />
              <div className="absolute inset-0 bg-black/20 backdrop-blur-md">
                <FaImages className="w-[3.5vw] h-[22vh]  mx-[11vw] text-white hover:text-black hover:brightness-150" />
                <h1 className="-my-[3.5vw] mx-[11.4vw] font-bold text-[1.1vw] text-orange-400">
                  Photos
                </h1>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className=" w-[100vw] h-[151vh]  bg-black">
        <div className=" bg-red-30 w-[100vw] h-[100vh]">
          <img
            className=" absolute w-full h-[148vh] bg-black mt-5 opacity-25 border-t-2 border-red-600 "
            src={MovieFullInfo?.title?.primaryImage?.url}
            alt=""
          />
          <div className=" absolute left-[4vw] my-[5vw] w-[90vw] p-5 rounded-lg h-[140vh] border-[1px] border-stone-600">
            <img
              className=" w-full h-[138vh] object-fill blur-lg"
              src={MovieFullInfo?.title?.primaryImage?.url}
              alt=""
            />
          </div>
        </div>
      </div>

      <div>
        {/* {MovieFullInfo && console.log(MovieFullInfo)} */}
        {MovieFullInfo && (
          <>
            <div className=" relative bottom-[60vw] left-[10vw] text-[4vw] ">
              <h1 className=" relative   text-cyan-40 font-semibold ">
                {MovieFullInfo?.title?.titleText?.text}
              </h1>
              <span className=" inline-block text-[1vw] relative left-1 bottom-10 font-sm  text-slate-400">
                <h1>
                  {"TV-Series"} {" - "}
                  {MovieFullInfo?.title?.releaseDate?.day}
                  {"/"}
                  {MovieFullInfo?.title?.releaseDate?.month}
                  {"/"}
                  {MovieFullInfo?.title?.releaseDate?.year}
                </h1>
                <h1>
                  {"Run Time - "}
                  {MovieFullInfo?.title?.runtime ? (
                    <>
                      {Math.floor(
                        MovieFullInfo?.title?.runtime?.seconds / 3600
                      )}{" "}
                      hours{" "}
                      {Math.floor(
                        (MovieFullInfo?.title?.runtime?.seconds % 3600) / 60
                      )}{" "}
                      minutes
                    </>
                  ) : (
                    "Not Available"
                  )}
                </h1>
                <h1>
                  {"Episodes - "}
                  {MovieFullInfo?.title?.episodes?.episodes?.total
                    ? MovieFullInfo?.title?.episodes?.episodes?.total
                    : "Not Available"}
                </h1>
              </span>
              <span className=" inline-block">
                <div className=" relative left-[5vw] top-[7vw] inline-block">
                  <h1 className=" text-red-600 font-semibold text-[1.5vw] ">
                    Director(s){" "}
                    <span className=" text-lime-400 mx-4">
                      {" "}
                      {AllRatings &&
                        AllRatings.data.aboveTheFoldData.directorsPageTitle[0]
                          .credits[0].name.nameText.text}
                    </span>
                  </h1>
                  <h1 className=" text-green-800 font-semibold relative top-10 text-[1.5vw]">
                    Writers{" "}
                  </h1>
                  <h1 className=" text-indigo-800 font-semibold relative top-20 text-[1.5vw]">
                    Stars
                    <span className=" text-amber-600 mx-4">
                      {AllRatings &&
                        AllRatings.data.aboveTheFoldData.castPageTitle.edges.map(
                          (item, index, arr) => {
                            return (
                              <React.Fragment key={index}>
                                <span>{item.node.name.nameText.text}</span>
                                {index < arr.length - 1 && (
                                  <span style={{ color: "lime" }}>, </span>
                                )}
                              </React.Fragment>
                            );
                          }
                        )}
                    </span>
                  </h1>
                </div>
              </span>
            </div>
            <img
              className=" w-[15vw] h-[45vh] rounded-lg relative -my-[62vw] left-[10vw]"
              src={MovieFullInfo?.title?.primaryImage?.url}
              alt=""
            />
          </>
        )}
      </div>
    </div>
  );
};

export default FullDetailsPage;
