import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Headerfordetails from "./Headerfordetails";
import { API_OPTIONS } from "../constants/Apioptions";
import {
  RapidOptionsDetailsNowShowingMoviesDaimondTest29,
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
import { IoMdStar } from "react-icons/io";
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

const trimTextTo500Words = (text) => {
  const words = text.split(" ");
  if (words.length > 180) {
    return words.slice(0, 180).join(" ") + `...`;
  }
  return text;
};

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
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [clickedIndex, setClickedIndex] = useState(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleIconClick = (index) => {
    setClickedIndex(index);
  };


  const cast = NowShowingMoviesDetails?.cast?.edges || [];
  const leftNames = cast.slice(0, 8);
  const middleNames = cast.slice(8, 16);
  const rightNames = cast.slice(16, 24);

  const renderNames = (namesArray) => (
    <div className="w-[24vw]">
      {namesArray.map((data, index) => (
        <div key={index}>
          <img
            className="w-[6vw] h-[12vh] rounded-full object-cover blur-[3px] hover:blur-0 border-2 border-cyan-400 hover:border-purple-500"
            src={
              data?.node?.name?.primaryImage?.url ||
              "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
            }
            alt="no image available"
          />
          <div className="relative bottom-[5vw] left-[8vw]">
            <h1 className="font-normal text-white">
              {data?.node?.name?.nameText?.text}
            </h1>
            <h1 className="font-normal text-lime-400">
              {data &&
                data?.node?.characters.map((character) => character?.name).join(', ')}
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
    if (NowShowingIMDBID !== null) {
      console.log(NowShowingIMDBID, "IMDB ID");
    }
  }, [NowShowingIMDBID]);

  useEffect(() => {
    const NowShowingMoviesDetails = async () => {
      if (NowShowingIMDBID) {
        try {
          const response = await fetch(
            `https://imdb146.p.rapidapi.com/v1/title/?id=${NowShowingIMDBID}`,
            RapidOptionsDetailsNowShowingMoviesDaimondTest29
          );
          const NowShowingMoviesDetails = await response.json(); // Assuming this is the variable you want to dispatch
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
    setIsTrimmed(false);
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
    <div className=" w-[100vw] h-[868vh] bg-[#030C16] text-red-600 ">
      <div className="">
        <Headerfordetails />
      </div>
      <div className=" w-[98vw] mx-auto mt-5 h-[76.5vh] border- border-black glow5 rounded-lg  ">
        {NowShowingTrailerYTKEY ? (
          <iframe
            className=" w-[97vw] mx-auto h-[75vh] relative top-1 rounded-lg"
            src={`https://www.youtube.com/embed/${NowShowingTrailerYTKEY}?si=HxKbpBA7t2t3ulUK`}
          ></iframe>
        ) : (
          <div
            role="status"
            class="flex items-center justify-center bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700"
          >
            <svg
              class="w-[97vw] h-[75vh] text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              fill="currentColor"
            >
              <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
              <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        )}
      </div>

      <div className=" w-[100vw] h-[100vh] absolute bg-red-20 mt-10 border-t-[1px] border-gray-700">
        <div className="">
          <div>
            <h1 className=" relative top-[3vw] left-[10vw] text-[3vw] text-purple-500 font-semibold ">
              {NowShowingMoviesDetails?.titleText?.text}
            </h1>
            <h1 className=" flex relative left-[10.2vw] top-12">
              <span className=" mr-2">
                {NowShowingMoviesDetails?.releaseDate?.year}
              </span>
              <PiDotOutlineBold className=" relative top-[0.3vw] right-1" />

              <span className=" mr-2">
                {" "}
                {NowShowingMoviesDetails?.certificate?.rating}
              </span>
              <PiDotOutlineBold className=" relative top-[0.3vw] right-1" />
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
              className=" w-[12.5vw] h-[38vh] glow4   relative left-[10vw] top-[5vw] rounded-lg object-cover"
              src={NowShowingMoviesDetails?.primaryImage.url}
              alt=""
            />
          </div>
        </div>
        <div className=" relative left-[27vw] ">
          <div className=" absolute bottom-[5vw] ">
            <span className=" text-white relative top-[9vw] text-[1.3vw]  ">
              Director
            </span>
            <h1 className="relative text-emerald-400 font-semibold top-[7vw] text-[1.3vw] left-[7vw]">
              {NowShowingMoviesDetails &&
                NowShowingMoviesDetails?.directorsPageTitle.map(
                  (data, index) => (
                    <span key={index}>
                      {data?.credits.map((director, i) => (
                        <React.Fragment key={i}>
                          {director?.name?.nameText?.text}
                          {i < data?.credits?.length - 1 && ", "}
                        </React.Fragment>
                      ))}
                      {index <
                        NowShowingMoviesDetails?.directorsPageTitle?.length -
                          1 && ", "}
                    </span>
                  )
                )}
            </h1>

            <span className=" text-white relative top-[9.5vw] text-[1.3vw]">
              Writers
            </span>
            <h1 className="relative top-[7.6vw] text-emerald-400 text-[1.3vw] left-[7vw]">
              {NowShowingMoviesDetails &&
                NowShowingMoviesDetails?.writers.map((data, index) => (
                  <span key={index}>
                    {data?.credits.map((writers, i) => (
                      <React.Fragment key={i}>
                        {writers?.name?.nameText?.text}
                        {i < data?.credits?.length - 1 && ", "}
                      </React.Fragment>
                    ))}
                    {index < NowShowingMoviesDetails?.writers?.length - 1 &&
                      ", "}
                  </span>
                ))}
            </h1>

            <span className=" text-white relative top-[10vw] text-[1.3vw]">
              Stars
            </span>
            <h1 className="relative top-[8vw] text-emerald-400 left-[7vw] text-[1.3vw]">
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

            <span className=" text-white relative top-[10vw] text-[1.3vw]">
              Genre
            </span>
            <h1 className="relative top-[8.1vw] text-emerald-400 left-[7vw] text-[1.3vw]">
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
        <div className=" flex gap-10 bg-red-30 absolute left-[70vw] top-5">
          <h1 className=" whitespace-nowrap font-bold text-yellow-400">
            CINEOUT RATING
          </h1>
          <span className=" absolute top-10 left-2 text-[1.5vw] text-yellow-400">
            <FaStar />{" "}
            <span className=" inline-bloc relative left-9 bottom-10 text-red-600  ">
              {NowShowingMoviesDetails?.ratingsSummary?.aggregateRating}/10
            </span>
            <span className=" relative right-8 text-white bottom-4 text-[0.9vw]">
              (
              <NumberFormatter
                number={NowShowingMoviesDetails?.ratingsSummary?.voteCount}
              />
              )
            </span>
          </span>
          <h1 className=" whitespace-nowrap font-bold">YOUR RATING</h1>
          <span className=" absolute top-8 left-[11vw] text-[1.5vw] text-yellow-400">
            <IoStarOutline />
          </span>
          <h1
            onClick={toggle}
            className="absolute top-7 hover:underline cursor-pointer left-[12.8vw] text-[1.3vw] font-semibold"
          >
            RATE
          </h1>
          {/* Render the modal */}
          {isShowing && (
            <div className="modal-wrapper">
              <div className="modal">
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                  onClick={toggle}
                >
                  &#10006;
                </button>
                {/* Your modal content here */}

                <TiStarFullOutline className=" text-yellow-400  text-[7vw] absolute z-100 left-[18vw] -top-[0.5vw]" />
                <span className=" relative left-[20.2vw] text-[1.4vw] top-[1.2vw] text-black font-semibold">
                  ?
                </span>
                <h1 className=" absolute left-[19.5vw] top-[6vw] text-[1vw] text-white font-semibold">
                  Rate This
                </h1>
                <h1 className=" absolute left-[15vw] text-[1.5vw] top-[7.5vw] font-semibold  ">
                  {NowShowingMoviesDetails?.titleText?.text}
                </h1>
                <span className=" absolute left-[12vw] text-[1.5vw] top-[11vw] font-semibold ">
                  <div className="flex gap-2">
                    {Array.from({ length: 10 }, (_, index) => (
                      <span
                        key={index}
                        className="text-yellow-400 text-[1.5vw] relative cursor-pointer"
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
                          <RiStarFill className="text-[1.5vw] relative cursor-pointer text-blue-500" />
                        ) : (
                          <RiStarLine />
                        )}
                      </span>
                    ))}
                  </div>
                </span>
                <button class="Rate-button relative top-[14vw] left-[16vw]">
                  <span class="Rate-button-content">Rate </span>
                </button>
              </div>
            </div>
          )}

          <h1 className="font-bold">POPULARITY</h1>
          <span className="absolute left-[19vw] top-8 text-[2vw] border-2 border-lime-400 rounded-full p-[0.1vw]">
            {NowShowingMoviesDetails?.meterRanking?.currentRank > 5 ? (
              <FaArrowTrendDown />
            ) : (
              <FaArrowTrendUp />
            )}
          </span>
          <span className="absolute flex left-[22vw] top-8 text-[1.3vw] font-bold">
            {NowShowingMoviesDetails?.meterRanking?.currentRank}
            <span className="absolute left-4 top-1">
              {NowShowingMoviesDetails?.meterRanking?.rankChange
                ?.changeDirection === "UP" ? (
                <IoMdArrowDropup />
              ) : (
                <IoMdArrowDropdown />
              )}
            </span>
            <span className="ml-7 text-[1.3vw]">
              {NowShowingMoviesDetails?.meterRanking?.rankChange?.difference}
            </span>
          </span>
        </div>
        <div className=" absolute left-[78vw] top-[10vw] ">
          <div class="btn-donate h-[9vh] relative bottom-3">
            <span className=" relative bottom-5 left-3">
              {" "}
              <span className=" relative top-5 right-4 ">
                <FaPlus className="" />
              </span>
              Add to Watchlist
            </span>
            <h1 className=" relative bottom-4 text-black  ">
              {
                NowShowingMoviesDetails?.engagementStatistics
                  ?.watchlistStatistics?.displayableCount?.text
              }
            </h1>
          </div>
          <div className=" flex cursor-pointer">
            <h1 className=" font-semibold text-yellow-400">
              {NowShowingMoviesDetails?.reviews?.total}{" "}
              <span className=" font-normal text-white mr-5 hover:underline">
                User reviews
              </span>{" "}
            </h1>{" "}
            <h1 className=" font-semibold text-yellow-400">
              {NowShowingMoviesDetails?.criticReviewsTotal?.total}{" "}
              <span className="font-normal text-white hover:underline">
                Critics reviews
              </span>
            </h1>
          </div>
          <div>
            <h1 className=" font-semibold text-yellow-400 cursor-pointer  ">
              <span className=" mr-3 inline-block">
                {NowShowingMoviesDetails?.metacritic?.metascore?.score}{" "}
              </span>
              <span className="font-normal text-white hover:underline">
                Metascore
              </span>
            </h1>
          </div>
        </div>

        <div className=" bg-red-30 absolute left-[25vw] top-[33vw]">
          <h1 className=" text-[1.4vw] text-red-600 font-bold">STORYLINE</h1>
          <p className=" w-[60vw] text-[1.1vw] mt-5 text-amber-300">
            {NowShowingMoviesDetails?.plot?.plotText?.plainText}
          </p>
        </div>

        <div className=" absolute top-[45vw] left-[25vw] text-[1.4vw] font-bold">
          <h1>TOP CAST</h1>
          <div className="flex justify-between mt-10">
          <div className="name-list flex">
      {renderNames(leftNames)}
      {middleNames.length > 0 && renderNames(middleNames)}
      {rightNames.length > 0 && renderNames(rightNames)}
    </div>
            {/* <div>
              {NowShowingMoviesDetails &&
                NowShowingMoviesDetails?.cast?.edges
                  .slice(8, 10)
                  .map((data) => (
                    <div className=" relative left-[12vw]">
                      <img
                        className=" w-[6vw] h-[12vh] rounded-full object-cover blur-[3px] hover:blur-0 border-2 border-cyan-400 hover:border-purple-500 "
                        src={
                          data?.node?.name?.primaryImage?.url
                            ? data?.node?.name?.primaryImage?.url
                            : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
                        }
                        alt="no image available"
                      />
                      <div className=" relative bottom-[5vw] left-[8vw]">
                        <h1 className=" font-normal text-white">
                          {data?.node?.name?.nameText?.text}
                        </h1>
                        <h1 className=" font-normal text-lime-400">
                          {data &&
                            data?.node?.characters.map((data) => {
                              return data?.name;
                            })}
                        </h1>
                      </div>
                    </div>
                  ))}
            </div> */}
          </div>
        </div>
        {/* <div className="absolute top-[132vw] bg-red-30 left-[25vw] text-[1.4vw]">
          <h1 className="font-bold">More Titles Like This</h1>
          <div className="absolute -mx-[2vw] w-[70vw] h-[65vh] mt-10 border-l-2 my-2 border-r-2 border-blue-600 flex flex-nowrap overflow-x-auto overflow-y-hidden no-scrollbar gap-10">
            {NowShowingMoviesDetails &&
              NowShowingMoviesDetails?.moreLikeThisTitles?.edges.map((data) => (
                <div className="flex flex-col min-w-[14vw] mx-5 h-[60vh] my-5  rounded-lg bg-black glow6 ">
                  <img
                    className="min-w-[14vw] h-[40vh] object-center px-2 py-2 rounded-2xl"
                    src={data?.node?.primaryImage?.url}
                    alt="no image available"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://www.prokerala.com/movies/assets/img/no-poster-available.jpg";
                    }}
                  />
                  <h1 className="mx-5 text-[1.2vw] text-teal-400 overflow-hidden whitespace-nowrap truncate">
                    {data?.node?.originalTitleText?.text}
                  </h1>
                  <span className=" mx-5 text-[1.2vw] text-rose-400">
                    ({data?.node?.releaseYear?.year})
                  </span>

                  <span className=" mx-5 text-yellow-400 inline-block flex ">
                    <IoMdStar className=" relative top-1 mr-2" />
                    {data?.node?.ratingsSummary?.aggregateRating}
                  </span>
                  <span className="mx-5 text-[1.2vw] text-violet-500 white-space-nowrap truncate">
                    {data &&
                      data?.node?.titleGenres?.genres.map((movie, index) => (
                        <React.Fragment key={index}>
                          {movie?.genre?.text}
                          {index <
                            data?.node?.titleGenres?.genres?.length - 1 && ", "}
                        </React.Fragment>
                      ))}
                  </span>
                </div>
              ))}
          </div>
        </div> */}

        <div className=" absolute top-[170vw] left-[25vw] inline-block">
          <h1 className=" text-[1.4vw] font-bold ">Details</h1>
        </div>
        {/* <div className="  relative top-[149vw] left-[25vw] w-[70vw] h-[60vh] mb-[5vw]">
          <h1 className="text-[1.2vw] text-blue-500 border-t-[1px] border-b-[1px]  border-gray-700 py-5">
            <span className="  text-yellow-400 mr-5">Release Date</span>
            {NowShowingMoviesDetails?.releaseDate?.month}
            {"/"}
            {NowShowingMoviesDetails?.releaseDate?.day}
            {"/"}
            {NowShowingMoviesDetails?.releaseDate?.year}
          </h1>
          <h1 className=" text-[1.2vw] text-blue-500 border-b-[1px] border-gray-700 py-5">
            <span className=" mr-5 text-yellow-400">Countries of Origins</span>
            {NowShowingMoviesDetails &&
              NowShowingMoviesDetails?.countriesOfOrigin?.countries.map(
                (data) => {
                  return data?.id;
                }
              )}
          </h1>
          <h1 className=" text-[1.2vw] text-blue-500  border-b-[1px] border-gray-700 py-5">
            <span className=" mr-5 text-yellow-400">Language</span>
            {NowShowingMoviesDetails &&
              NowShowingMoviesDetails?.spokenLanguages?.spokenLanguages.map(
                (data) => {
                  return data?.text;
                }
              )}
          </h1>
          <h1 className=" text-[1.2vw] text-emerald-500  border-b-[1px] border-gray-700 py-5">
            <span className="mr-5 text-yellow-400">Also Known As</span>
            {NowShowingMoviesDetails &&
              NowShowingMoviesDetails?.akas?.edges.map((data) => {
                return data?.node?.text;
              })}
          </h1>
          <h1 className=" text-[1.2vw] text-blue-500  border-b-[1px] border-gray-700 py-5">
            <span className=" mr-5 text-yellow-400">Filming Locations</span>
            {NowShowingMoviesDetails &&
              NowShowingMoviesDetails?.filmingLocations?.edges.map((data) => {
                return data?.node?.text;
              })}{" "}
            <span className=" text-cyan-400">(Studio)</span>
          </h1>
          <h1 className="text-[1.2vw] text-blue-500 border-b-[1px] border-gray-700 py-5">
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

          <h1 className="text-[1.2vw] flex text-blue-500 border-b-[1px] border-gray-700 py-5">
            <span className="mr-5 text-yellow-400">Official Sites</span>
            {NowShowingMoviesDetails &&
              NowShowingMoviesDetails?.detailsExternalLinks?.edges.map(
                (data, index) => (
                  <React.Fragment key={index}>
                    <Link
                      className=" hover:underline hover:text-red-500"
                      to={`${data?.node?.url}`}
                    >
                      <span>{data?.node?.label}</span>
                    </Link>
                    {index <
                      NowShowingMoviesDetails?.detailsExternalLinks?.edges
                        ?.length -
                        1 && (
                      <span className="mx-2">& </span> // Adjust mx-2 for your preferred spacing
                    )}
                  </React.Fragment>
                )
              )}
            {"."}
          </h1>
        </div> */}

        <div className=" inline-block relative top-[150vw] left-[25vw] text-[1.4vw] font-bold">
          <h1>User Reviews</h1>
        </div>
        {/* <div
          className="relative top-[152vw] left-[25vw] w-[50vw] rounded-lg px-5 py-4"
          style={{
            backgroundColor: "black",
            height: isTrimmed ? "auto" : "auto",
          }}
        >
          <h1 className=" review w-[10vw]">FEATURED REVIEW</h1>
          <div>
            {NowShowingMoviesDetails &&
              NowShowingMoviesDetails?.featuredReviews?.edges.map((data) => {
                const fullText = data?.node?.text?.originalText?.plainText;
                const trimmedText = trimTextTo500Words(fullText);

                return (
                  <>
                    <div className=" mt-5">
                      <h1 className=" text-[1.4vw] font-bold text-lime-500">
                        "{data?.node?.summary?.originalText}"
                      </h1>
                    </div>
                    <p className="mt-7 text-[1vw] leading-7 text-fuchsia-300 font-normal overflow-y-scroll no-scrollbar">
                      {isTrimmed ? trimmedText : fullText}
                      {isTrimmed && (
                        <span
                          className="absolute top-[23vw] left-[48vw] cursor-pointer"
                          onClick={toggleTrim}
                        >
                          <IoMdArrowDropdownCircle />
                        </span>
                      )}
                    </p>
                  </>
                );
              })}
          </div>
        </div> */}

        <div className=" absolute top-[257vw] left-[25vw] inline-block  ">
          <h1 className=" text-[1.4vw] font-bold ">Box Office</h1>
        </div>
        {/* <div className=" absolute top-[261vw] left-[25vw]">
          <div className=" Budget">
            <h1 className=" text-[1.2vw] font-semibold text-sky-500 whitespace-nowrap mb-3">
              Budget
            </h1>
            <h1 className=" text-white text-[1vw] mb-5">
              ${NowShowingMoviesDetails?.productionBudget?.budget?.amount}
              (estimated)
            </h1>
          </div>
          <div className=" opening Earning ">
            {NowShowingMoviesDetails?.openingWeekendGross && (
              <>
                <h1 className="text-sky-500 whitespace-nowrap font-semibold mb-3 text-[1.2vw]">
                  Opening weekend US & Canada
                </h1>
                <h1 className="text-white text-[1vw]">
                  $
                  {
                    NowShowingMoviesDetails.openingWeekendGross.gross.total
                      .amount
                  }
                </h1>
              </>
            )}
          </div>
          <div className=" absolute left-[25vw] top-1">
            {NowShowingMoviesDetails?.lifetimeGross && (
              <>
                <h1 className="text-sky-500 whitespace-nowrap mb-3 text-[1.2vw]">
                  Gross US & Canada
                </h1>
                <h1 className="text-white text-[1vw] mb-4">
                  ${NowShowingMoviesDetails.lifetimeGross.total.amount}
                </h1>
              </>
            )}
            {NowShowingMoviesDetails?.worldwideGross && (
              <>
                <h1 className="mb-3 text-sky-500 text-[1.2vw]">
                  Gross worldwide
                </h1>
                <h1 className="text-white text-[1vw]">
                  ${NowShowingMoviesDetails.worldwideGross.total.amount}
                </h1>
              </>
            )}
          </div>
        </div> */}
        {/* <div className=" absolute top-[276vw] left-[25vw]  inline-block ">
          <h1 className="text-[1.4vw] font-bold mb-5">Technical Specs</h1>
          <h1 className=" text-[1.2vw] font-semibold mb-3 text-yellow-400">
            Runtime
            <span className=" ml-10 text-white">
              {" "}
              {
                NowShowingMoviesDetails?.runtime?.displayableProperty?.value
                  ?.plainText
              }
            </span>
          </h1>
          <h1 className="text-[1.2vw] font-semibold mb-3 text-yellow-400">
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
          <h1 className="text-[1.2vw] font-semibold mb-3 text-yellow-400">
            Sound mix
            <span className="ml-10 text-lime-300">
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

          <h1 className=" text-[1.2vw] font-semibold text-yellow-400">
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
        </div> */}
        <div className=" absolute top-[295vw] left-[25vw]">
          <h1 className="text-[1.4vw] font-bold photogallery">Photo Gallery</h1>
        </div>
        {/* <div className="w-[75vw] h-[45vh] bg-red-20 absolute top-[300vw] left-[22vw]">
          <div className="flex">
            <Swiper
              slidesPerView={3}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper"
            >
              {NowShowingImages?.images?.edges
                .slice(0, 12)
                .map((data, index) => (
                  <SwiperSlide key={index} className=" overflow-hidden">
                    <img
                      className=" hover:rounded-lg  hover:border-l-[3px] hover:border-r-[3px] hover:object-cover border-yellow-400 transition duration-300 ease-in-out hover:scale-105 hover:scale-y-120 mx-9 w-[20vw]  h-[30vh] object-top object-cover rounded-lg"
                      src={data?.node?.url}
                      alt=""
                    />
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div> */}
        <div className=" inline-block absolute top-[320vw] left-[25vw]">
          <h1 className="text-[1.4vw] font-bold videogallery">Video Gallery</h1>
        </div>
        {/* <div className=" w-[73vw]   h-[45vh]  bg-red-30  py-2 absolute top-[324vw] left-[22vw]">
          <div className="flex  ">
            <Swiper
              slidesPerView={3}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper"
            >
              {NowShowingVideoGallery?.videos.map((data2, index) => (
                <SwiperSlide
                  key={index}
                  className=" hover:underline hover:text-red-600"
                >
                  <div className="">
                    <img
                      className=" mx-9 w-[20vw]  h-[27vh] mb-5   object-top object-center hover:border-cyan-400  border-[3px] border-blue-800  rounded-lg"
                      src={data2?.image?.url}
                      alt=""
                    />

                    <BiPlayCircle className="  text-white  relative bottom-[4vw] left-[3vw] text-[1.8vw]" />
                    <div className="  -mt-[6vw] ">
                      <h1 className="  inline-flex text-[1.3vw] font-semibold text-white mr-[7vw]">
                        Trailer {convertDuration(data2?.durationInSeconds)}
                      </h1>
                    </div>

                    <h1 className=" text-white relative mx-10 h-[20vh] text-[1.2vw] top-7   font-semibold">
                      Watch {data2?.title}
                    </h1>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div> */}
        <div className=" absolute top-[350vw] left-[25vw]">
          <h1 className=" text-[1.4vw] font-bold relatednews">Related News</h1>
        </div>
        {/* <div className=" absolute  w-[65vw]  h-[30vh] top-[355vw] left-[25vw] bg-red-30">
          <div className="  flex flex-row">
            <Swiper
              slidesPerView={2}
              spaceBetween={10}
              // pagination={{
              //   clickable: true,
              // }}
              navigation={true}
              modules={[Navigation]}
              className="mySwiper "
            >
              {NowShowingMoviesDetails&&NowShowingRelatedNews?.news?.edges.map((data, index) => (
                <SwiperSlide
                  key={index}
                  className=" overflow-hidden flex mr-10 hover:text-red-600 hover:bg-gray-800 rounded-lg cursor-pointer "
                >
                  <div className="   flex">
                    <img
                      className=" w-[7vw] h-[22vh] object-cover object-top rounded-lg hover:bg-gray-600"
                      src={data?.node?.image?.url}
                      alt=""
                    />
                    <h1 className=" absolute left-[8vw] text-amber-500">
                      {data?.node?.articleTitle?.plainText}
                    </h1>
                    <h1 className="absolute top-[6vw] text-white left-[9vw]">
                      {new Date(data?.node?.date).toLocaleString("default", {
                        month: "short",
                      })}{" "}
                      {new Date(data?.node?.date).getDate()}
                    </h1>
                    <h1 className=" absolute top-[6vw] left-[22vw] text-lime-400 hover:underline">
                      Source : {data?.node?.source?.homepage?.label}
                    </h1>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div> */}
        {/* <div className=" absolute bg-black w-[100vw] h-[134vh]  top-[374vw]  ">
          <div className=" absolute left-[10vw]">
            <RecentlyViewed />
          </div>
        </div>
        <div className=" absolute top-[412vw] border-t-2 border-red-600">
          <Footer />
        </div> */}
      </div>
    </div>
  );
};

export default NowShowingMoviesFullDetailsPage;
