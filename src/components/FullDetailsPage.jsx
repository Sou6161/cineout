import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApiOptionsfordetails } from "../constants/ApiOptionsForDetails";
import {
  RapidOPtionsDetailsRatingsWolf,
  RapidOptionsDetails,
  RapidOptionsDetailsChalo,
  RapidOptionsDetailsDaimond,
  RapidOptionsDetailsRatingsChalo,
  RapidOptionsDetailsRatingsDaimond,
  RapidOptionsDetailsRatingsRoman,
  RapidOptionsDetailsRexona,
  RapidOptionsDetailsWanda,
  RapidOptionsDetailsWolf,
} from "../constants/RapidOptionsForDetails";
import Headerfordetails from "./Headerfordetails";
import { PiVideoFill } from "react-icons/pi";
import { FaImages } from "react-icons/fa6";
import { IoStarSharp } from "react-icons/io5";
import { IoStarOutline } from "react-icons/io5";
import { FaArrowTrendDown } from "react-icons/fa6";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaRankingStar } from "react-icons/fa6";
import { CiSquarePlus } from "react-icons/ci";
import { FaShareAlt } from "react-icons/fa";
import { MdRecentActors } from "react-icons/md";
import { CgMoreVerticalO } from "react-icons/cg";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { RiMovie2Line } from "react-icons/ri";
import { addAllVideos } from "../Reduxstore/MovieAllVideosSlice";
import { Link } from "react-router-dom";
import { addAllPhotos } from "../Reduxstore/MovieAllPhotosSlice";
import Footer from "../components/Footer";
import CommentSection from "./CommentsSection";
import RecentlyViewed from "./RecentlyViewed";

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
  const [isOpen, setIsOpen] = useState(false);

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
      RapidOptionsDetailsDaimond
    );
    const data = await response.json();
    if (id === imdbIdFromApi) {
      console.log(imdbIdFromApi);
      setMovieFullInfo(data.data);
      sessionStorage.setItem("Movietitle", JSON.stringify(data.data));
      // console.log(sessionStorage.getItem("Movietitle")); // Check if data is stored correctly
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
      `https://imdb146.p.rapidapi.com/v1/title/?id=${imdbId}`,
      RapidOptionsDetailsRatingsDaimond
    );
    const data = await response.json();

    // Always update the data in session storage
    sessionStorage.setItem(storageName, JSON.stringify(data));
    // Store the data in AllRatings state
    setAllRatings(data);
  };

  useEffect(() => {
    AllRatings && console.log(AllRatings);
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
            className=" absolute w-full h-[148vh] bg-black mt-5 opacity-20 border-t-2 border-red-600 "
            src={MovieFullInfo?.title?.primaryImage?.url}
            alt=""
          />
          <div className=" absolute left-[4vw] my-[5vw] w-[90vw] brightness-[0.7] contrast-[0.7] p-5 rounded-lg h-[140vh] border-[1px] border-stone-600">
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
            <div className=" relative  bottom-[60vw] left-[10vw] text-[4vw] ">
              <h1 className=" relative   text-cyan-40 font-semibold ">
                {MovieFullInfo?.title?.titleText?.text}
              </h1>
              <div className="flex gap-10 bg-red-30 text-[0.8vw] relative left-[48vw] bottom-[14vw]">
                <h1 className=" relative top-5 font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-red-600 glow5">
                  CINEOUT RATING
                  <IoStarSharp className=" relative text-[2vw] text-cyan-600" />
                  <div className=" mx-12 -my-[3.7vh] text-[1.3vw]">
                    {AllRatings ? (
                      AllRatings?.ratingsSummary?.aggregateRating
                    ) : (
                      <h1>..loading</h1>
                    )}
                  </div>
                </h1>
                <h1 className=" relative top-5 font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-red-600 glow5">
                  YOUR RATING
                  <IoStarOutline className=" left-6 hover:bg-slate-500 rounded-lg    block relative text-[2vw] text-lime-500 font-black" />
                </h1>
                <h1 className="relative top-5 right- font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-red-600 glow5">
                  POPULARITY
                  {AllRatings ? (
                    AllRatings?.metacritic?.metascore?.score?.score > 50 ? (
                      <FaArrowTrendUp className="text-[2vw] text-green-300 border-[2px] font-extrabold rounded-full border-green-600" />
                    ) : (
                      <FaArrowTrendDown className="text-[2vw] text-orange-600 border-[2px] font-extrabold rounded-full border-red-600" />
                    )
                  ) : (
                    <>
                      <h1>...loading</h1>
                    </>
                  )}
                  <div className="mx-12 -my-[4vh] text-[1.3vw] ">
                    {AllRatings ? (
                      AllRatings?.metacritic?.metascore?.score
                    ) : (
                      <h1>...loading</h1>
                    )}
                  </div>
                </h1>
                <h1 className=" relative top-5 right-12  font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-red-600 glow5">
                  CURRENT RANK
                  <FaRankingStar className=" relative top-1  text-[2.2vw] text-cyan-600 border-[2px] font-extrabold rounded-full border-yellow-400" />
                  <div className="mx-12 -my-[4vh] text-[1.3vw]">
                    {AllRatings ? (
                      AllRatings?.meterRanking?.currentRank
                    ) : (
                      <h1>...loading</h1>
                    )}
                  </div>
                </h1>
              </div>

              <span className=" inline-block text-[1vw] relative left-1 bottom-10 font-sm  text-slate-400">
                <h1>
                  {AllRatings?.titleType?.text} {" - "}
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
                <div className=" relative left-[5vw] top-[8vw] inline-block">
                  <h1 className=" text-red-600 font-semibold text-[1.5vw] ">
                    Director(s){" "}
                    <span className=" text-lime-400 mx-4">
                      {" "}
                      {
                        AllRatings?.directorsPageTitle[0]?.credits[0]?.name
                          ?.nameText?.text
                      }
                    </span>
                  </h1>
                  <hr className=" border-gray-300 relative top-[1vw] " />{" "}
                  {/* Add this line */}
                  <h1 className=" text-green-800 font-semibold relative top-10 text-[1.5vw]">
                    Writers{" "}
                    <span className=" text-red-600 mx-4">
                      {AllRatings ? (
                        AllRatings?.writers[0]?.credits.map((item) => {
                          return item?.name?.nameText?.text;
                        })
                      ) : (
                        <h1>...loading</h1>
                      )}
                    </span>
                  </h1>
                  <hr className=" border-gray-300 relative top-[3vw]" />{" "}
                  {/* Add this line */}
                  <h1 className=" text-indigo-800 font-semibold relative top-20 text-[1.5vw]">
                    Stars
                    <span className=" text-amber-600 mx-4">
                      {AllRatings ? (
                        AllRatings?.castPageTitle?.edges?.map(
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
                        )
                      ) : (
                        <h1>...loading</h1>
                      )}
                    </span>
                  </h1>
                  <hr className=" border-gray-300 relative top-[5.5vw]" />{" "}
                  {/* Add this line */}
                </div>
              </span>
              <div className="text-[1.4vw] relative top-[19vw] left-[18vw]">
                <div className="">
                  {AllRatings ? (
                    AllRatings?.genres?.genres.map((item) => {
                      return (
                        <span
                          style={{
                            marginRight: "25px",
                            backgroundColor: "#334155",
                            color: "yellow",
                            borderRadius: "20px",
                            paddingRight: "10px",
                            paddingLeft: "10px",
                            paddingTop: "5px",
                            paddingBottom: "5px",
                            fontSize: "20px",
                            overflow: "hidden",
                          }}
                        >
                          {item?.text}
                        </span>
                      );
                    })
                  ) : (
                    <h1>...loading</h1>
                  )}
                  <div className=" relative bottom-[5vw]">
                    <div className="relative top-[8vw] right-[3vw] font-bold text-[1.8vw] underline ">
                      Description:
                    </div>
                    <div className=" inline-block relative top-[10vw] right-[3vw] break-words w-[60vw] font-semibold text-green-200">
                      {AllRatings?.plot?.plotText?.plainText}
                    </div>
                  </div>
                </div>
              </div>
              <div className="  absolute left-[65vw] top-[7vw] flex">
                <Link
                  to=""
                  class=" w-[15vw] relative inline-flex items-center
                  justify-center px-2 py-2 overflow-hidden
                  bg-gray-800 rounded-lg group"
                >
                  <CiSquarePlus className=" text-[1.5vw] relative right-[1.4vw] z-50" />
                  <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-green-500 rounded-full group-hover:w-[16vw] group-hover:h-[16vw]"></span>
                  <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
                  <span class="relative text-[1vw] -left-[1vw] font-bold text-red-600 ">
                    Add to Watchlist
                    <br />
                    <span className=" font-normal text-black">
                      {" "}
                      {
                        AllRatings?.engagementStatistics?.watchlistStatistics
                          ?.displayableCount?.text
                      }{" "}
                    </span>
                  </span>
                </Link>{" "}
              </div>
              <div className=" text-[1.1vw] absolute top-[55vw] left-[62vw] ">
                <span className=" text-blue-600 font-black bg-black px-1">
                  {AllRatings?.reviews?.total}
                </span>{" "}
                <span className=" font-medium text-green-500 cursor-pointer hover:underline">
                  User reviews
                </span>
                <span className=" ml-5 text-blue-600 font-black bg-black px-1x">
                  {AllRatings?.criticReviewsTotal?.total}
                </span>{" "}
                <span className=" text-green-500 cursor-pointer hover:underline font-medium">
                  Critics reviews
                </span>{" "}
                <br />
                <span className="text-blue-600 font-black relative left-[6vw] bg-black px-1">
                  {AllRatings?.subNavTopQuestions?.total}
                </span>{" "}
                <span className=" text-green-500 relative left-[6vw] cursor-pointer hover:underline font-medium">
                  Top Questions
                </span>
              </div>
            </div>

            <img
              className=" w-[15vw] h-[45vh] rounded-lg relative -my-[70vw] left-[10vw]"
              src={MovieFullInfo?.title?.primaryImage?.url}
              alt=""
            />
          </>
        )}
      </div>
      <div className="flex relative top-[18.7vw] ml-3 left-[90vw]">
        <div className="hs-dropdown relative inline-flex">
          <button
            id="hs-dropdown-custom-icon-trigger"
            type="button"
            className="hs-dropdown-toggle flex justify-center items-center size-9 text-sm font-semibold rounded-lg  text-black    disabled:opacity-50 disabled:pointer-events-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className=" relative  hover:bg-slate-400 rounded-lg h-[2vw]">
              <FaShareAlt className=" text-[2vw] items-center " />
            </svg>
          </button>

          {isOpen && (
            <div
              className=" absolute right-[1vw] top-[5vh] hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-100 min-w-60 bg-white shadow-md rounded-lg p-2 mt-2"
              aria-labelledby="hs-dropdown-custom-icon-trigger"
            >
              <a
                className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                href="#"
              >
                Newsletter
              </a>
              <a
                className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                href="#"
              >
                Purchases
              </a>
              <a
                className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                href="#"
              >
                Downloads
              </a>
              <a
                className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                href="#"
              >
                Team Account
              </a>
            </div>
          )}
        </div>
      </div>
      <div className=" w-[100vw] h-[530vh] bg-black px-[10vw] py-[5vw] border-t-[1px] border-blue-800 bg-blac relative top-[67.6vw]">
        <div className=" bg-red-30 inline-block">
          <h1 className=" text-yellow-400 text-[1.8vw] flex">
            <MdRecentActors className=" relative top-2 mr-2 text-[2vw]" />
            Top Cast
          </h1>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            backgroundColor: "black",
          }}
        >
          <div className="">
            {AllRatings ? (
              AllRatings?.cast?.edges.slice(0, 9).map((item) => {
                return (
                  <>
                    <div className="mt-4 ml-2 flex">
                      <img
                        className=" w-[6vw] border-2 border-indigo-600 h-[13vh] object-cover rounded-full"
                        src={
                          item?.node?.name?.primaryImage?.url ||
                          "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                        }
                        alt=""
                      />
                      <div className=" mt-5 ml-5">
                        <h1 className=" font-bold ml-2 text-slate-400">
                          {item?.node?.name?.nameText?.text}
                        </h1>
                        <br />
                        <h1 className="ml-2 -mt-5 text-zinc-500 font-normal">
                          {item?.node?.characters[0]?.name}
                        </h1>
                      </div>
                    </div>
                  </>
                );
              })
            ) : (
              <h1>Loading...</h1>
            )}
          </div>

          <div className="">
            {AllRatings ? (
              AllRatings?.cast?.edges.slice(9).map((item) => {
                return (
                  <>
                    <div className="mt-4 ml-2 flex">
                      <img
                        className=" w-[6vw] border-2 border-indigo-600 h-[13vh] object-cover rounded-full"
                        src={
                          item?.node?.name?.primaryImage?.url ||
                          "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                        }
                        alt=""
                      />
                      <div className=" mt-5 ml-5">
                        <h1 className=" font-bold ml-2 text-slate-400">
                          {item?.node?.name?.nameText?.text}
                        </h1>
                        <br />
                        <h1 className="ml-2 -mt-5 text-zinc-500 font-normal">
                          {item?.node?.characters[0]?.name}
                        </h1>
                      </div>
                    </div>
                  </>
                );
              })
            ) : (
              <h1>Loading...</h1>
            )}
          </div>
        </div>
        <div className=" relative mt-[9vw] w-[90vw] h-[90vh]">
          <h1 className=" mb-10 flex text-yellow-400 text-[2vw]">
            <span>
              <CgMoreVerticalO className=" flex text-red-500 text-[1.7vw] mr-2 relative top-3" />
            </span>
            More Titles Like This
          </h1>
          <div className=" w-[80vw] overflow-x-auto overflow-y-clip border-l-[1px] border-r-[1px] border-cyan-300  no-scrollbar h-[70vh] bg-red-30 flex">
            {AllRatings ? (
              AllRatings?.moreLikeThisTitles?.edges.map((item) => {
                return (
                  <div>
                    <div className="  mr-[5vw]  ml-3 min-w-[15vw] max-h-[45vh] rounded-[10px] p-2 overflow-x-hidden scrollbar-hide cursor-pointer bg-zinc-70  hover:bg-slate-500 overflow-y-hidden">
                      <img
                        className=" w-[14vw] h-[40vh]  rounded-md drop-shadow-glow object-cover"
                        src={
                          item?.node?.primaryImage?.url ||
                          "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                        }
                        alt=""
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://www.prokerala.com/movies/assets/img/no-poster-available.jpg";
                        }}
                      />
                    </div>
                    <div className="">
                      <h1 className="text-2xl font-semibold text-yellow-500   ml-5 mt-5">
                        {item?.node?.originalTitleText?.text}
                      </h1>
                      <div className=" ml-5 mt-3">
                        <h1 className=" text-red-400 mb-2">
                          <span>
                            {" "}
                            {parseFloat(
                              item?.node?.ratingsSummary?.aggregateRating
                            ) > 5 ? (
                              <FaStar />
                            ) : (
                              <FaStarHalfAlt />
                            )}
                          </span>
                          {item?.node?.ratingsSummary?.aggregateRating}
                        </h1>
                        <h1 className=" text-blue-400">
                          Year : {"  "}
                          {item?.node?.releaseYear?.year}
                        </h1>
                        <h1 className=" text-purple-500">
                          Genre :{"  "}
                          {item?.node?.titleGenres?.genres.map((item) => {
                            return item?.genre?.text;
                          })}
                        </h1>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <h1>...Loading</h1>
            )}
          </div>
        </div>
        <div className=" w-[100vw] h-[40vh] ">
          <div>
            <h1 className=" ml-4 text-[2vw] text-yellow-400">
              <span className=" relative top-11 text-green-400 right-8 mr-2">
                <RiMoneyDollarCircleFill />
              </span>
              Box Office
            </h1>
          </div>
          <div className="flex flex-wrap px-6 py-10">
            {AllRatings?.productionBudget?.budget?.amount && (
              <div className="w-[25vw]">
                <h1 className="text-red-500 text-[1.2vw] font-semibold">
                  Budget
                </h1>
                <h1 className="text-lime-300">
                  $
                  {AllRatings?.productionBudget?.budget?.amount.toLocaleString(
                    "en-US"
                  )}{" "}
                  <span className=" text-cyan-400">{" (estimated)"}</span>
                </h1>
              </div>
            )}
            {AllRatings?.lifetimeGross?.total?.amount && (
              <div className="w-1/2">
                <h1 className="text-red-500 text-[1.2vw] font-semibold mt-2 ">
                  Life Time Gross
                </h1>
                <h1 className="text-lime-300">
                  $
                  {AllRatings?.lifetimeGross?.total?.amount.toLocaleString(
                    "en-US"
                  )}
                </h1>
              </div>
            )}
            {AllRatings?.openingWeekendGross?.gross?.total?.amount && (
              <div className="w-[25vw]">
                <h1 className="text-red-500 text-[1.2vw] font-semibold mt-4 ">
                  Opening Weekend Gross
                </h1>
                <h1 className="text-lime-300">
                  $
                  {AllRatings?.openingWeekendGross?.gross?.total?.amount.toLocaleString(
                    "en-US"
                  )}
                </h1>
              </div>
            )}
            {AllRatings?.worldwideGross?.total?.amount && (
              <div className="w-1/2">
                <h1 className="text-red-500 text-[1.2vw] font-semibold mt-4 ">
                  World Wide Gross
                </h1>
                <h1 className="text-lime-300">
                  $
                  {AllRatings?.worldwideGross?.total?.amount.toLocaleString(
                    "en-US"
                  )}
                </h1>
              </div>
            )}
          </div>
        </div>
        <div className=" w-[100vw] h-[40vh] -mx-3  mt-[5vw] bg-red-40">
          <h1 className=" text-yellow-400 text-[2vw] flex">
            <span className=" text-blue-600 relative right-3  top-3 ">
              {" "}
              <RiMovie2Line />{" "}
            </span>
            Technical Specs
          </h1>
          <div>
            <h1 className=" text-purple-500 text-[1.3vw] mx-10 mt-10">
              <span className=" text-cyan-400 font-semibold mr-7 ">
                Run Time
              </span>
              {AllRatings?.runtime ? (
                <>
                  {Math.floor(AllRatings?.runtime?.seconds / 3600)} hours{" "}
                  {Math.floor((AllRatings?.runtime?.seconds % 3600) / 60)}{" "}
                  minutes
                </>
              ) : (
                "Not Available"
              )}
            </h1>
            <h1 className=" text-lime-500 text-[1.3vw] mx-10 mt-5">
              <span className=" text-cyan-400 font-semibold mr-7">Color </span>
              {AllRatings?.technicalSpecifications?.colorations?.items.map(
                (item) => {
                  return item?.text;
                }
              )}
            </h1>
            <h1 className=" text-green-500 text-[1.3vw] mx-10 mt-5">
              <span className=" text-cyan-400 font-semibold mr-7">
                Sound Mix{" "}
              </span>
              {AllRatings?.technicalSpecifications?.soundMixes?.items.map(
                (item) => {
                  return item?.text;
                }
              )}
            </h1>
            <h1 className=" text-red-600 text-[1.3vw] mx-10 mt-5">
              <span className=" text-cyan-400 font-semibold mr-7">
                Aspect Ratio
              </span>
              {
                AllRatings?.technicalSpecifications?.aspectRatios?.items[0]
                  ?.aspectRatio
              }
            </h1>
          </div>
        </div>
        <div className=" ">
          <CommentSection />
        </div>
        <div className=" w-[100vw] relative right-[10vw] border-t-[1px] mt-[10vw] border-cyan-400"></div>
        <div className=" mt-5">
          <RecentlyViewed/>
        </div>
        <div className=" relative right-[10vw]">
          <Footer/>
        </div>
      </div>
    </div>
  );
};

export default FullDetailsPage;
