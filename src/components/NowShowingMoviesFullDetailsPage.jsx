import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Headerfordetails from "./Headerfordetails";
import { API_OPTIONS } from "../constants/Apioptions";
import {
  RapidOptionsDetailsNowShowingMoviesDaimondTest30,
  RapidOptionsDetailsNowShowingMoviesDaimondApidojoTest26,
  RapidOptionsDetailsNowShowingMoviesDaimondTest27ApiDojo,
  RapidOptionsDetailsNowShowingMoviesDaimondTest28ApiDojo,
} from "../constants/RapidOptionsForDetails";
import { PiDotOutlineBold } from "react-icons/pi";
import { FaPlus } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import { IoStarOutline } from "react-icons/io5";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";
import { IoMdArrowDropupCircle, IoMdStar } from "react-icons/io";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { BiPlayCircle } from "react-icons/bi";
import { Swiper, SwiperSlide } from "swiper/react";
import { TiStarFullOutline } from "react-icons/ti";
import { RiStarLine } from "react-icons/ri";
import { RiStarFill } from "react-icons/ri";
import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import RecentlyViewed from "./RecentlyViewed";
import Footer from "./Footer";
import useModal from "./UseModal";
import { useDispatch } from "react-redux";
import { addRecentlyVieweddata } from "../Reduxstore/RecentlyViewedSlice";
import Header from "./Header";

// const trimTextTo180Words = (text) => {
//   const words = text.split(" ");
//   return words.slice(0, 130).join(" ") + (words.length > 130 ? "..." : "");
// };

const NumberFormatter = ({ number }) => {
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    } else {
      return num;
    }
  };

  return <span>{formatNumber(number)}</span>;
};

const convertDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const NowShowingMoviesFullDetailsPage = () => {
  const { id } = useParams();
  let movieId = id;
  if (id.startsWith("nm")) {
    movieId = id.substring(2);
  }
  console.log(movieId, "TMDB ID");

  const [NowShowingTrailerYTKEY, setNowShowingTrailerYTKEY] = useState(null);
  const [NowShowingIMDBID, setNowShowingIMDBID] = useState(null);
  const [NowShowingMoviesDetails, setNowShowingMoviesDetails] = useState(null);
  const [NowShowingImages, setNowShowingImages] = useState(null);
  const [NowShowingVideoGallery, setNowShowingVideoGallery] = useState(null);
  const [NowShowingRelatedNews, setNowShowingRelatedNews] = useState(null);
  const { isShowing, toggle } = useModal();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [clickedIndex, setClickedIndex] = useState(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [expandedReviews, setExpandedReviews] = useState({});

  const toggleReview = (index) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const trimTextTo130Words = (text) => {
    const words = text.split(" ");
    if (words.length <= 130) return text;
    return words.slice(0, 130).join(" ") + "";
  };

  const handleIconClick = (index) => {
    setClickedIndex(index);
  };

  const cast = NowShowingMoviesDetails?.cast?.edges || [];
  const leftNames = cast.slice(0, 8);
  const middleNames = cast.slice(8, 16);
  const rightNames = cast.slice(16, 24);

  const renderNames = (namesArray) => (
    <div className="max-w-[20vw]">
      {namesArray &&
        namesArray.map((data, index) => (
          <div key={index}>
            <img
              className="  w-16 h-16 xsmall:w-24 xsmall:h-24 small:w-28 small:h-28 medium:w-32 medium:h-32 p-1 rounded-full object-cover border-2 border-cyan-400 hover:border-purple-500 transition-colors duration-300"
              src={
                data?.node?.name?.primaryImage?.url ||
                "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
              }
              alt="no image available"
            />
            <div className="relative left-[2vw] mb-2 xsmall:left-[2vw] xsmall:text-[2.5vw] small:left-[2vw] small:text-[2vw] medium:left-[2vw]  medium:text-[2vw] large:left-[2vw] large:text-[1.8vw] xlarge:left-[2vw] xlarge:text-[1.8vw] 2xlarge:left-[1vw] 2xlarge:text-[1.3vw]">
              <h1 className="font-normal   truncate mt-3 text-white">
                {data?.node?.name?.nameText?.text}
              </h1>
              <h1 className="font-normal  text-lime-400 whitespace-nowrap">
                {data?.node?.characters &&
                  (() => {
                    const characterNames = data.node.characters
                      .map((character) => character?.name)
                      .join(", ");
                    const words = characterNames.split(" ");
                    if (words.length > 4) {
                      return words.slice(0, 4).join(" ") + "...";
                    }
                    return characterNames;
                  })()}
              </h1>
            </div>
          </div>
        ))}
    </div>
  );

  useEffect(() => {
    if (isShowing) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.overflowX = "clip";
    }
  }, [isShowing]);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        // First, try to fetch from movie API
        let response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
          API_OPTIONS
        );
        let data = await response.json();

        // If we get valid data from movie API, process it
        if (data?.results && data.results.length > 1) {
          console.log(data, "Movie THe boys DAtaaaaaaa");
          processTrailerData(data);
          return; // Exit the function here if we got data from movie API
        }

        // If no results from movie API, try TV API
        response = await fetch(
          `https://api.themoviedb.org/3/tv/${movieId}/videos?language=en-US`,
          API_OPTIONS
        );
        data = await response.json();

        // Process data from TV API
        if (data?.results && data.results.length > 0) {
          console.log(data, "the boys seriesd dataaaaaa");
          processTrailerData(data);
        } else {
          console.log("No results found in both movie and TV APIs");
        }
      } catch (error) {
        console.error("Error fetching trailer:", error);
      }
    };

    const processTrailerData = (data) => {
      const trailerVideos = data.results.filter(
        (video) => video.type === "Trailer"
      );
      if (trailerVideos.length > 0) {
        const randomTrailer =
          trailerVideos[Math.floor(Math.random() * trailerVideos.length)];
        setNowShowingTrailerYTKEY(randomTrailer.key);
      } else {
        console.log("No trailer videos found in the data");
      }
    };

    fetchTrailer();
  }, [movieId]);

  useEffect(() => {
    NowShowingTrailerYTKEY &&
      console.log(NowShowingTrailerYTKEY, " MOVIE YT KEY");
  }, [NowShowingTrailerYTKEY]);

  useEffect(() => {
    const getNowShowingExternalIDs = async () => {
      try {
        // First, try to fetch from movie API
        let response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/external_ids`,
          API_OPTIONS
        );
        let data = await response.json();

        // If we get valid Instagram ID from movie API, use this data and return
        if (data && data.wikidata_id) {
          setNowShowingIMDBID(data.imdb_id);
          // You might want to set other external IDs here as well
          // For example: setInstagramID(data.instagram_id);
          return;
        }

        // If no Instagram ID from movie API, try TV API
        response = await fetch(
          `https://api.themoviedb.org/3/tv/${movieId}/external_ids`,
          API_OPTIONS
        );
        data = await response.json();

        // Set IMDB ID and other external IDs from TV API if found
        if (data) {
          setNowShowingIMDBID(data.imdb_id);
          // You might want to set other external IDs here as well
          // For example: setInstagramID(data.instagram_id);
        } else {
          console.log("No external IDs found in both movie and TV APIs");
          setNowShowingIMDBID(null);
          // Reset other external IDs if needed
        }
      } catch (error) {
        console.error("Error fetching external IDs:", error);
        setNowShowingIMDBID(null);
        // Reset other external IDs if needed
      }
    };

    getNowShowingExternalIDs();
  }, [movieId]);

  useEffect(() => {
    if (NowShowingIMDBID !== null) {
      console.log(NowShowingIMDBID, "IMDB ID");
    }
  }, [NowShowingIMDBID]);

  useEffect(() => {
    const NowShowingMoviesDetails = async () => {
      if (NowShowingIMDBID) {
        console.log(NowShowingIMDBID, "ughigigigiggg");
        try {
          const response = await fetch(
            `https://imdb146.p.rapidapi.com/v1/title/?id=${NowShowingIMDBID}`,
            RapidOptionsDetailsNowShowingMoviesDaimondTest30
          );

          const NowShowingMoviesDetails = await response.json(); // Assuming this is the variable you want to dispatch
          console.log(NowShowingMoviesDetails);
          setNowShowingMoviesDetails(NowShowingMoviesDetails);
          // Check if NowShowingMoviesDetails is valid before dispatching
          if (NowShowingMoviesDetails) {
            dispatch(addRecentlyVieweddata(NowShowingMoviesDetails)); // Dispatch action to add movie details
          } else {
            console.error("Invalid data received:", NowShowingMoviesDetails);
          }
        } catch (error) {
          console.error("Error fetching movie details:", error);
        }
      }
    };
    NowShowingMoviesDetails();
  }, [NowShowingIMDBID]);

  useEffect(() => {
    NowShowingMoviesDetails &&
      console.log(NowShowingMoviesDetails, " All NowShowingMovies Details");
  }, [dispatch, NowShowingMoviesDetails]);

  useEffect(() => {
    const getNowShowingPhotos = async () => {
      try {
        const response = await fetch(
          `https://imdb8.p.rapidapi.com/title/v2/get-images?tconst=${NowShowingIMDBID}&first=100`,
          RapidOptionsDetailsNowShowingMoviesDaimondApidojoTest26
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const text = await response.text();
        if (text) {
          const data = JSON.parse(text);
          setNowShowingImages(data?.data?.title);
        }
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };
    getNowShowingPhotos();
  }, [NowShowingIMDBID]);

  useEffect(() => {
    NowShowingImages && console.log(NowShowingImages);
  }, [NowShowingImages, NowShowingIMDBID]);

  useEffect(() => {
    const getNowShowingVideos = async () => {
      try {
        const response = await fetch(
          `https://imdb8.p.rapidapi.com/title/get-videos?tconst=${NowShowingIMDBID}&limit=100&region=US`,
          RapidOptionsDetailsNowShowingMoviesDaimondTest27ApiDojo
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const text = await response.text();
        if (text) {
          const data = JSON.parse(text);
          setNowShowingVideoGallery(data?.resource);
        }
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };
    getNowShowingVideos();
  }, [NowShowingIMDBID]);

  useEffect(() => {
    NowShowingVideoGallery && console.log(NowShowingVideoGallery);
  }, [NowShowingVideoGallery]);

  const [isTrimmed, setIsTrimmed] = useState(true);
  const toggleTrim = () => {
    setIsTrimmed(!isTrimmed);
  };

  useEffect(() => {
    const getNowShowingRelatedNews = async () => {
      try {
        const response = await fetch(
          `https://imdb8.p.rapidapi.com/title/v2/get-related-news?tconst=${NowShowingIMDBID}&first=20&country=US&language=en-US`,
          RapidOptionsDetailsNowShowingMoviesDaimondTest28ApiDojo
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const text = await response.text();
        if (text) {
          const data = JSON.parse(text);
          setNowShowingRelatedNews(data?.data?.title);
        }
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };
    getNowShowingRelatedNews();
  }, [NowShowingIMDBID]);

  useEffect(() => {
    NowShowingRelatedNews && console.log(NowShowingRelatedNews, "Related News");
  }, [NowShowingRelatedNews]);

  return (
    <div className="  min-h-[800vh] xsmall:min-h-[852vh] small:min-h-[902vh] medium:h-[1000vh] large:min-h-[1045vh] xlarge:h-[1060vh] 2xlarge:h-[1000vh] bg-[#030C16] text-red-600">
      <div className=" -mt-1  ">
        <Header />
      </div>
      <div
        // className=" relative  w-[98vw] h-[32vh]  mx-auto top-[17vw]   py-1 rounded-lg glow5 "
        className="w-[97vw] h-[31vh] mx-auto relative top-[18vw]  border-black glow5 rounded-lg
                xsmall:top-[13vw] xsmall:h-[37vh]
                small:top-[12vw] small:h-[42vh]
                medium:top-[10vw] medium:h-[58vh]
                large:top-[7vw] large:h-[63vh]
                xlarge:top-[6vw] xlarge:h-[63vh]
                2xlarge:top-[5vw] 2xlarge:h-[68vh]"
      >
        {NowShowingTrailerYTKEY ? (
          <iframe
            className="w-[95vw] mx-auto h-[30vh] relative top-[1vw] rounded-lg glow3 glow
                 xsmall:h-[35vh]
                 small:h-[40vh]
                 medium:h-[55vh]
                 large:h-[60vh]
                 xlarge:h-[60vh]
                 2xlarge:h-[65vh]"
            src={`https://www.youtube.com/embed/${NowShowingTrailerYTKEY}?si=HxKbpBA7t2t3ulUK`}
          ></iframe>
        ) : (
          <div
            role="status"
            className="flex items-center justify-center bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700 h-full"
          >
            <svg
              className="w-full h-full text-[10vw] text-red-600 dark:text-gray-600
                   xsmall:text-[9vw]
                   small:text-[8vw]
                   medium:text-[7vw]
                   large:text-[6vw]
                   xlarge:text-[5vw]
                   2xlarge:text-[4vw]"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 16 20"
            >
              <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
              <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </div>
      <div className=" w-[89vw] h-[100vh] absolute bg-red-20 mt-[20vw]  ">
        <div className="">
          <div>
            <h1
              className="relative top-[3vw] left-[5vw] text-[4.5vw] text-purple-500 font-semibold
                   xsmall:text-[4vw] xsmall:top-[2.5vw]
                   small:text-[3.5vw] small:top-[2vw]
                   medium:text-[3vw] medium:top-[1.5vw]
                   large:text-[3vw] large:top-[1vw]
                   xlarge:text-[3vw] xlarge:top-[0.5vw]
                   2xlarge:text-[3vw] 2xlarge:top-[0.25vw]"
            >
              {NowShowingMoviesDetails?.titleText?.text}
            </h1>
            <h1
              className="flex relative text-[2vw] left-[5.2vw] top-3
                   xsmall:text-[1.8vw] xsmall:top-3
                   small:text-[1.6vw] small:top-3
                   medium:text-[1.4vw] medium:top-3
                   large:text-[1.3vw] large:top-2
                   xlarge:text-[1.3vw] xlarge:top-1
                   2xlarge:text-[1.4vw] 2xlarge:top-[-1]"
            >
              <span className="mr-2">
                {NowShowingMoviesDetails?.releaseDate?.year}
              </span>
              <PiDotOutlineBold className="relative top-[0.3vw] right-1" />
              <span className="mr-2">
                {NowShowingMoviesDetails?.certificate?.rating}
              </span>
              <PiDotOutlineBold className="relative top-[0.3vw] right-1" />
              <span>
                {
                  NowShowingMoviesDetails?.runtime?.displayableProperty?.value
                    ?.plainText
                }
              </span>
            </h1>
          </div>
          <div>
            <img
              className="max-w-[25vw] max-h-[22vh] glow4 relative left-[5vw] top-[7vw] rounded-lg object-center
                 xsmall:min-w-[20vw] xsmall:max-h-[22vh] xsmall:top-[5vw]
                 small:max-w-[20vw] small:max-h-[26vh] small:top-[5vw]
                 medium:max-w-[20vw] medium:max-h-[33vh] medium:top-[3.5vw]
                 large:max-w-[20vw] large:max-h-[42vh] large:top-[3vw]
                 xlarge:min-w-[17vw] xlarge:max-h-[45vh] xlarge:top-[2.5vw]
                 2xlarge:min-w-[15vw] 2xlarge:h-[44vh] 2xlarge:top-[2vw]"
              src={NowShowingMoviesDetails?.primaryImage.url}
              alt=""
            />
          </div>
        </div>
        <div className=" relative left-[10vw] ">
          <div className=" absolute top-[10vw] -left-[5vw] xsmall:top-[16vw] small:top-[15vw] medium:top-[10vw] large:top-[5vw] large:left-[4vw] xlarge:top-[8vw]   ">
            <>
              <span className="text-white relative top-[9vw] text-[3vw] medium:text-[2.5vw] large:text-[2vw] xlarge:text-[1.6vw] 2xlarge:text-[1.4vw]  ">
                {NowShowingMoviesDetails?.directorsPageTitle &&
                NowShowingMoviesDetails.directorsPageTitle.length > 0
                  ? "Directors"
                  : NowShowingMoviesDetails?.creatorsPageTitle &&
                    NowShowingMoviesDetails.creatorsPageTitle.length > 0
                  ? "Creators"
                  : ""}
              </span>

              <h1 className="relative text-emerald-400 font-semibold top-[4.4vw] text-[3vw] left-[15vw] medium:text-[2.5vw] medium:top-[5vw] large:text-[2vw] large:top-[6vw] large:left-[12vw] xlarge:text-[1.6vw] xlarge:top-[6.5vw] xlarge:left-[11vw] 2xlarge:text-[1.4vw] 2xlarge:top-[7vw] 2xlarge:left-[10vw]">
                {NowShowingMoviesDetails && (
                  <>
                    {NowShowingMoviesDetails.directorsPageTitle &&
                    NowShowingMoviesDetails.directorsPageTitle.length > 0
                      ? NowShowingMoviesDetails.directorsPageTitle.map(
                          (data, index) => (
                            <span key={index}>
                              {data?.credits.map((director, i) => (
                                <React.Fragment key={i}>
                                  {director?.name?.nameText?.text}
                                  {i < data?.credits?.length - 1 && ", "}
                                </React.Fragment>
                              ))}
                              {index <
                                NowShowingMoviesDetails.directorsPageTitle
                                  .length -
                                  1 && ", "}
                            </span>
                          )
                        )
                      : NowShowingMoviesDetails.creatorsPageTitle &&
                        NowShowingMoviesDetails.creatorsPageTitle.length > 0
                      ? NowShowingMoviesDetails.creatorsPageTitle.map(
                          (data, index) => (
                            <span key={index}>
                              {data?.credits.map((creator, i) => (
                                <React.Fragment key={i}>
                                  {creator?.name?.nameText?.text}
                                  {i < data?.credits?.length - 1 && ", "}
                                </React.Fragment>
                              ))}
                              {index <
                                NowShowingMoviesDetails.creatorsPageTitle
                                  .length -
                                  1 && ", "}
                            </span>
                          )
                        )
                      : "No directors or creators found"}
                  </>
                )}
              </h1>
            </>
            {NowShowingMoviesDetails?.writers &&
              NowShowingMoviesDetails.writers.length > 0 &&
              NowShowingMoviesDetails.writers.some(
                (writer) => writer.credits && writer.credits.length > 0
              ) && (
                <>
                  <span className="text-white relative top-[9.5vw] text-[3vw] medium:text-[2.5vw] large:text-[2vw] xlarge:text-[1.6vw] 2xlarge:text-[1.4vw]">
                    Writers
                  </span>
                  <h1 className="relative top-[4.5vw] text-emerald-400 text-[3vw] left-[15vw] medium:text-[2.5vw] medium:top-[5.7vw] large:text-[2vw] large:top-[6.5vw] large:left-[12vw] xlarge:text-[1.6vw] xlarge:top-[7vw] xlarge:left-[11vw] 2xlarge:text-[1.4vw] 2xlarge:top-[7.5vw] 2xlarge:left-[10vw]">
                    {NowShowingMoviesDetails.writers.map(
                      (data, index) =>
                        data.credits &&
                        data.credits.length > 0 && (
                          <span key={index}>
                            {data.credits.map((writer, i) => (
                              <React.Fragment key={i}>
                                {writer?.name?.nameText?.text}
                                {i < data.credits.length - 1 && ", "}
                              </React.Fragment>
                            ))}
                            {index <
                              NowShowingMoviesDetails.writers.length - 1 &&
                              NowShowingMoviesDetails.writers[index + 1]
                                ?.credits?.length > 0 &&
                              ", "}
                          </span>
                        )
                    )}
                  </h1>
                </>
              )}
            <span className=" text-white relative top-[10vw] text-[3vw] medium:text-[2.5vw] large:text-[2vw] xlarge:text-[1.6vw] 2xlarge:text-[1.4vw]">
              Stars
            </span>
            <h1 className="relative top-[5vw] text-emerald-400 left-[15vw] text-[3vw] medium:text-[2.5vw] medium:top-[6vw] large:text-[2vw] large:top-[7vw] large:left-[12vw] xlarge:text-[1.6vw] xlarge:top-[7.5vw] xlarge:left-[11vw] 2xlarge:text-[1.4vw] 2xlarge:top-[8vw] 2xlarge:left-[10vw]">
              {NowShowingMoviesDetails &&
                NowShowingMoviesDetails?.castPageTitle?.edges.map(
                  (data, index) => (
                    <React.Fragment key={index}>
                      {data?.node?.name?.nameText?.text}
                      {index <
                        NowShowingMoviesDetails?.castPageTitle?.edges?.length -
                          1 && ", "}
                    </React.Fragment>
                  )
                )}
            </h1>

            <span className=" text-white relative top-[10vw] text-[3vw] medium:text-[2.5vw] large:text-[2vw] xlarge:text-[1.6vw] 2xlarge:text-[1.4vw]">
              Genre
            </span>
            <h1 className="relative top-[5vw] text-emerald-400 left-[15vw] text-[3vw] medium:text-[2.5vw] medium:top-[6vw] large:text-[2vw] large:top-[7vw] large:left-[12vw] xlarge:text-[1.6vw] xlarge:top-[7.5vw] xlarge:left-[11vw] 2xlarge:text-[1.4vw] 2xlarge:top-[8vw] 2xlarge:left-[10vw]">
              {NowShowingMoviesDetails &&
                NowShowingMoviesDetails?.genres?.genres.map((data, index) => (
                  <React.Fragment key={index}>
                    {data?.text}
                    {index <
                      NowShowingMoviesDetails?.genres?.genres?.length - 1 &&
                      ", "}
                  </React.Fragment>
                ))}
            </h1>
          </div>
        </div>
        <div
          className="flex gap-5 bg-red-30  relative left-[8vw] bottom-[45vw] 
                xsmall:left-[7vw] xsmall:gap-4 xsmall:bottom-[39vw]
                small:left-[6vw] small:gap-3 small:bottom-[33vw]
                medium:left-[5vw] medium:gap-2 medium:bottom-[33vw]
                large:left-[4vw] large:gap-1 large:bottom-[35vw]
                xlarge:left-[3vw] xlarge:bottom-[33vw]
                2xlarge:-left-[5vw] 2xlarge:bottom-[28vw]"
        >
          <h1
            className="whitespace-nowrap text-[2vw] bottom-1  relative left-[34vw] font-bold text-yellow-400
                 xsmall:text-[2vw] xsmall:left-[32vw]
                 small:text-[2vw] small:left-[35vw] small:bottom-[6vw]
                 medium:text-[2vw] medium:left-[36vw] medium:bottom-[6vw]
                 large:text-[1.5vw] large:left-[36vw] large:bottom-[8vw]
                 xlarge:text-[1.5vw] xlarge:left-[36vw]
                 2xlarge:text-[1.2vw] 2xlarge:left-[50vw] 2xlarge:bottom-[12vw]                 "
          >
            CINEOUT RATING
          </h1>
          <span
            className="absolute top-8 left-3 text-[1.5vw] text-yellow-400
                   xsmall:text-[1.3vw] xsmall:top-9
                   small:text-[1.1vw] small:top-8 small:left-[4vw]
                   medium:text-[0.9vw] medium:top-8  medium:left-[6vw]
                   large:text-[0.7vw] large:top-6  large:left-[5vw]
                   xlarge:text-[0.5vw] xlarge:top-5
                   2xlarge:text-[0.3vw] 2xlarge:top-4"
          >
            <FaStar
              className="relative left-[33.5vw] bottom-[5vw] text-[2vw]
                    xsmall:text-[2vw] xsmall:bottom-[3vw]
                      small:text-[1.6vw] small:bottom-[6.4vw]
                      medium:text-[2vw] medium:bottom-[6vw]
                      large:text-[2vw] large:bottom-[6vw]
                      xlarge:text-[2vw] xlarge:bottom-[7vw] xlarge:left-[32vw]
                      2xlarge:text-[1.5vw] 2xlarge:bottom-[10vw] 2xlarge:left-[47vw]          "
            />
            <span
              className="inline-block relative text-[2.5vw] left-[36vw] bottom-[8vw] text-red-600
                     xsmall:text-[2.3vw] xsmall:bottom-[6vw]
                     small:text-[2.1vw] small:bottom-[9vw]
                     medium:text-[2.2vw] medium:bottom-[8.5vw]
                     large:text-[2vw] large:bottom-[8.5vw]
                     xlarge:text-[2vw] xlarge:bottom-[9.5vw] xlarge:left-[35vw]
                     2xlarge:text-[1.5vw] 2xlarge:bottom-[12.5vw] 2xlarge:left-[49vw] "
            >
              {NowShowingMoviesDetails?.ratingsSummary?.aggregateRating}/10
            </span>
            <span
              className="relative right-8 left-[29vw] text-white bottom-[6vw] text-[2vw]
                     xsmall:text-[1.8vw] xsmall:bottom-[4vw]
                     small:text-[1.6vw] small:bottom-[7vw] small:left-[30vw]
                     medium:text-[2vw] medium:bottom-[5.5vw] medium:left-[30vw]
                     large:text-[1.5vw] large:bottom-[6vw]
                     xlarge:text-[1.5vw] xlarge:bottom-[8vw]
                     2xlarge:text-[1.5vw] 2xlarge:bottom-[11vw] 2xlarge:left-[45vw]"
            >
              (
              <NumberFormatter
                number={NowShowingMoviesDetails?.ratingsSummary?.voteCount}
              />
              )
            </span>
          </span>
          <h1
            className="whitespace-nowrap relative left-[34vw] font-bold text-[2vw]
                 xsmall:text-[2vw] xsmall:left-[35vw] 
                 small:text-[2vw] small:left-[38vw] small:-top-[6vw]
                 medium:text-[2vw] medium:left-[42vw] 
                 large:text-[1.5vw] large:left-[43vw] large:-top-[8vw]
                 xlarge:text-[1.5vw] xlarge:left-[43vw]
                 2xlarge:text-[1.2vw] 2xlarge:left-[57vw] 2xlarge:-top-[12vw]"
          >
            YOUR RATING
          </h1>
          <span
            className="absolute top-3 left-[57vw] text-[3vw] text-yellow-400
                 xsmall:text-[2.5vw] xsmall:left-[56vw] xsmall:top-[3vw]
                   small:text-[3vw] small:left-[57vw]  small:-top-[3vw]
                   medium:text-[2.1vw] medium:left-[62vw] medium:-top-[2.5vw]
                   large:text-[2.5vw] large:left-[57vw] large:-top-[5vw]
                   xlarge:text-[2.5vw] xlarge:left-[58vw] xlarge:-top-[5.5vw]
                   2xlarge:text-[2.5vw] 2xlarge:left-[68vw] 2xlarge:-top-[9.5vw]"
          >
            <IoStarOutline />
          </span>
          <h1
            onClick={toggle}
            className="absolute top-3 hover:underline cursor-pointer left-[61vw] text-[2.3vw] font-semibold
                 xsmall:text-[2.1vw] xsmall:left-[59vw] xsmall:top-[2.8vw]
                 small:text-[2.2vw] small:left-[61vw] small:-top-[3vw]
                 medium:text-[2vw] medium:left-[65vw]
                 large:text-[1.5vw] large:left-[60vw] large:-top-[5vw]
                 xlarge:text-[1.5vw] xlarge:left-[61vw] xlarge:-top-[5vw]
                 2xlarge:text-[1.5vw] 2xlarge:left-[71vw] 2xlarge:-top-[9.5vw]"
          >
            RATE
          </h1>
          {isShowing && (
            <div className="modal-wrapper">
              <div className="modal">
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-red-500
                           xsmall:top-1 xsmall:right-1
                           2xlarge:top-3 2xlarge:right-3"
                  onClick={toggle}
                >
                  &#10006;
                </button>
                <TiStarFullOutline
                  className="text-yellow-400 text-[7vw] absolute z-100 left-[18vw] -top-[0.5vw]
                                      xsmall:text-[6.5vw] xsmall:left-[17vw]
                                      small:text-[6vw] small:left-[16vw]
                                      medium:text-[5.5vw] medium:left-[15vw]
                                      large:text-[5vw] large:left-[14vw]
                                      xlarge:text-[4.5vw] xlarge:left-[13vw]
                                      2xlarge:text-[4vw] 2xlarge:left-[12vw]"
                />
                <span
                  className="relative left-[20.2vw] text-[1.4vw] top-[1.2vw] text-black font-semibold
                         xsmall:text-[1.3vw] xsmall:left-[19.2vw]
                         small:text-[1.2vw] small:left-[18.2vw]
                         medium:text-[1.1vw] medium:left-[17.2vw]
                         large:text-[1vw] large:left-[16.2vw]
                         xlarge:text-[0.9vw] xlarge:left-[15.2vw]
                         2xlarge:text-[0.8vw] 2xlarge:left-[14.2vw]"
                >
                  ?
                </span>
                <h1
                  className="absolute left-[19.5vw] top-[6vw] text-[1vw] text-white font-semibold
                       xsmall:left-[18.5vw] xsmall:top-[5.5vw]
                       small:left-[17.5vw] small:top-[5vw]
                       medium:left-[16.5vw] medium:top-[4.5vw]
                       large:left-[15.5vw] large:top-[4vw]
                       xlarge:left-[14.5vw] xlarge:top-[3.5vw]
                       2xlarge:left-[13.5vw] 2xlarge:top-[3vw]"
                >
                  Rate This
                </h1>
                <h1
                  className="absolute left-[15vw] text-[1.5vw] top-[7.5vw] font-semibold
                       xsmall:text-[1.4vw] xsmall:left-[14vw] xsmall:top-[7vw]
                       small:text-[1.3vw] small:left-[13vw] small:top-[6.5vw]
                       medium:text-[1.2vw] medium:left-[12vw] medium:top-[6vw]
                       large:text-[1.1vw] large:left-[11vw] large:top-[5.5vw]
                       xlarge:text-[1vw] xlarge:left-[10vw] xlarge:top-[5vw]
                       2xlarge:text-[0.9vw] 2xlarge:left-[9vw] 2xlarge:top-[4.5vw]"
                >
                  {NowShowingMoviesDetails?.titleText?.text}
                </h1>
                <span
                  className="absolute left-[12vw] text-[1.5vw] top-[11vw] font-semibold
                         xsmall:text-[1.4vw] xsmall:left-[11vw] xsmall:top-[10.5vw]
                         small:text-[1.3vw] small:left-[10vw] small:top-[10vw]
                         medium:text-[1.2vw] medium:left-[9vw] medium:top-[9.5vw]
                         large:text-[1.1vw] large:left-[8vw] large:top-[9vw]
                         xlarge:text-[1vw] xlarge:left-[7vw] xlarge:top-[8.5vw]
                         2xlarge:text-[0.9vw] 2xlarge:left-[6vw] 2xlarge:top-[8vw]"
                >
                  <div className="flex gap-2">
                    {Array.from({ length: 10 }, (_, index) => (
                      <span
                        key={index}
                        className="text-yellow-400 text-[1.5vw] relative cursor-pointer
                           xsmall:text-[1.4vw]
                           small:text-[1.3vw]
                           medium:text-[1.2vw]
                           large:text-[1.1vw]
                           xlarge:text-[1vw]
                           2xlarge:text-[0.9vw]"
                        onMouseEnter={() => {
                          if (clickedIndex === null || clickedIndex === index) {
                            setHoveredIndex(index);
                          }
                        }}
                        onMouseLeave={() => {
                          if (clickedIndex === null || clickedIndex === index) {
                            setHoveredIndex(null);
                          }
                        }}
                        onClick={() => handleIconClick(index)}
                      >
                        {clickedIndex === index || hoveredIndex === index ? (
                          <RiStarFill
                            className="text-[1.5vw] relative cursor-pointer text-blue-500
                                         xsmall:text-[1.4vw]
                                         small:text-[1.3vw]
                                         medium:text-[1.2vw]
                                         large:text-[1.1vw]
                                         xlarge:text-[1vw]
                                         2xlarge:text-[0.9vw]"
                          />
                        ) : (
                          <RiStarLine />
                        )}
                      </span>
                    ))}
                  </div>
                </span>
                <button
                  className="Rate-button relative top-[14vw] left-[16vw]
                           xsmall:top-[13vw] xsmall:left-[15vw]
                           small:top-[12vw] small:left-[14vw]
                           medium:top-[11vw] medium:left-[13vw]
                           large:top-[10vw] large:left-[12vw]
                           xlarge:top-[9vw] xlarge:left-[11vw]
                           2xlarge:top-[8vw] 2xlarge:left-[10vw]"
                >
                  <span className="Rate-button-content">Rate </span>
                </button>
              </div>
            </div>
          )}
          <h1
            className="font-bold relative left-[35vw] text-[2vw]
                 xsmall:text-[2vw] xsmall:left-[39vw]
                 small:text-[2vw] small:left-[41vw] small:-top-[6vw]
                 medium:text-[2vw] medium:left-[45vw]
                 large:text-[1.5vw] large:left-[48vw] large:-top-[8vw]
                 xlarge:text-[1.5vw] xlarge:left-[53vw] xlarge:-top-[8vw]
                 2xlarge:text-[1.5vw] 2xlarge:left-[63vw] 2xlarge:-top-[12vw]"
          >
            POPULARITY
          </h1>
          <span
            className="absolute left-[75vw] top-4 text-[3vw] border-2 border-lime-400 rounded-full p-[0.1vw]
                   xsmall:text-[2.7vw] xsmall:left-[73vw] xsmall:top-6
                   small:text-[3.5vw] small:left-[75vw] small:-top-[3vw]
                   medium:text-[2.1vw] medium:left-[78vw]
                   large:text-[2vw] large:left-[72vw] large:-top-[5vw]
                   xlarge:text-[2vw] xlarge:left-[76vw] xlarge:-top-[5vw]
                   2xlarge:text-[2vw] 2xlarge:left-[82vw] 2xlarge:-top-[9vw]"
          >
            {NowShowingMoviesDetails?.meterRanking?.currentRank > 5 ? (
              <FaArrowTrendDown />
            ) : (
              <FaArrowTrendUp />
            )}
          </span>
          <span
            className="absolute flex left-[81vw] top-4 text-[2.5vw] font-bold
                   xsmall:text-[2.3vw] xsmall:left-[79vw] xsmall:top-6
                   small:text-[3vw] small:left-[80vw] small:-top-[3vw]
                   medium:text-[1.9vw] medium:left-[82vw]
                   large:text-[1.5vw] large:left-[76vw] large:-top-[5vw]
                   xlarge:text-[1.5vw] xlarge:left-[80vw]
                   2xlarge:text-[1.3vw] 2xlarge:left-[85vw] 2xlarge:-top-[9vw]"
          >
            {NowShowingMoviesDetails?.meterRanking?.currentRank}
            <span className="relative left-[1vw] top-">
              {NowShowingMoviesDetails?.meterRanking?.rankChange
                ?.changeDirection === "UP" ? (
                <IoMdArrowDropup
                  className="relative text-[4vw]
                                    xsmall:text-[2.5vw]
                                    small:text-[2.5vw]
                                    medium:text-[2.5vw]
                                    large:text-[2.5vw]
                                    xlarge:text-[2.5vw]
                                    2xlarge:text-[2.4 vw]"
                />
              ) : (
                <IoMdArrowDropdown
                  className="relative text-[4vw]
                                      xsmall:text-[2.5vw]
                                      small:text-[2.5vw]
                                      medium:text-[2.5vw]
                                      large:text-[2vw]
                                      xlarge:text-[2.5vw]
                                      2xlarge:text-[2vw]"
                />
              )}
            </span>
            <span
              className="ml-1 text-[2.5vw] text-yellow-400
                     xsmall:text-[2.3vw]
                     small:text-[2.5vw]
                     medium:text-[2.5vw]
                     large:text-[1.5vw]
                     xlarge:text-[1.5vw]
                     2xlarge:text-[1.3vw] 2xlarge:ml-2"
            >
              {NowShowingMoviesDetails?.meterRanking?.rankChange?.difference}
            </span>
          </span>
        </div>
        <div className=" relative  ml-[35vw] -top-[5vw] ">
          <div class="btn-donate  h-[7vh] relative left-[20vw] xsmall:left-[27vw] xsmall:top-[6vw] small:left-[26vw] small:top-[5vw] medium:left-[35vw] medium:top-[2vw] large:-top-[3vw] large:left-[40vw] xlarge:top-[2vw] xlarge:left-[40vw] 2xlarge:left-[40vw] 2xlarge:top-[4vw]">
            <span className=" relative bottom-5 left-3 text-[3vw] xsmall:text-[2.5vw] small:text-[2vw] medium:text-[1.8vw] large:text-[1.4vw] xlarge:text-[1.5vw] 2xlarge:text-[1.3vw]">
              {" "}
              <span className=" relative top-5 right-4  medium:top-6 large:top-6 large:right-5  xlarge:top-7 xlarge:right-6 2xlarge:top-8 2xlarge:right-6 ">
                <FaPlus className="" />
              </span>
              Add to Watchlist
            </span>
            <h1 className=" relative bottom-5 whitespace-nowrap text-black text-[3vw] xsmall:text-[2.5vw] small:text-[2vw] medium:text-[1.8vw] large:text-[1.4vw] xlarge:text-[1.5vw] 2xlarge:text-[1.3vw]  ">
              {
                NowShowingMoviesDetails?.engagementStatistics
                  ?.watchlistStatistics?.displayableCount?.text
              }
            </h1>
          </div>
          <div className=" flex cursor-pointer">
            <h1 className=" font-semibold text-yellow-400 text-[2vw] relative left-[22vw] xsmall:left-[25vw] xsmall:top-[5vw] small:left-[24vw] medium:left-[30vw] medium:top-[1vw] medium:text-[1.6vw] large:left-[36vw] large:-top-[3vw] large:text-[1.5vw] xlarge:left-[37vw] xlarge:top-[2vw] xlarge:text-[1.5vw] 2xlarge:left-[38vw] 2xlarge:top-[4vw] 2xlarge:text-[1.3vw] mt-2">
              {NowShowingMoviesDetails?.reviews?.total}{" "}
              <span className=" whitespace-nowrap font-normal text-white mr-5 hover:underline">
                User reviews
              </span>{" "}
            </h1>{" "}
            <h1 className=" font-semibold text-yellow-400 text-[2vw] relative left-[20vw] xsmall:left-[25vw] xsmall:top-[5vw] small:left-[23vw] medium:left-[30vw] medium:top-[1vw] medium:text-[1.8vw] large:left-[36vw] large:-top-[3vw] large:text-[1.5vw] xlarge:left-[36vw] xlarge:top-[2vw] xlarge:text-[1.5vw] mt-2 2xlarge:left-[40vw] 2xlarge:top-[4vw] 2xlarge:text-[1.3vw]  ">
              {NowShowingMoviesDetails?.criticReviewsTotal?.total}{" "}
              <span className=" whitespace-nowrap font-normal text-white hover:underline">
                Critics reviews
              </span>
            </h1>
          </div>
          <div>
            <h1 className=" font-semibold text-yellow-400 cursor-pointer text-[2vw] mt-1   ">
              <span className=" mr-3 inline-block relative left-[30vw] xsmall:left-[33vw] xsmall:top-[5vw] small:left-[32vw] medium:top-[1vw] medium:left-[38vw] large:left-[42vw] large:-top-[3vw] large:text-[1.5vw] xlarge:left-[42vw] xlarge:top-[2vw] xlarge:text-[1.5vw] 2xlarge:left-[45vw] 2xlarge:top-[4vw] 2xlarge:text-[1.3vw] ">
                {NowShowingMoviesDetails?.metacritic?.metascore?.score}{" "}
              </span>
              <span className="font-normal text-white hover:underline relative left-[28vw] xsmall:left-[33vw] xsmall:top-[5vw] small:left-[32vw] medium:left-[38vw] medium:top-[1vw] large:left-[42vw] large:-top-[3vw] large:text-[1.5vw] xlarge:left-[42vw] xlarge:top-[2vw] xlarge:text-[1.5vw] 2xlarge:left-[45vw] 2xlarge:top-[4vw] 2xlarge:text-[1.3vw]">
                Metascore
              </span>
            </h1>
          </div>
        </div>

        <div className=" bg-red-30 absolute left-[35vw] xsmall:left-[32vw] top-[17vw] xsmall:top-[15vw] small:top-[13vw] medium:top-[10vw] large:top-[10vw] xlarge:top-[10vw] xlarge:left-[28vw] 2xlarge:left-[25vw]">
          <h1 className=" text-[3vw] xsmall:text-[2.5vw] small:text-[2.5vw] medium:text-[2.5vw] large:text-[2vw] xlarge:text-[1.5vw] 2xlarge:text-[1.2vw] text-red-600 font-bold">
            STORYLINE
          </h1>
          <p className=" w-[60vw] text-[2.5vw] xsmall:text-[2.2vw] small:text-[2.3vw] medium:text-[2.3vw] large:text-[2vw] xlarge:text-[2vw] 2xlarge:text-[1.6vw] mt-2 text-amber-300">
            {NowShowingMoviesDetails?.plot?.plotText?.plainText}
          </p>
        </div>

        <div className=" bg-red-30 relative top-[50vw]  left-[10vw] text-[4vw] xsmall:text-[3vw] xsmall:top-[50vw] small:text-[3vw] small:top-[50vw] medium:text-[2.5vw] medium:top-[40vw] large:text-[2vw] large:top-[30vw] xlarge:top-[30vw] 2xlarge:top-[25vw] 2xlarge:text-[1.5vw] font-bold ">
          <h1>TOP CAST</h1>
          <div className="flex justify-between mt-5">
            <div className="name-list flex justify-start">
              <div className="-ml-[3vw] small:-ml-[2vw] medium:-ml-[1vw] 2xlarge:-ml-[0vw]">
                {renderNames(leftNames)}
              </div>
              {middleNames.length > 0 && (
                <div className="ml-[8vw] small:ml-[9vw] medium:ml-[10vw] 2xlarge:ml-[7vw]">
                  {renderNames(middleNames)}
                </div>
              )}
              {rightNames.length > 0 && (
                <div className="ml-[8vw] xsmall:ml-[8vw] small:ml-[9vw]  large:ml-[5vw] xlarge:ml-[7vw] 2xlarge:ml-[5vw]">
                  {renderNames(rightNames)}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="relative top-[65vw] bg-red-30 left-[5vw] text-[5vw]  xsmall:text-[4vw] xsmall:top-[65vw] small:text-[3vw] small:top-[65vw] medium:text-[2.5vw] medium:top-[50vw] large:text-[2.2vw] large:top-[40vw] xlarge:text-[2vw] xlarge:top-[38vw] 2xlarge:text-[1.5vw] 2xlarge:top-[30`vw]">
          <h1 className="font-bold">More Titles Like This</h1>
          <div className=" relative -mx-[2vw] w-[95vw] h-auto large:h-[70vh] xlarge:h-auto 2xlarge:h-[65vh] mt-10 border-l-2 my-2 border-r-2 border-blue-600 flex flex-nowrap overflow-x-auto overflow-y-hidden no-scrollbar gap-5">
            {NowShowingMoviesDetails &&
              NowShowingMoviesDetails?.moreLikeThisTitles?.edges.map(
                (data, index) => (
                  <div
                    key={index}
                    className="flex flex-col max-w-[47vw] h-auto mx-5 my-5 rounded-lg bg-black glow6 
             xsmall:max-w-[35vw] xsmall:h-auto
             small:max-w-[40vw] small:h-auto
             medium:max-w-[30vw] medium:h-[57vh]
             large:max-w-[20vw] large:h-auto  
             xlarge:max-w-[18vw] xlarge:h-auto
             2xlarge:max-w-[15vw] 2xlarge:h-auto"
                  >
                    <img
                      className="w-full h-auto object-cover px-2 py-2 rounded-2xl
               aspect-[3/4]"
                      src={data?.node?.primaryImage?.url}
                      alt="no image available"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://www.prokerala.com/movies/assets/img/no-poster-available.jpg";
                      }}
                    />
                    <h1
                      className="mx-5 text-2xl font-bold text-teal-400 overflow-hidden whitespace-nowrap truncate
                 xsmall:text-xl
                 small:text-lg
                 medium:text-xl
                 large:text-2xl
                 xlarge:text-3xl
                 2xlarge:text-2xl"
                    >
                      {data?.node?.originalTitleText?.text}
                    </h1>
                    <span
                      className="mx-5 text-lg text-rose-400
                   xsmall:text-base
                   small:text-sm
                   medium:text-base
                   large:text-lg
                   xlarge:text-xl
                   2xlarge:text-lg"
                    >
                      ({data?.node?.releaseYear?.year})
                    </span>
                    <span className="mx-5 text-yellow-400 inline-flex items-center">
                      <IoMdStar className="mr-1" />
                      <span
                        className="text-lg
                     xsmall:text-base
                     small:text-sm
                     medium:text-base
                     large:text-lg
                     xlarge:text-xl
                     2xlarge:text-2xl"
                      >
                        {data?.node?.ratingsSummary?.aggregateRating}
                      </span>
                    </span>
                    <span
                      className="mx-5 text-[4vw] mb-4  text-violet-500 whitespace-nowrap truncate 
                   xsmall:text-sm
                   small:text-xs
                   medium:text-sm
                   large:text-base
                   xlarge:text-lg
                   2xlarge:text-xl"
                    >
                      {data &&
                        data?.node?.titleGenres?.genres.map((movie, index) => (
                          <React.Fragment key={index}>
                            {movie?.genre?.text}
                            {index <
                              data?.node?.titleGenres?.genres?.length - 1 &&
                              ", "}
                          </React.Fragment>
                        ))}
                    </span>
                  </div>
                )
              )}
          </div>
        </div>

        <div
          className="relative 
                top-[85vw] left-[5vw] 
                xsmall:top-[75vw] xsmall:left-[5vw]
                small:top-[75vw] small:left-[5vw]
                medium:top-[60vw] medium:left-[5vw]
                large:top-[50vw] large:left-[5vw]
                xlarge:top-[45vw] xlarge:left-[5vw]
                2xlarge:top-[43vw] 2xlarge:left-[5vw]
                inline-block"
        >
          <h1
            className="text-[5vw] 
                 xsmall:text-[3.5vw]
                 small:text-[3vw]
                 medium:text-[2.5vw]
                 large:text-[2vw]
                 xlarge:text-[1.5vw]
                 2xlarge:text-[1.5vw]
                 font-bold"
          >
            Details
          </h1>
        </div>
        <div className="  relative  top-[90vw] left-[5vw] xsmall:top-[80vw] small:top-[80vw] medium:top-[65vw] large:top-[53vw] xlarge:top-[48vw] 2xlarge:top-[45vw]">
          <h1 className="text-[2.5vw] medium:text-[2vw] large:text-[1.7vw] xlarge:text-[1.5vw] 2xlarge:text-[1.2vw] text-blue-500 border-t-[1px] border-b-[1px]  border-gray-700 py-5">
            <span className="  text-yellow-400 mr-5">Release Date</span>
            {NowShowingMoviesDetails?.releaseDate?.month}
            {"/"}
            {NowShowingMoviesDetails?.releaseDate?.day}
            {"/"}
            {NowShowingMoviesDetails?.releaseDate?.year}
          </h1>
          <h1 className=" text-[2.5vw] medium:text-[2vw] large:text-[1.7vw] xlarge:text-[1.5vw] 2xlarge:text-[1.2vw] text-blue-500 border-b-[1px] border-gray-700 py-5">
            <span className=" mr-5 text-yellow-400">Countries of Origins</span>
            {NowShowingMoviesDetails &&
              NowShowingMoviesDetails?.countriesOfOrigin?.countries.map(
                (data) => {
                  return data?.id;
                }
              )}
          </h1>
          <h1 className=" text-[2.5vw] medium:text-[2vw] large:text-[1.7vw] xlarge:text-[1.5vw] 2xlarge:text-[1.2vw] text-blue-500  border-b-[1px] border-gray-700 py-5">
            <span className=" mr-5 text-yellow-400">Language</span>
            {NowShowingMoviesDetails &&
              NowShowingMoviesDetails?.spokenLanguages?.spokenLanguages.map(
                (data) => {
                  return data?.text;
                }
              )}
          </h1>
          <h1 className=" text-[2.5vw] medium:text-[2vw] large:text-[1.7vw] xlarge:text-[1.5vw] 2xlarge:text-[1.2vw] text-emerald-500  border-b-[1px] border-gray-700 py-5">
            <span className="mr-5 text-yellow-400">Also Known As</span>
            {NowShowingMoviesDetails &&
              NowShowingMoviesDetails?.akas?.edges.map((data) => {
                return data?.node?.text;
              })}
          </h1>
          <h1 className=" text-[2.5vw] medium:text-[2vw] large:text-[1.7vw] xlarge:text-[1.5vw] 2xlarge:text-[1.2vw] text-blue-500  border-b-[1px] border-gray-700 py-5">
            <span className=" mr-5 text-yellow-400">Filming Locations</span>
            {NowShowingMoviesDetails &&
              NowShowingMoviesDetails?.filmingLocations?.edges.map((data) => {
                return data?.node?.text;
              })}{" "}
            <span className=" text-cyan-400">(Studio)</span>
          </h1>
          <h1 className="text-[2.5vw] medium:text-[2vw] large:text-[1.7vw] xlarge:text-[1.5vw] 2xlarge:text-[1.2vw] text-blue-500 border-b-[1px] border-gray-700 py-5">
            <span className="mr-5 text-yellow-400">Production Companies</span>
            {NowShowingMoviesDetails &&
              NowShowingMoviesDetails?.production?.edges.map((data, index) => (
                <React.Fragment key={index}>
                  {data?.node?.company?.companyText?.text}
                  {index <
                    NowShowingMoviesDetails?.production?.edges?.length - 1 &&
                    " & "}
                </React.Fragment>
              ))}
          </h1>

          <h1 className="text-[2.5vw] medium:text-[2vw] large:text-[1.7vw] xlarge:text-[1.5vw] 2xlarge:text-[1.2vw] flex text-blue-500 border-b-[1px] border-gray-700 py-5">
            <span className="mr-5 text-yellow-400">Official Sites</span>
            {NowShowingMoviesDetails &&
              NowShowingMoviesDetails?.detailsExternalLinks?.edges.map(
                (data, index) => (
                  <React.Fragment key={index}>
                    <Link
                      className=" hover:underline  hover:text-red-500"
                      to={`${data?.node?.url}`}
                    >
                      <span>{data?.node?.label}</span>
                    </Link>
                    {index <
                      NowShowingMoviesDetails?.detailsExternalLinks?.edges
                        ?.length -
                        1 && <span className="mx-2">& </span>}
                  </React.Fragment>
                )
              )}
            {"."}
          </h1>
        </div>

        <div
          className=" relative 
                top-[108vw] left-[5vw]  text-[5vw]
                xsmall:top-[95vw] xsmall:left-[5vw] xsmall:text-[4vw]
                small:top-[90vw] small:left-[5vw] small:text-[3vw]
                medium:top-[75vw] medium:left-[5vw] medium:text-[2.5vw]
                large:top-[60vw] large:left-[5vw] large:text-[2vw]
                xlarge:top-[55vw] xlarge:left-[5vw] xlarge:text-[1.8vw]
                2xlarge:top-[50vw] 2xlarge:left-[5vw]  2xlarge:text-[1.5vw]
                inline-block font-bold"
        >
          <h1>User Reviews</h1>
        </div>

        <div
          className="flex flex-col ml-[2vw] relative 
                top-[115vw]
                xsmall:top-[100vw]
                small:top-[95vw]
                medium:top-[80vw]
                large:top-[63vw]
                xlarge:top-[57vw]
                2xlarge:top-[53vw]"
        >
          <div
            className="w-[95vw] h-auto
               xsmall:w-[95vw]
               small:w-[90vw]
               medium:w-[85vw]
               large:w-[80vw]
               xlarge:w-[70vw]
               2xlarge:w-[60vw] 2xlarge:ml-[3vw]
               rounded-lg px-5 py-4 mb-4"
            style={{
              backgroundColor: "slategrey",
            }}
          >
            <h1
              className="review w-[45vw] 
                   xsmall:w-[40vw]
                   small:w-[35vw]
                   medium:w-[30vw]
                   large:w-[25vw]
                   xlarge:w-[20vw]
                   2xlarge:w-[15vw]"
            >
              FEATURED REVIEW
            </h1>
            <div>
              {NowShowingMoviesDetails?.featuredReviews?.edges.map(
                (data, index) => {
                  const fullText = data?.node?.text?.originalText?.plainText;
                  const isLongText = fullText.split(" ").length > 150;
                  const displayText = expandedReviews[index]
                    ? fullText
                    : trimTextTo130Words(fullText);

                  return (
                    <div key={index}>
                      <div className="mt-5">
                        <h1
                          className="text-[4vw]
                               xsmall:text-[3.5vw]
                               small:text-[3.5vw]
                               medium:text-[2.7vw]
                               large:text-[2.3vw]
                               xlarge:text-[1.8vw]
                               2xlarge:text-[1.6vw]
                               font-bold text-lime-500"
                        >
                          "{data?.node?.summary?.originalText}"
                        </h1>
                      </div>
                      <div className="relative">
                        <p
                          className="mt-7 text-[3vw] leading-7
                              xsmall:text-[3vw] xsmall:leading-7
                              small:text-[2.2vw] small:leading-7
                              medium:text-[1.8vw] medium:leading-8
                              large:text-[1.5vw] large:leading-8
                              xlarge:text-[1.3vw] xlarge:leading-8
                              2xlarge:text-[1vw] 2xlarge:leading-8
                              overflow-ellipsis text-amber-400 font-semibold"
                        >
                          {displayText.slice(0, 800)}
                          {"..."}
                        </p>
                        {isLongText && (
                          <span
                            className="block mt-2 cursor-pointer text-white"
                            onClick={() => toggleReview(index)}
                          >
                            {expandedReviews[index] ? (
                              <IoMdArrowDropupCircle size={24} />
                            ) : (
                              <IoMdArrowDropdownCircle size={24} />
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>

        <div
          className=" relative 
                top-[130vw] left-[5vw]  text-[5vw]
                xsmall:top-[110vw] xsmall:left-[5vw] xsmall:text-[4vw]
                small:top-[105vw] small:left-[5vw] small:text-[3vw]
                medium:top-[90vw] medium:left-[5vw] medium:text-[2.5vw]
                large:top-[70vw] large:left-[5vw] large:text-[2vw]
                xlarge:top-[62vw] xlarge:left-[5vw] xlarge:text-[1.8vw]
                2xlarge:top-[58vw] 2xlarge:left-[5vw]  2xlarge:text-[1.5vw]
                inline-block font-bold  "
        >
          <h1 className=" ">Box Office</h1>
        </div>
        <div
          className="relative 
                top-[135vw] left-[5vw]
                xsmall:top-[115vw] xsmall:left-[5vw]
                small:top-[110vw] small:left-[5vw]
                medium:top-[95vw] medium:left-[5vw]
                large:top-[73vw] large:left-[5vw]
                xlarge:top-[65vw] xlarge:left-[5vw]
                2xlarge:top-[60vw] 2xlarge:left-[5vw]"
        >
          <div className="Budget">
            <h1 className="text-[4vw] xsmall:text-[4vw] small:text-[3vw] medium:text-[3vw] large:text-[2vw] xlarge:text-[1.5vw] 2xlarge:text-[1.2vw] font-semibold text-sky-500 whitespace-nowrap mb-3">
              Budget
            </h1>
            <h1 className="text-white text-[3vw] xsmall:text-[3.5vw] small:text-[3vw] medium:text-[2.3vw] large:text-[1.5vw] xlarge:text-[1.2vw] 2xlarge:text-[1vw] mb-5">
              ${NowShowingMoviesDetails?.productionBudget?.budget?.amount}
              (estimated)
            </h1>
          </div>
          <div className="opening Earning">
            {NowShowingMoviesDetails?.openingWeekendGross && (
              <>
                <h1 className="text-sky-500 w-[40vw] font-semibold mb-3 text-[4vw] xsmall:text-[4vw] small:text-[3vw] medium:text-[3vw] large:text-[2vw] xlarge:text-[1.5vw] 2xlarge:text-[1.2vw]">
                  Opening weekend US & Canada
                </h1>
                <h1 className="text-white text-[3vw] xsmall:text-[3.5vw] small:text-[3vw] medium:text-[2.3vw] large:text-[1.5vw] xlarge:text-[1.2vw] 2xlarge:text-[1vw]">
                  $
                  {
                    NowShowingMoviesDetails.openingWeekendGross.gross.total
                      .amount
                  }
                </h1>
              </>
            )}
          </div>
          <div className="absolute left-[50vw] top-1 xsmall:text-[4vw] small:text-[3vw] medium:text-[3vw] large:text-[2vw] xlarge:text-[1.5vw] 2xlarge:text-[1.2vw]">
            {NowShowingMoviesDetails?.lifetimeGross && (
              <>
                <h1 className="text-sky-500 whitespace-nowrap mb-3 text-[4vw] xsmall:text-[2.8vw] small:text-[2.6vw] medium:text-[2.4vw] large:text-[2.2vw] xlarge:text-[2vw] 2xlarge:text-[1.3vw]">
                  Gross US & Canada
                </h1>
                <h1 className="text-white text-[3vw] xsmall:text-[3.5vw] small:text-[3vw] medium:text-[2.3vw] large:text-[1.5vw] xlarge:text-[1.2vw] 2xlarge:text-[1vw] mb-4">
                  ${NowShowingMoviesDetails.lifetimeGross.total.amount}
                </h1>
              </>
            )}
            {NowShowingMoviesDetails?.worldwideGross && (
              <>
                <h1 className="mb-3 whitespace-nowrap text-sky-500 text-[4vw] xsmall:text-[4vw] small:text-[3vw] medium:text-[3vw] large:text-[2vw] xlarge:text-[1.5vw] 2xlarge:text-[1.2vw]">
                  Gross worldwide
                </h1>
                <h1 className="text-white text-[3vw] xsmall:text-[3.5vw] small:text-[3vw] medium:text-[2.3vw] large:text-[1.5vw] xlarge:text-[1.2vw] 2xlarge:text-[1vw]">
                  ${NowShowingMoviesDetails.worldwideGross.total.amount}
                </h1>
              </>
            )}
          </div>
        </div>

        <div className=" relative top-[150vw] xsmall:top-[125vw] small:top-[120vw] medium:top-[105vw] large:top-[80vw] xlarge:top-[70vw] 2xlarge:top-[65vw] left-[5vw]  inline-block ">
          <h1 className="text-[5vw] xsmall:text-[4.5vw] small:text-[3.5vw] medium:text-[3vw] large:text-[2vw] xlarge:text-[1.8vw] 2xlarge:text-[1.5vw] font-bold mb-5">
            Technical Specs
          </h1>
          <h1 className=" text-[4vw] xsmall:text-[3.5vw] small:text-[3vw] medium:text-[2.3vw] large:text-[1.8vw] xlarge:text-[1.5vw] 2xlarge:text-[1.2vw] font-semibold mb-3 text-yellow-400">
            Runtime
            <span className=" ml-10 text-white">
              {" "}
              {
                NowShowingMoviesDetails?.runtime?.displayableProperty?.value
                  ?.plainText
              }
            </span>
          </h1>
          <h1 className="text-[4vw] xsmall:text-[3.5vw] small:text-[3vw] medium:text-[2.3vw] large:text-[1.8vw] xlarge:text-[1.5vw] 2xlarge:text-[1.2vw] font-semibold mb-3 text-yellow-400">
            Color
            <span className=" ml-10 text-lime-300">
              {NowShowingMoviesDetails &&
                NowShowingMoviesDetails?.technicalSpecifications?.colorations?.items.map(
                  (data) => {
                    return data?.text;
                  }
                )}
            </span>
          </h1>
          <h1 className="text-[4vw] xsmall:text-[3.5vw] small:text-[3vw] medium:text-[2.3vw] large:text-[1.8vw] xlarge:text-[1.5vw] 2xlarge:text-[1.2vw] font-semibold mb-3 text-yellow-400">
            Sound mix
            <span className="ml-10 text-lime-300 whitespace-break-spaces">
              {NowShowingMoviesDetails &&
                NowShowingMoviesDetails?.technicalSpecifications?.soundMixes?.items.map(
                  (data, index) => (
                    <React.Fragment key={index}>
                      {index > 0 && <span className="mx-1"> </span>}{" "}
                      {data?.text}
                      {index <
                        NowShowingMoviesDetails?.technicalSpecifications
                          ?.soundMixes?.items?.length -
                          1 && <span className="mx-1">, </span>}{" "}
                    </React.Fragment>
                  )
                )}
            </span>
          </h1>

          <h1 className=" text-[4vw] xsmall:text-[3.5vw] small:text-[3vw] medium:text-[2.3vw] large:text-[1.8vw] xlarge:text-[1.5vw] 2xlarge:text-[1.2vw] font-semibold text-yellow-400">
            Aspect ratio
            <span className=" ml-10 text-white">
              {NowShowingMoviesDetails &&
                NowShowingMoviesDetails?.technicalSpecifications?.aspectRatios?.items.map(
                  (data) => {
                    return data?.aspectRatio;
                  }
                )}
            </span>
          </h1>
        </div>
        <div
          className=" relative 
                top-[165vw] left-[5vw]  text-[5vw]
                xsmall:top-[140vw] xsmall:left-[5vw] xsmall:text-[4vw]
                small:top-[130vw] small:left-[5vw] small:text-[3vw]
                medium:top-[115vw] medium:left-[5vw] medium:text-[2.5vw]
                large:top-[90vw] large:left-[5vw] large:text-[2vw]
                xlarge:top-[75vw] xlarge:left-[5vw] xlarge:text-[1.8vw]
                2xlarge:top-[70vw] 2xlarge:left-[5vw]  2xlarge:text-[1.5vw]
                inline-block font-bold"
        >
          <h1 className="  photogallery">Photo Gallery</h1>
        </div>
        <div
          className="w-[95vw] bg-red-20 relative 
                top-[210vw] left-[1vw]
                xsmall:top-[210vw] xsmall:w-[98vw] xsmall:left-[vw]
                small:top-[190vw]
                medium:top-[165vw]
                large:top-[140vw]  large:w-[90vw] large:left-[5vw]
                xlarge:top-[135vw] xlarge:w-[93vw]
                2xlarge:top-[90vw]"
        >
          <div className="flex">
            <Swiper
              slidesPerView={1}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper"
              breakpoints={{
                480: {
                  // xsmall
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                640: {
                  // small
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  // medium
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1024: {
                  // large
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1280: {
                  // xlarge
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
                1536: {
                  // 2xlarge
                  slidesPerView: 4,
                  spaceBetween: 10,
                },
              }}
            >
              {NowShowingImages?.images?.edges
                .slice(0, 12)
                .map((data, index) => (
                  <SwiperSlide key={index} className="overflow-hidden">
                    <img
                      className="hover:rounded-lg hover:border-l-[3px] hover:border-r-[3px] hover:object-cover border-yellow-400 transition duration-300 ease-in-out hover:scale-105 hover:scale-y-120 mx-auto 
                         w-[80vw] h-[27vh] 
                         xsmall:w-[60vw] xsmall:h-[26vh]
                         small:w-[50vw] small:h-[26vh]
                         medium:w-[45vw] medium:h-[28vh]
                         large:w-[45vw] large:h-[26vh]
                         xlarge:w-[40vw] xlarge:h-[26vh]
                         2xlarge:w-[20vw] 2xlarge:h-[27vh]
                         object-top object-cover rounded-lg"
                      src={data?.node?.url}
                      alt=""
                    />
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>

        <div
          className=" relative 
                top-[230vw] left-[5vw]  text-[5vw]
                xsmall:top-[190vw] xsmall:left-[5vw] xsmall:text-[4vw]
                small:top-[180vw] small:left-[5vw] small:text-[3vw]
                medium:top-[155vw] medium:left-[5vw] medium:text-[2.5vw]
                large:top-[120vw] large:left-[5vw] large:text-[2vw]
                xlarge:top-[100vw] xlarge:left-[5vw] xlarge:text-[1.8vw]
                2xlarge:top-[90vw] 2xlarge:left-[5vw]  2xlarge:text-[1.5vw]
                inline-block font-bold"
        >
          <h1 className=" videogallery">Video Gallery</h1>
        </div>
        <div
          className="w-[95vw] bg-red-20 relative 
                top-[240vw] left-[1vw] h-[42vh] p-2  bg-lime-30
                xsmall:top-[240vw] xsmall:w-[99vw]
                small:top-[245vw]
                medium:top-[205vw] medium:w-[99vw]
                large:top-[175vw] large:w-[99vw] large:left-[vw]
                xlarge:top-[165vw] xlarge:w-[99vw]
                2xlarge:top-[115vw] 2xlarge:w-[92vw] 2xlarge:left-[5vw]"
        >
          <div className="flex">
            <Swiper
              slidesPerView={1}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper"
              breakpoints={{
                480: {
                  // xsmall
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                640: {
                  // small
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                768: {
                  // medium
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1024: {
                  // large
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1280: {
                  // xlarge
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
                1536: {
                  // 2xlarge
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
              }}
            >
              {NowShowingVideoGallery?.videos.map((data2, index) => (
                <SwiperSlide
                  key={index}
                  className="hover:underline hover:text-red-600"
                >
                  <div className="relative">
                    <img
                      className="mx-auto w-[80vw] h-[27vh] 
                         xsmall:w-[80vw] xsmall:h-[27vh]
                         small:w-[60vw] small:h-[27vh]
                         medium:w-[65vw] medium:h-[28vh]
                         large:w-[35vw] large:h-[28vh]
                         xlarge:w-[30vw] xlarge:h-[28vh]
                         2xlarge:w-[25vw] 2xlarge:h-[28vh]
                         object-top object-center hover:border-cyan-400 border-[3px] border-blue-800 rounded-lg"
                      src={data2?.image?.url}
                      alt=""
                    />
                    <BiPlayCircle
                      className="text-white absolute top-[25vw] xsmall:top-[18vw] small:top-[14vw] medium:top-[10vw] large:top-[9vw] xlarge:top-[7vw] 2xlarge:top-[6.5vw] left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                                     text-[8vw] 
                                     xsmall:text-[5vw]
                                     small:text-[5vw]
                                     medium:text-[5vw]
                                     large:text-[3.5vw]
                                     xlarge:text-[3vw]
                                     2xlarge:text-[2vw]"
                    />
                    <div className=" relative  bottom-[2vw] left-0 right-0 p-2 bg-red-30 bg-opacity-50">
                      {/* <h1
                        className="text-[4.2vw] relative  bottom-[1vw]  left-[vw]
                             xsmall:text-[3.5vw] xsmall:top-[1vw]
                             small:text-[3vw]
                             medium:text-[2.5vw]
                             large:text-[2vw]
                             xlarge:text-[1.8vw]
                             2xlarge:text-[1.5vw]
                             font-bold text-black"
                      >
                        Trailer {convertDuration(data2?.durationInSeconds)}
                      </h1> */}
                      <h1
                        className="text-white text-[4vw] relative top-[2vw]
                             xsmall:text-[3.5vw]
                             small:text-[2.5vw]
                             medium:text-[2vw]
                             large:text-[1.5vw] large:top-[3vw]
                             xlarge:text-[1.5vw] xlarge:top-[2vw]
                             2xlarge:text-[1vw] 2xlarge:top-[2vw]
                             font-semibold"
                      >
                        Watch {data2?.title}
                      </h1>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <div
          className=" relative 
                top-[220vw] left-[5vw]  text-[5vw]
                xsmall:top-[190vw] xsmall:left-[5vw] xsmall:text-[4vw]
                small:top-[180vw] small:left-[5vw] small:text-[3vw]
                medium:top-[155vw] medium:left-[5vw] medium:text-[2.5vw]
                large:top-[120vw] large:left-[5vw] large:text-[2vw]
                xlarge:top-[105vw] xlarge:left-[5vw] xlarge:text-[1.8vw]
                2xlarge:top-[90vw] 2xlarge:left-[5vw]  2xlarge:text-[1.5vw]
                inline-block font-bold"
        >
          <h1 className=" relatednews">Related News</h1>
        </div>
        <div
          className=" relative w-[95vw] left-2 
                top-[240vw]
                xsmall:top-[240vw]
                small:top-[245vw]
                medium:top-[205vw] medium:w-[95vw] medium:left-[2vw]
                large:top-[175vw] large:w-[98vw] large:left-[1vw]
                xlarge:top-[160vw]
                2xlarge:top-[113vw]
                bg-red-30"
        >
          <div className="flex flex-row">
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              navigation={true}
              modules={[Navigation]}
              className="mySwiper"
              breakpoints={{
                480: {
                  // xsmall
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                640: {
                  // small
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                768: {
                  // medium
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                1024: {
                  // large
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                1280: {
                  // xlarge
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
                1536: {
                  // 2xlarge
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
              }}
            >
              {NowShowingMoviesDetails &&
                NowShowingRelatedNews?.news?.edges.map((data, index) => (
                  <SwiperSlide
                    key={index}
                    className="overflow-hidden 2xlarge:h-[2vh] flex  hover:text-red-600  cursor-pointer"
                  >
                    <div
                      className="flex h-[24vh] py-2 px-2  hover:bg-gray-600 rounded-lg
                            xsmall:h-[26vh] xsmall:w-[60vw]
                            small:h-[26vh]
                            medium:h-[28vh]  medium:w-[50vw]
                            large:h-[28vh]
                            xlarge:h-[30vh]
                            2xlarge:h-[25vh]"
                    >
                      <img
                        className="w-full max-w-[25vw] max-h-[20vh] 
                                   xsmall:max-w-[16vw] xsmall:max-h-[15vh] xsmall:object-center       
                                     small:max-w-[14vw] small:max-h-[15vh] small:object-center
                                  medium:max-w-[11vw] medium:max-h-[19vh]
                                large:max-w-[9vw] large:max-h-[19vh]
                                  xlarge:max-w-[7vw] xlarge:max-h-[17vh]
                                  2xlarge:max-w-[7vw] 2xlarge:max-h-[19vh]
                                   object-cover rounded-lg hover:bg-gray-600"
                        src={data?.node?.image?.url}
                        alt=""
                      />
                      <h1
                        className="  absolute w-[60vw]  left-[32vw] text-[3.5vw] 
                             xsmall:text-[2.5vw]  xsmall:w-[30vw] xsmall:left-[19vw] 
                             small:text-[2.2vw] small:w-[30vw] small:left-[17vw]
                             medium:text-[2vw] medium:w-[30vw] medium:left-[15vw]
                             large:text-[1.4vw] large:w-[22vw] large:left-[10vw]
                             xlarge:text-[1.1vw] xlarge:w-[15vw] xlarge:left-[8vw]
                             2xlarge:text-[1vw]
                              text-amber-500"
                      >
                        {data?.node?.articleTitle?.plainText}
                      </h1>
                    </div>
                    <h1
                      className=" relative   top-[2vw] -left-[38vw] whitespace-nowrap
                             xsmall:top-[1.5vw] xsmall:-left-[21vw]
                             small:top-[1vw] 
                             medium:top-[1vw] medium:-left-[20vw]
                             large:top-[1vw] large:-left-[13vw]
                             xlarge:top-[1vw] xlarge:-left-[9vw]
                             2xlarge:top-[0vw]
                             text-red-600
                             text-[3.5vw]
                             xsmall:text-[2.2vw]
                             small:text-[2.1vw]
                             medium:text-[1.6vw]
                             large:text-[1.5vw]
                             xlarge:text-[1.2vw]
                             2xlarge:text-[1vw]"
                    >
                      {new Date(data?.node?.date).toLocaleString("default", {
                        month: "short",
                      })}{" "}
                      {new Date(data?.node?.date).getDate()}
                    </h1>
                    <h1
                      className=" relative text-[3vw] -top-[3vw] left-[10vw] whitespace-nowrap
                             xsmall:-top-[2vw]  xsmall:left-[4vw] xsmall:whitespace-normal
                             small:-top-[2vw] small:left-[3.5vw]
                             medium:-top-[2vw] 
                             large:-top-[1vw]
                             xlarge:-top-[vw] xlarge:left-[3vw]
                             2xlarge:-top-[1.5vw] 2xlarge:left-[2.2vw]
                              text-lime-400 hover:underline
                             
                             xsmall:text-[2.2vw]
                             small:text-[2.1vw]
                             medium:text-[1.8vw]
                             large:text-[1.5vw]
                             xlarge:text-[1vw]
                             2xlarge:text-[1vw]"
                    >
                      By : {data?.node?.source?.homepage?.label}
                    </h1>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
        <div className=" bg-red-30 overflow-hidden relative xsmall:top-[240vw] small:top-[230vw]   medium:top-[180vw] large:top-[145vw] xlarge:top-[120vw]  2xlarge:top-[105vw] bg-[#030C16]  w-[100vw] h-[80vh] xsmall:h-[110vh] small:h-[130vh] medium:min-h-[175vh] large:min-h-[170vh] xlarge:min-h-[175vh]  top-[290vw]  ">
          <RecentlyViewed />
        </div>
        <div className=" relative w-[100vw] xsmall:top-[185vw] small:top-[170vw]  medium:top-[105vw] large:medium:top-[90vw] xlarge:top-[83vw]  2xlarge:top-[70vw]  bg-[#030C16] top-[270vw] border-t-2 border-red-600">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default NowShowingMoviesFullDetailsPage;
