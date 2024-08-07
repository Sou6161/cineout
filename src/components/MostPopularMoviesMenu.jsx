import React, { useEffect, useState } from "react";
import { openDB } from "idb";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { API_OPTIONS } from "../constants/Apioptions";
import { TbMinusVertical } from "react-icons/tb";
import { RapidOptionsDetailsRatingsDaimond } from "../constants/RapidOptionsForDetails";
import { TiStarFullOutline } from "react-icons/ti";
import MoreToExplore from "./MoreToExplore";
import MoreToRead from "./MoreToRead";
import RecentlyViewed from "./RecentlyViewed";
import Footer from "./Footer";
import BackToTop from "../constants/BackToTop";
import Header from "./Header";

const MostPopularMoviesMenu = () => {
  const [MostPopularMoviesID, setMostPopularMoviesID] = useState(null);
  const [MostPopularMoviesIDs, setMostPopularMoviesIDs] = useState(null);
  const [PopularBannerImage, setPopularBannerImage] = useState(null);
  const [PopularMoviesDetails, setPopularMoviesDetails] = useState(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 3000) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const getMostPopularMovies = async () => {
      const response = await fetch(
        "https://run.mocky.io/v3/f15f9a4a-925f-41af-90f1-239b54d080e4"
      );
      const data = await response.json();
      const AllPopularMoviesIDs = data.map(
        (movie) => movie.split("/").filter(Boolean)[1]
      );
      // Get the first 15 movie IDs
      const FilteredMoviesIDs = data
        .slice(0, 15)
        .map((movie) => movie.split("/").filter(Boolean)[1]);

      // Store the 15 movie IDs in the state
      setMostPopularMoviesID(FilteredMoviesIDs);
      setMostPopularMoviesIDs(AllPopularMoviesIDs);
    };
    getMostPopularMovies();
  }, []);

  useEffect(() => {
    MostPopularMoviesID && console.log(MostPopularMoviesID);
  }, [MostPopularMoviesID]);

  useEffect(() => {
    MostPopularMoviesIDs && console.log(MostPopularMoviesIDs);
  }, [MostPopularMoviesIDs]);

  useEffect(() => {
    const getPopularBannerImage = async () => {
      if (MostPopularMoviesID) {
        const BannerData = await Promise.all(
          MostPopularMoviesID.map(async (id) => {
            const response = await fetch(
              `https://api.themoviedb.org/3/find/${id}?external_source=imdb_id`,
              API_OPTIONS
            );
            const data = await response.json();
            return data?.movie_results;
          })
        );
        setPopularBannerImage(BannerData.flat());
      }
    };
    getPopularBannerImage();
  }, [MostPopularMoviesID]);

  useEffect(() => {
    PopularBannerImage && console.log(PopularBannerImage);
  }, [PopularBannerImage]);

  useEffect(() => {
    const getPopularMoviesDetails = async () => {
      if (MostPopularMoviesIDs) {
        // Open the IndexedDB database
        const db = await openDB("myDb", 2, {
          upgrade(db) {
            db.createObjectStore("movies");
          },
        });

        // Check if data is in IndexedDB
        let storedData = await db.get("movies", "PopularMoviesDetails");
        if (storedData) {
          setPopularMoviesDetails(storedData);
        } else {
          const PopularMoviesData = await Promise.all(
            MostPopularMoviesIDs.map(async (id) => {
              const response = await fetch(
                `https://imdb146.p.rapidapi.com/v1/title/?id=${id}`,
                RapidOptionsDetailsRatingsDaimond
              );
              const data = await response.json();
              return data;
            })
          );
          const flatData = PopularMoviesData.flat();
          setPopularMoviesDetails(flatData);
          // Store data in IndexedDB
          await db.put("movies", flatData, "PopularMoviesDetails");
        }
      }
    };
    getPopularMoviesDetails();
  }, [MostPopularMoviesIDs]);

  useEffect(() => {
    PopularMoviesDetails && console.log(PopularMoviesDetails);
  }, [PopularMoviesDetails]);

  return (
    <div className=" w-[100vw] h-[100vh]  bg-black">
      <div className="  ">
        <Header />
      </div>

      <div className=" w-[95vw] border-[1px] xsmall:h-[37vh] small:w-[89vw] medium:h-[43vh] large:w-[86vw] large:h-[50vh] xlarge:w-[85vw] xlarge:h-[60vh] 2xlarge:h-[62vh] border-red-600   rounded-lg h-[32vh] mx-auto b-red-200 relative top-[10vh]">
        <div className=" w-[92vw] h-[36vh] ml-2 xsmall:ml-3  small:ml-3 small:w-[85vw] medium:w-[86vw] medium:h-[42vh] large:w-[84vw] large:h-[48vh] xlarge:w-[83vw] xlarge:h-[58vh] 2xlarge:w-[83.5vw] 2xlarge:h-[60vh]   rounded-lg  mt-[6px] mx-auto b-yellow-200">
          {PopularBannerImage ? (
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 5500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper"
            >
              {PopularBannerImage.map((movie, index) => (
                <SwiperSlide>
                  <img
                    key={index}
                    className=" w-[90vw] h-[30vh] xsmall:w-[91vw] xsmall:h-[35vh] medium:h-[41vh] large:h-[48vh] xlarge:h-[58vh] 2xlarge:h-[60vh] object-cover object-top rounded-lg border-[1px] "
                    style={{ objectPosition: " 0% 25%" }}
                    src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
                    alt=""
                  />
                  <div className="   absolute left-[2vw]  top-[1vw] bg-blue-300 rounded-lg ">
                    <a
                      href="#_"
                      class="px-4 py-2.5 relative rounded group font-medium text-white inline-block"
                    >
                      <span class="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-lime-600 to-cyan-500"></span>
                      <span class="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-lime-600 to-cyan-500"></span>
                      <span class="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-md from-lime-600 to-cyan-500"></span>
                      <span class="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-lime-600 from-cyan-500"></span>
                      <span class="relative">{movie?.title}</span>
                    </a>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div
              role="status"
              class="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
            >
              <div class="flex items-center justify-center w-full h-[30vh] rounded-lg bg-gray-600  sm:w-[97vw] relative bottom    dark:bg-gray-700">
                <svg
                  class="w-10 h-10 text-white dark:text-gray-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
              </div>
              <span class="sr-only">Loading...</span>
            </div>
          )}
        </div>
      </div>
      <div className="w-full  min-h-screen bg-black text-white overflow-hidden ">
        <div className="w-full h-1  absolute top-1/2"></div>

        <div className="relative pt-[20vh] px-10  large:px-[7vw] sm:px-6 lg:px-8">
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 2xlarge:text-[2vw] font-bold mb-2">
            CINEOUT Charts
          </h3>
          <span className="absolute text-teal-400 text-3xl sm:text-4xl md:text-5xl lg:text-6xl  2xlarge:text-[2vw] -mt- -ml-5">
            <TbMinusVertical />
          </span>
          <h4 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl 2xlarge:text-[1.4vw]  font-medium mb-2">
            Most Popular Movies
            <p className="text-sm sm:text-base text-stone-500 mt-2">
              As determined by CINEOUT users.
            </p>
            <p className="text-sm sm:text-base 2xlarge:text-[1vw] mt-10">100 Titles</p>
          </h4>
        </div>

        <div className="w-[95vw] large:ml-[5vw] max-w-7xl mx-auto mt-16  rounded-lg p-4 sm:p-6 lg:p-8">
          {PopularMoviesDetails ? (
            PopularMoviesDetails.map((movie, index) => (
              <div
                key={index}
                className="mb-8 border-l w-[80vw] border-b  medium:w-[70vw] large:w-[55vw] xlarge:w-[50vw] 2xlarge:w-[45vw] border-amber-400 hover:bg-stone-600 rounded-lg p-4"
              >
                <div className="flex flex-col xsmall:flex-row  sm:flex-row items-start sm:items-center mb-4 pb-4 border-b border-lime-400">
                  <img
                    className="w-24 h-36 xsmall:w-[18vw] xsmall:h-[23vh] small:h-[24vh] medium:w-[14vw] medium:h-[25vh] large:w-[11vw] large:h-[26vh] xlarge:w-[10vw] xlarge:h-[28vh] 2xlarge:w-[10vw] 2xlarge:h-[30vh] sm:w-32 sm:h-48 object-cover rounded-lg border-2  border-emerald-400  mb-4 sm:mb-0 sm:mr-4"
                    src={movie?.primaryImage?.url}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://lascrucesfilmfest.com/wp-content/uploads/2018/01/no-poster-available-737x1024.jpg";
                    }}
                    alt=""
                  />
                  <h2 className="text-lg xsmall:mt-1 xsmall:ml-2 sm:text-xl font-bold">
                    {index + 1}. {movie?.titleText?.text}
                  </h2>
                </div>
                <div className="flex flex-wrap gap-4 text-orange-500 font-semibold text-sm">
                  <p>{movie?.releaseDate?.year}</p>
                  <p>
                    {movie?.runtime?.displayableProperty?.value?.plainText ||
                      "Runtime not available"}
                  </p>
                  <p>{movie?.certificate?.rating}</p>
                </div>
                <div className="mt-4 flex items-center">
                  <TiStarFullOutline className="text-yellow-400 mr-1" />
                  <span>{movie.ratingsSummary.aggregateRating}</span>
                  <span className="text-blue-500 ml-2 ">
                    ({movie.ratingsSummary.voteCount})
                  </span>
                </div>
                <p className="mt-2 text-sm text-sky-200">
                  Genre:{" "}
                  {movie.genres.genres.map((genre) => genre.text).join(", ")}
                </p>
              </div>
            ))
          ) : (
            <>
              <div
                role="status"
                className="space-y-8 p-5 animate-pulse md:space-y-0 md:space-x-8 mb-5 rtl:space-x-reverse md:flex md:items-center"
              >
                <div className="flex items-center justify-center w-24 h-36 bg-gray-300 rounded sm:w-[8vw] dark:bg-gray-700">
                  <svg
                    className="w-10 h-10 text-gray-200 dark:text-gray-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                  >
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                  </svg>
                </div>
                <div className="w-full">
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                </div>
                <span className="sr-only">Loading...</span>
              </div>
            </>
          )}
          <div className=" hidden large:block large:left-[14vw] xlarge:block xlarge:left-[7vw] 2xlarge:block h-0 relative large:bottom-[2000em]    bg-red-300">
            <MoreToExplore />
          </div>
          <div className=" hidden large:block large:ml-[10vw] xlarge:block 2xlarge:block h-0 relative large:left-[48vw]  large:bottom-[2060rem] bg-yellow-400 ">
            <MoreToRead />
          </div>
        </div>

        <div className="mt- px-4 sm:px-6 lg:px-8 large:-mt-8  2xlarge:-mt-10">
          <p className="text-sm sm:text-base max-w-2xl large:ml-[5vw] xlarge:ml-[5vw] xlarge:text-[1.2vw] 2xlarge:text-[1vw] mx-auto text-center">
            Our Most Popular charts use data from the search behavior of CINEOUT's
            more than 250 million monthly unique visitors to rank the hottest,
            most buzzed about movies and TV shows.
          </p>
        </div>

        <div className="mt-16 border-t border-gray-600 pt-8 2xlarge:-ml-[20vw]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <RecentlyViewed />
          </div>
        </div>

        <footer className="mt-16 bg-black relative -left-[5vw] xsmall:-left-[2vw] small:-top-[5vw] medium:-top-[8vw] large:-top-[5vw] xlarge:-top-[7vw] 2xlarge:-ml-[27vw]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Footer />
          </div>
        </footer>
      </div>
      {showScrollButton && <BackToTop />}
    </div>
  );
};

export default MostPopularMoviesMenu;
