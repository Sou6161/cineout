import React, { useEffect, useState } from "react";
import { openDB } from "idb";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectFlip, Pagination, Navigation } from "swiper/modules";
import Header from "./Header";
import { RapidOptionsDetailsDaimondTechView } from "../constants/RapidOptionsForMenu";
import { API_OPTIONS } from "../constants/Apioptions";
import { RapidOptionsDetailsRatingsDaimond } from "../constants/RapidOptionsForDetails";
import BackToTop from "../constants/BackToTop";
import { TbMinusVertical } from "react-icons/tb";
import { TiStarFullOutline } from "react-icons/ti";
import MoreToExplore from "./MoreToExplore";
import MoreToRead from "./MoreToRead";
import RecentlyViewed from "./RecentlyViewed";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const TopBoxOfficeMenu = () => {
  const [TopBoxOfficeIDs, setTopBoxOfficeIDs] = useState(null);
  const [TopBoxOfficeBanners, setTopBoxOfficeBanners] = useState(null);
  const [TopBoxOfficeDetails, setTopBoxOfficeDetails] = useState(null);
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
    const getTopBoxOfficeMoviesIDs = async () => {
      try {
        const response = await fetch(
          "https://run.mocky.io/v3/00186427-4d5b-4c16-bdaa-c2b5bb0e7c09"
        );
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        const text = await response.text();
        let data;

        try {
          data = JSON.parse(text);
        } catch {
          data = text.match(/"tt\d+"/g).map((id) => id.replace(/"/g, ""));
        }

        setTopBoxOfficeIDs(data);
        console.log("Parsed data:", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getTopBoxOfficeMoviesIDs();
  }, []);

  useEffect(() => {
    // TopBoxOfficeIDs && console.log(TopBoxOfficeIDs,"Top Box Office Movies IDs");
  }, [TopBoxOfficeIDs]);

  useEffect(() => {
    const getBoxOfficeBanner = async () => {
      if (TopBoxOfficeIDs) {
        const BannerData = await Promise.all(
          TopBoxOfficeIDs.map(async (id) => {
            const response = await fetch(
              `https://api.themoviedb.org/3/find/${id}?external_source=imdb_id`,
              API_OPTIONS
            );
            const data = await response.json();
            return data?.movie_results;
          })
        );
        setTopBoxOfficeBanners(BannerData.flat());
      }
    };
    getBoxOfficeBanner();
  }, [TopBoxOfficeIDs]);

  useEffect(() => {
    TopBoxOfficeBanners && console.log(TopBoxOfficeBanners);
  }, [TopBoxOfficeBanners]);

  useEffect(() => {
    const getTopBoxOfficeMoviesDetails = async () => {
      if (TopBoxOfficeIDs) {
        // Open the IndexedDB database
        const db = await openDB("MyTopBoxOfficeDb", 1, {
          upgrade(db) {
            db.createObjectStore("TopBox-OfficeMovies");
          },
        });

        // Check if data is in IndexedDB
        let storedData = await db.get(
          "TopBox-OfficeMovies",
          "TopBox-OfficeMoviesDetails"
        );
        if (storedData) {
          setTopBoxOfficeDetails(storedData);
        } else {
          const PopularMoviesData = await Promise.all(
            TopBoxOfficeIDs.map(async (id) => {
              const response = await fetch(
                `https://imdb146.p.rapidapi.com/v1/title/?id=${id}`,
                RapidOptionsDetailsRatingsDaimond
              );
              const data = await response.json();
              return data;
            })
          );
          const flatData = PopularMoviesData.flat();
          setTopBoxOfficeDetails(flatData);
          // Store data in IndexedDB
          await db.put(
            "TopBox-OfficeMovies",
            flatData,
            "TopBox-OfficeMoviesDetails"
          );
        }
      }
    };
    getTopBoxOfficeMoviesDetails();
  }, [TopBoxOfficeIDs]);

  useEffect(() => {
    TopBoxOfficeDetails && console.log(TopBoxOfficeDetails);
  }, [TopBoxOfficeDetails]);

  return (
    <div className=" w-[100vw] h-[100vh] bg-black">
      <div className="  ">
        <Header />
      </div>

      <div className="  w-[95vw] border-[1px] xsmall:h-[37vh] small:w-[89vw] medium:h-[43vh] large:w-[86vw] large:h-[50vh] xlarge:w-[85vw] xlarge:h-[60vh] 2xlarge:h-[62vh] border-red-600   rounded-lg h-[32vh] mx-auto b-red-200 relative top-[10vh]">
        <div className="w-[92vw] h-[31vh] ml-2 xsmall:ml-3  small:ml-3 small:w-[85vw] medium:w-[86vw] medium:h-[42vh] large:w-[84vw] large:h-[48vh] xlarge:w-[83vw] xlarge:h-[58vh] 2xlarge:w-[83.5vw] 2xlarge:h-[60vh]   rounded-lg  mt-[6px] mx-auto b-yellow-200">
          {TopBoxOfficeBanners ? (
            <Swiper
              effect={"flip"}
              grabCursor={true}
              pagination={true}
              navigation={true}
              modules={[EffectFlip, Pagination, Navigation]}
              className="mySwiper"
            >
              {TopBoxOfficeBanners.map((movie, index) => (
                <SwiperSlide>
                  <img
                    key={index}
                    className="w-[90vw] h-[30vh] xsmall:w-[91vw] xsmall:h-[35vh] medium:h-[41vh] large:h-[48vh] xlarge:h-[58vh] 2xlarge:h-[60vh] object-cover object-top rounded-lg border-[1px] "
                    style={{ objectPosition: " 0% 25%" }}
                    src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://broadbits.com/wp-content/themes/ryse/assets/images/no-image/No-Image-Found-400x264.png";
                    }}
                    alt=""
                  />
                  <div className="   absolute left-[2vw]  top-[1vw] bg-blue-300 rounded-lg ">
                    <a
                      href="#_"
                      class="px-2 py- xsmall:px-4 xsmall:py-2.5 relative rounded group font-medium text-white inline-block"
                    >
                      <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-lime-600 to-cyan-500"></span>
                      <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-lime-600 to-cyan-500"></span>
                      <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-md from-lime-600 to-cyan-500"></span>
                      <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-lime-600 from-cyan-500"></span>
                      <span class="relative text-xs xsmall:text-sm small:text-base">
                        {movie?.title}
                      </span>
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
      <div className=" w-full min-h-screen mt-[15vh] absolute bg-black overflow-hidden ">
        <div>
          <h3 className=" absolute text-red-600 left-[10vw] font-bold top-[vh] text-[5vw]">
            CINEOUT Charts{" "}
          </h3>
          <span className=" absolute text-teal-400 left-[8vw] font-bold top-[10.2vw] text-[4vw] ">
            <TbMinusVertical />
          </span>
          <h4 className=" absolute text-white left-[11vw] font-medium  top-[10vw] text-[3vw]">
            Top Box Office (US)
            <h1 className=" text-[2.2vw] font-normal text-stone-500">
              Latest Weekend Movies
            </h1>
            <h1 className=" text-[3vw] font-normal text-white mt-10">
              10 Titles
            </h1>
          </h4>
        </div>
        <div className="w-full ml-[2.5vw] xsmall:-ml-[1vw] p-2 xsmall:p-4 relative top-[30vh] xsmall:top-[30vw] small:top-[20vw] medium:top-[15vw] large:top-[14vw] xlarge:top-[5vw] 2xlarge:top-[10vw]">
          {TopBoxOfficeDetails ? (
            TopBoxOfficeDetails.map((movie, index) => {
              return (
                <div
                  key={index}
                  className="w-[90vw] xsmall:w-[80vw] small:w-[70vw] medium:w-[60vw] large:w-[50vw] 2xlarge:w-[45vw] mb-5 h-[25vh] xsmall:h-[27vh] small:h-[25vh] medium:h-[22vh] large:h-[25vh] xlarge:h-[28vh] 2xlarge:h-[31vh] -mt-2 bg-purple-30 border-l-[1px] hover:bg-amber-600 hover:bg-opacity-50 rounded-lg border-yellow-300"
                >
                  <div className="min-w-[25vw] h-[25vh] flex  flex-row xsmall:flex-row p-2 xsmall:p-4 bg-red-3 border-b-[2px] rounded-lg border-red-300">
                    <img
                      className="min-w-[25vw] xsmall:min-w-[20vw] small:min-w-[15vw] medium:min-w-[10vw] large:min-w-[9vw] 2xlarge:min-w-[8vw] h-[20vh] xsmall:h-[22vh] small:h-[20vh] medium:h-[18vh] large:h-[20vh] xlarge:h-[22vh] 2xlarge:h-[24vh] rounded-lg object-cover xsmall:object-center mb-2 xsmall:mb-0 border-2 border-cyan-400"
                      src={movie?.primaryImage?.url}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://lascrucesfilmfest.com/wp-content/uploads/2018/01/no-poster-available-737x1024.jpg";
                      }}
                      alt=""
                    />
                    <h1 className="mx-2 font-bold text-white hover:text-purple-600 cursor-pointer">
                      {index + 1}. {movie?.titleText?.text}
                    </h1>
                  </div>
                  <div className="flex gap-3 relative bottom-[30vw] left-[35vw] text-blue-200">
                    <h1 className=" font-normal">{movie?.releaseDate?.year}</h1>
                    <h1 className=" font-normal">
                      {movie?.runtime?.displayableProperty?.value?.plainText ||
                        "Runtime not available"}
                    </h1>
                    <h1 className=" font-normal">
                      {movie?.certificate?.rating}
                    </h1>
                  </div>
                  <div className="mt-5 relative flex bottom-[32vw] left-[30vw] font-normal">
                    <TiStarFullOutline className="text-yellow-400 ml-2  " />
                    <h1 className="relative bottom-1 mx- text-white ">
                      {movie.ratingsSummary.aggregateRating}
                    </h1>
                    <h1 className="relative bottom-1 text-gray-500">
                      ({movie.ratingsSummary.voteCount})
                    </h1>
                    <h1 className="absolute text-[3vw] text-sky-500 flex top-[8vw] left-[3vw] w-[65vw] font-normal">
                      Genre:{" "}
                      {movie.genres.genres
                        .map((genre) => genre.text)
                        .join(", ")}
                    </h1>
                  </div>
                </div>
              );
            })
          ) : (
            <div>
              <h1>innoo</h1>
            </div>
          )}
          <div className=" hidden large:block xlarge:block 2xlarge:block h-0 relative top-[30em] bg-red-300">
            <MoreToExplore />
          </div>
          <div className=" hidden large:block xlarge:block 2xlarge:block h-0 relative left-[53vw] bottom-[32rem] bg-yellow-400">
            <MoreToRead />
          </div>
          <div className="relative bottom-3 w-[80vw] text-emerald-400">
            <h1 className="font-normal">
              Reported by{" "}
              <Link
                className="cursor-pointer hover:text-cyan-500 font-semibold hover:underline"
                to="https://www.boxofficemojo.com/date/2024-06-02/weekly/"
              >
                Box Office Mojo
              </Link>{" "}
              © 2024
            </h1>
          </div>
        </div>

        <div className="  h-[100vh] relative top-[55vw]   ">
          <div className=" relative left-[vw] top-">
            <RecentlyViewed />
          </div>
        </div>
        <div className="  relative">
          <div className="">
            <Footer />
          </div>
        </div>
      </div>
      {showScrollButton && <BackToTop />}
    </div>
  );
};

export default TopBoxOfficeMenu;
