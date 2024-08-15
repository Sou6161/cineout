import React, { useEffect, useState } from "react";
import { openDB } from "idb";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Headerfordetails from "./Headerfordetails";
import { RapidOptionsMenuDaimond } from "../constants/RapidOptionsForMenu";
import { API_OPTIONS } from "../constants/Apioptions";
import { RapidOptionsDetailsRatingsDaimond } from "../constants/RapidOptionsForDetails";
import { TbMinusVertical } from "react-icons/tb";
import { TiStarFullOutline } from "react-icons/ti";
import MoreToExplore from "./MoreToExplore";
import MoreToRead from "./MoreToRead";
import RecentlyViewed from "./RecentlyViewed";
import Footer from "./Footer";
import BackToTop from "../constants/BackToTop";
import Header from "./Header";

const MostPopularTvShowsMenu = () => {
  const [MostPopularTvShowsIDs, setMostPopularTvShowsIDs] = useState(null);
  const [AllMostPopularTvShowsIDs, setAllMostPopularTvShowsIDs] =
    useState(null);
  const [MostPopularTvShowsBanner, setMostPopularTvShowsBanner] =
    useState(null);
  const [AllMostPopularTvShowsDetails, setAllMostPopularTvShowsDetails] =
    useState(null);

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
    const getPopularTvShowsIDs = async () => {
      const response = await fetch(
        "https://run.mocky.io/v3/f4af4d48-a33f-47da-9540-53d51bfb41f6"
      );
      const data = await response.json();
      const AllPopularTvShowsIDs = data.map(
        (movie) => movie.split("/").filter(Boolean)[1]
      );
      // Get the first 15 movie IDs
      const FilteredTvShowsIDs = data
        .slice(0, 15)
        .map((movie) => movie.split("/").filter(Boolean)[1]);
      setMostPopularTvShowsIDs(FilteredTvShowsIDs);
      setAllMostPopularTvShowsIDs(AllPopularTvShowsIDs);
    };

    getPopularTvShowsIDs();
  }, []);

  useEffect(() => {
    MostPopularTvShowsIDs && console.log(MostPopularTvShowsIDs);
  }, [MostPopularTvShowsIDs]);

  useEffect(() => {
    AllMostPopularTvShowsIDs && console.log(AllMostPopularTvShowsIDs);
  }, [AllMostPopularTvShowsIDs]);

  useEffect(() => {
    const getPopularBannerImage = async () => {
      if (MostPopularTvShowsIDs) {
        const BannerData = await Promise.all(
          MostPopularTvShowsIDs.map(async (id) => {
            const response = await fetch(
              `https://api.themoviedb.org/3/find/${id}?external_source=imdb_id`,
              API_OPTIONS
            );
            const data = await response.json();
            return data?.tv_results;
          })
        );
        setMostPopularTvShowsBanner(BannerData.flat());
      }
    };
    getPopularBannerImage();
  }, [MostPopularTvShowsIDs]);

  useEffect(() => {
    MostPopularTvShowsBanner && console.log(MostPopularTvShowsBanner);
  }, [MostPopularTvShowsBanner]);

  useEffect(() => {
    const getPopularTvShowsDetails = async () => {
      if (AllMostPopularTvShowsIDs) {
        // Open the IndexedDB database
        const db = await openDB("myMostPopularTvShowsDb", 2, {
          upgrade(db) {
            db.createObjectStore("MostPopularTvShows");
          },
        });

        // Check if data is in IndexedDB
        let storedData = await db.get(
          "MostPopularTvShows",
          "PopularTvShowsDetails"
        );
        if (storedData) {
          setAllMostPopularTvShowsDetails(storedData);
        } else {
          const PopularTvShowsData = await Promise.all(
            AllMostPopularTvShowsIDs.map(async (id) => {
              const response = await fetch(
                `https://imdb146.p.rapidapi.com/v1/title/?id=${id}`,
                RapidOptionsDetailsRatingsDaimond
              );
              const data = await response.json();
              return data;
            })
          );
          const flatData = PopularTvShowsData.flat();
          setAllMostPopularTvShowsDetails(flatData);
          // Store data in IndexedDB
          await db.put("MostPopularTvShows", flatData, "PopularTvShowsDetails");
        }
      }
    };
    getPopularTvShowsDetails();
  }, [AllMostPopularTvShowsIDs]);

  useEffect(() => {
    AllMostPopularTvShowsDetails && console.log(AllMostPopularTvShowsDetails);
  }, [AllMostPopularTvShowsDetails]);
  return (
    <div className="w-full max-w-[100vw] min-h-screen bg-black overflow-hidden">
      <Header />
      <div className="w-[95vw] max-w-full h-[32vh] xsmall:h-[40vh] small:h-[45vh] medium:h-[52vh] large:h-[58vh] xlarge:h-[62vh] rounded-lg mx-auto mt-[10vh]">
        <div className="w-[91vw] max-w-full h-[30vh] xsmall:h-[35vh] small:h-[40vh] medium:h-[45vh] large:h-[53vh] xlarge:h-[58vh] glow6 rounded-lg mt-[6px] mx-auto">
          {MostPopularTvShowsBanner ? (
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
              {MostPopularTvShowsBanner.map((movie, index) => (
                <SwiperSlide key={index}>
                  <img
                    className="w-full h-[30vh] xsmall:h-[35vh] small:h-[40vh] medium:h-[45vh] large:h-[53vh] xlarge:h-[58vh] object-cover object-center rounded-lg"
                    style={{ objectPosition: "0% 25%" }}
                    src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
                    alt=""
                  />
                  <div className="absolute left-[2vw] top-[1vw] bg-blue-300 rounded-lg">
                    <a href="#_" className="px-4 py-2.5 relative rounded group font-medium text-white inline-block">
                      <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-lime-600 to-cyan-500"></span>
                      <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-lime-600 to-cyan-500"></span>
                      <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-md from-lime-600 to-cyan-500"></span>
                      <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-lime-600 from-cyan-500"></span>
                      <span className="relative">{movie?.name}</span>
                    </a>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div role="status" className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
              <div className="flex items-center justify-center w-full h-[30vh] rounded-lg bg-gray-600 sm:w-full relative bottom dark:bg-gray-700">
                <svg className="w-10 h-10 text-white dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
              </div>
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </div>
      </div>
      <div className="w-full max-w-full bg-black relative mt-5 ">
        <div className=" relative px-7 py-8">
          <h3 className=" text-white font-bold text-lg xsmall:text-xl xsmall:ml-[5vw] small:ml-[8vw] small:text-[4vw] medium:text-[3vw] large:text-[2vw] large:ml-[4vw] xlarge:text-[1.8vw] 2xlarge:text-[1.5vw] mb-2">
            CINEOUT Charts{" "}
          </h3>
          <span className=" text-teal-400 text-[7vw] xsmall:text-[6vw] xsmall:ml-[4vw] small:text-[4vw] small:ml-[8vw] small:top-[10vh] medium:text-[4vw] medium:ml-[7vw] medium:top-[9.5vh] large:text-[2.5vw] large:ml-[3.5vw] large:top-[9.6vh] xlarge:text-[2vw] xlarge:ml-[3.6vw] 2xlarge:text-[1.8vw] 2xlarge:ml-[3.3vw] 2xlarge:top-[8.5vh]     absolute left-2 ">
            <TbMinusVertical />
          </span>
          <h4 className=" text-white font-medium text-[4.5vw] xsmall:text-[3.5vw] xsmall:ml-[5vw] small:text-[3vw] small:ml-[8vw] medium:text-[2.7vw] large:text-[1.8vw] large:ml-[4vw] xlarge:text-[1.5vw] 2xlarge:text-[1.3vw]  mb-2">
            Most Popular TV Shows
            <h1 className=" text-[2.5vw] xsmall:text-base small:text-[2vw] medium:text-[2vw] large:text-[1.1vw] xlarge:text-[0.9vw] 2xlarge:text-[.8vw] font-normal text-stone-500">
              As determined by CINEOUT users.
            </h1>
            <h1 className=" text-sm xsmall:text-base small:text-[3vw] medium:text-xl large:text-[1.7vw] xlarge:text-[1.4vw] 2xlarge:text-[1vw] font-normal text-white mt-10">
              100 Titles
            </h1>
          </h4>
        </div>
        <div className="w-[90vw] xsmall:w-[80vw] small:w-[70vw] medium:w-[60vw] large:w-[50vw] mx-auto  bg-blue-20 relative top-[2vh] xsmall:top-[5vh] small:top-[5vh] small:mx-[12vw] medium:top-[8vh] large:top-[10vh] large:mx-[6vw] 2xlarge:top-[10vh] rounded-lg">
          {AllMostPopularTvShowsDetails ? (
            AllMostPopularTvShowsDetails.map((movie, index) => {
              return (
                <>
                  <div className=" w-full  h-[28vh] small:h-[30vh] medium:w-[70vw] large:w-[50vw] xlarge:w-[55vw] 2xlarge:w-[50vw] xlarge:h-[32vh]  mb-5 border-l-[1px] hover:bg-slate-700 rounded-lg border-amber-400">
                    <div className="flex p-4 bg-red-3 h-[28vh] small:h-[30vh] medium:w-[70vw]  large:w-[50vw] xlarge:w-[55vw] xlarge:h-[32vh] 2xlarge:w-[50vw] border-b-[1px] rounded-lg border-purple-500">
                      <img
                        className=" w-[26vw] h-[21vh] xsmall:max-w-[22vw] xsmall:h-[22vh] small:w-[18vw] small:h-[24vh] medium:max-w-[15vw] medium:h-[25vh] large:max-w-[12vw] large:h-[25vh] xlarge:max-w-[9.5vw] 2xlarge:max-w-[9vw] 2xlarge:h-[27vh]  object-center   rounded-lg border-[2px] border-teal-400 "
                        src={movie?.primaryImage?.url}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://lascrucesfilmfest.com/wp-content/uploads/2018/01/no-poster-available-737x1024.jpg";
                        }}
                        alt=""
                      />

                      <h1 className="mx-2 font-bold text-white hover:text-purple-600 cursor-pointer text-sm xsmall:text-base small:text-lg medium:text-xl">
                        {index + 1}
                        {"."} {movie?.titleText?.text}
                      </h1>
                    </div>
                    <div className="flex flex-row   relative bottom-[17vh] left-[35vw] xsmall:flex-row xsmall:left-[30vw] small:left-[25vw] medium:left-[21vw] large:left-[16vw] xlarge:left-[13vw] 2xlarge:left-[12vw]  gap-2 xsmall:gap-3 text-teal-400 mt-2 xsmall:mt-0">
                      <h1 className="text-xs xsmall:text-sm xlarge:text-[1.3vw] 2xlarge:text-[1.2vw]">
                        {movie?.releaseDate?.year}
                      </h1>
                      <h1 className="text-xs xsmall:text-sm xlarge:text-[1.3vw] 2xlarge:text-[1.2vw]">
                        {movie?.runtime?.displayableProperty?.value
                          ?.plainText || "Runtime not available"}
                      </h1>
                      <h1 className="text-xs xsmall:text-sm xlarge:text-[1.3vw] 2xlarge:text-[1.2vw]">
                        {movie?.certificate?.rating}
                      </h1>
                    </div>

                    <div className="flex items-center relative bottom-[15vh] left-[33vw] xsmall:left-[30vw] small:left-[24vw] medium:left-[20vw] large:left-[15vw] xlarge:left-[12vw] ">
                      <TiStarFullOutline className="text-yellow-400 xlarge:text-[1.3vw]" />
                      <h1 className="mx-1 text-white text-xs xsmall:text-sm xlarge:text-[1.3vw]">
                        {movie?.ratingsSummary?.aggregateRating}
                      </h1>
                      <h1 className="text-blue-500 text-xs xsmall:text-sm xlarge:text-[1.1vw]">
                        ({movie?.ratingsSummary?.voteCount})
                      </h1>
                    </div>
                    <h1 className=" text-sky-200 w-[60vw] xsmall:w-[55vw] small:w-[50vw] medium:w-[40vw] large:w-[30vw] relative bottom-[12vh] left-[34vw] xsmall:left-[30vw] small:left-[25vw] medium:left-[21vw] large:left-[16vw] xlarge:left-[13vw] xlarge:text-[1.2vw] xlarge:bottom-[13vh] 2xlarge:left-[12vw] text-xs xsmall:text-sm">
                      Genre:{" "}
                      {movie?.genres?.genres
                        .map((genre) => genre?.text)
                        .join(", ")}
                    </h1>
                  </div>
                </>
              );
            })
          ) : (
            <>
              <div
                role="status"
                className="space-y-8 p-5 animate-pulse md:space-y-0 md:space-x-8 mb-5 rtl:space-x-reverse md:flex md:items-center"
              >
                <div className="flex items-center justify-center w-full h-[9vw] bg-gray-300 rounded sm:w-[8vw] dark:bg-gray-700">
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
          <div className=" hidden  large:block large:relative large:bottom-[2900vh] large:left-[10vw] 2xlarge:bottom-[2900vh]  mt-8 xsmall:mt-12 small:mt-16 medium:mt-20 large:mt-24">
            <MoreToExplore />
          </div>
          <div className=" hidden  large:block  large:relative large:bottom-[3110vh] large:left-[60vw] 2xlarge:bottom-[3110vh] mt-8 xsmall:mt-12 small:mt-16 medium:mt-20 large:mt-24 ">
            <MoreToRead />
          </div>
          <div className=" relative text-amber-400 w-full">
            <h1 className=" font-normal">
              Our Most Popular charts use data from the search behavior of
              CINEOUT's more than 250 million monthly unique visitors to rank
              the hottest, most buzzed about movies and TV shows.
            </h1>
          </div>
        </div>
        <div className="mt-8 xsmall:mt-12 small:mt-16 medium:mt-20  xlarge:-mt-2  ">
          <RecentlyViewed />
        </div>
        <div className="  relative small:h-[75vh] medium:h-[70vh] large:h-[75vh] xlarge:h-[80vh] 2xlarge:min-h-auto  xsmall:top-[7vh] small:-top-[vh]">
          <div className="">
            <Footer />
          </div>
        </div>
      </div>
      {showScrollButton && <BackToTop />}
    </div>
  );
};

export default MostPopularTvShowsMenu;
