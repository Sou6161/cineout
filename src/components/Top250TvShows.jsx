import React, { useEffect, useState } from "react";
import { openDB } from "idb";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectFade, Navigation, Pagination } from "swiper/modules";
import Headerfordetails from "./Headerfordetails";
import { API_OPTIONS } from "../constants/Apioptions";
import { RapidOptionsDetailsRatingsDaimond } from "../constants/RapidOptionsForDetails";
import { TbMinusVertical } from "react-icons/tb";
import { TiStarFullOutline } from "react-icons/ti";
import MoreToExplore from "./MoreToExplore";
import MoreToRead from "./MoreToRead";
import { Link } from "react-router-dom";

const Top250TvShows = () => {
  const [Top250showsIDs, setTop250showsIDs] = useState(null);
  const [AllTop250ShowsIDs, setAllTop250Shows] = useState(null);
  const [Top250ShowsBanner, setTop250ShowsBanner] = useState(null);
  const [Top250ShowsDetails, setTop250ShowsDetails] = useState();

  useEffect(() => {
    const getTop250Shows = async () => {
      const response = await fetch(
        "https://run.mocky.io/v3/98507914-21ef-47c4-bb89-aad520ad495d"
      );
      const data = await response.json();
      const ids = data.map((movie) => {
        const urlParts = movie?.["Name-href"].split("/");
        // The ID is the second last part of the URL
        return urlParts[urlParts.length - 2];
      });
      // Only keep the IDs of the first 15 movies
      setTop250showsIDs(ids.slice(0, 15));
      setAllTop250Shows(ids);
    };
    getTop250Shows();
  }, []);

  useEffect(() => {
    Top250showsIDs && console.log(Top250showsIDs);
  }, [Top250showsIDs]);

  useEffect(() => {
    AllTop250ShowsIDs && console.log(AllTop250ShowsIDs);
  }, [AllTop250ShowsIDs]);

  useEffect(() => {
    const getTop250ShowsBanner = async () => {
      if (Top250showsIDs) {
        const BannerData = await Promise.all(
          Top250showsIDs.map(async (id) => {
            const response = await fetch(
              `https://api.themoviedb.org/3/find/${id}?external_source=imdb_id`,
              API_OPTIONS
            );
            const data = await response.json();
            return data?.tv_results;
          })
        );
        setTop250ShowsBanner(BannerData.flat());
      }
    };
    getTop250ShowsBanner();
  }, [Top250showsIDs]);

  useEffect(() => {
    Top250ShowsBanner && console.log(Top250ShowsBanner);
  }, [Top250ShowsBanner]);

  useEffect(() => {
    const get250ShowsDetails = async () => {
      if (AllTop250ShowsIDs) {
        // Open the IndexedDB database
        const db = await openDB("MyTop250ShowsDb", 1, {
          upgrade(db) {
            db.createObjectStore("MyTop250ShowsDb");
          },
        });

        // Check if data is in IndexedDB
        let storedData = await db.get("MyTop250ShowsDb", "Top250ShowsDetails");
        if (storedData) {
          setTop250ShowsDetails(storedData);
        } else {
          const Top250ShowsData = await Promise.all(
            AllTop250ShowsIDs.map(async (id) => {
              const response = await fetch(
                `https://imdb146.p.rapidapi.com/v1/title/?id=${id}`,
                RapidOptionsDetailsRatingsDaimond
              );
              const data = await response.json();
              return data;
            })
          );
          const flatData = Top250ShowsData.flat();
          setTop250ShowsDetails(flatData);
          // Store data in IndexedDB
          await db.put("MyTop250ShowsDb", flatData, "Top250ShowsDetails");
        }
      }
    };
    get250ShowsDetails();
  }, [AllTop250ShowsIDs]);

  useEffect(() => {
    Top250ShowsDetails && console.log(Top250ShowsDetails);
  }, [Top250ShowsDetails]);

  return (
    <div className=" w-[100vw] h-[100vh] bg-black">
      <div className=" z-50 sticky top-0  ">
        <Headerfordetails />
      </div>

      <div className=" w-[90vw] border-[1px] border--600 glow4 rounded-lg h-[60vh] mx-auto b-red-200 mt-4">
        <div className=" w-[89vw] h-[58vh] border-[1px] rounded-lg glow2 border-blue-600  mt-[6px] mx-auto b-yellow-200">
          {Top250ShowsBanner ? (
            <Swiper
              spaceBetween={30}
              effect={"fade"}
              navigation={true}
              pagination={{
                clickable: true,
              }}
              modules={[EffectFade, Navigation, Pagination]}
              className="mySwiper"
            >
              {Top250ShowsBanner.map((movie, index) => (
                <SwiperSlide>
                  <img
                    key={index}
                    className=" w-[90vw] h-[58vh] object-cover object-down rounded-lg "
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
                      <span class="relative">{movie?.name}</span>
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
              <div class="flex items-center justify-center w-full h-[58vh] rounded-lg bg-gray-600  sm:w-[97vw] relative bottom    dark:bg-gray-700">
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
      <div className=" w-[100vw] h-[2540rem] bg-black absolute ">
        <div>
          <h3 className=" absolute text-white left-[10vw] font-bold top-[8vh] text-[1.2vw]">
            CINEOUT Charts{" "}
          </h3>
          <span className=" absolute text-teal-400 left-[9vw] font-bold top-[6.2vw] text-[3vw] ">
            <TbMinusVertical />
          </span>
          <h4 className=" absolute text-white left-[11vw] font-medium  top-[6vw] text-[2vw]">
            Top 250 TV Shows
            <h1 className=" text-[1vw] font-normal text-stone-500">
              Top 250 as rated by CINEOUT Users
            </h1>
            <h1 className=" text-[1vw] font-normal text-white mt-10">
              250 Titles
            </h1>
          </h4>
        </div>
      </div>
      <div className=" w-[80vw] h-[2520rem] mx-auto neuro py-8  px-5 bg-zinc-600 relative top-[35vh] rounded-lg">
        {Top250ShowsDetails ? (
          Top250ShowsDetails.map((movie, index) => {
            return (
              <>
                <div className=" w-[48vw] mb-5 h-[19vh] -mt-4 border-l-[1px] hover:bg-slate-700 rounded-lg  border-yellow-300">
                  <div className="w-[48vw] flex p-4 bg-red-3  border-b-[2px] rounded-lg border-red-300">
                    <img
                      className=" w-[5.5vw] h-[15vh] object-fill rounded-lg border-[1px] glow "
                      src={movie?.primaryImage?.url}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://lascrucesfilmfest.com/wp-content/uploads/2018/01/no-poster-available-737x1024.jpg";
                      }}
                      alt=""
                    />

                    <h1 className=" mx-2 font-bold hover:text-purple-600 cursor-pointer">
                      {index + 1}
                      {"."} {movie?.titleText?.text}
                    </h1>
                  </div>
                  <div className=" flex gap-3 text-gray-500">
                    <h1 className=" relative bottom-[6vw] left-[8vw] font-normal">
                      {movie?.releaseDate?.year}
                    </h1>
                    <h1 className="relative bottom-[6vw] left-[8vw] font-normal">
                      {movie
                        ? movie?.runtime?.displayableProperty?.value?.plainText
                        : "Runtime not available"}
                    </h1>
                    <h1 className=" relative bottom-[6vw] left-[8vw] font-normal">
                      {movie?.certificate?.rating}
                    </h1>
                  </div>

                  <h1 className="mt-4 relative flex bottom-[6vw] left-[8vw] font-normal">
                    <TiStarFullOutline className=" text-yellow-400" />
                    <h1 className=" relative bottom-1  mx-1">
                      {" "}
                      {movie.ratingsSummary.aggregateRating}
                    </h1>

                    <h1 className=" relative bottom-1 text-gray-500">
                      ({movie.ratingsSummary.voteCount})
                    </h1>
                    <h1 className="absolute flex top-[1.4vw] left-[vw] font-normal">
                      Genre:{" "}
                      {movie.genres.genres
                        .map((genre) => genre.text)
                        .join(", ")}
                    </h1>
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
            <div
              role="status"
              className="space-y-8 p-5 animate-pulse md:space-y-0 md:space-x-8 -mt-7 rtl:space-x-reverse md:flex md:items-center"
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
            <div
              role="status"
              className="space-y-8 p-5 animate-pulse md:space-y-0 md:space-x-8 -mt-5 rtl:space-x-reverse md:flex md:items-center"
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
            <div
              role="status"
              className="space-y-8 p-5 animate-pulse md:space-y-0 md:space-x-8 -mt-5 rtl:space-x-reverse md:flex md:items-center"
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
            <div
              role="status"
              className="space-y-8 p-5 animate-pulse md:space-y-0 md:space-x-8 -mt-5 rtl:space-x-reverse md:flex md:items-center"
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
            <div
              role="status"
              className="space-y-8 p-5 animate-pulse md:space-y-0 md:space-x-8 -mt-5 rtl:space-x-reverse md:flex md:items-center"
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
            <div
              role="status"
              className="space-y-8 p-5 animate-pulse md:space-y-0 md:space-x-8 -mt-5 rtl:space-x-reverse md:flex md:items-center"
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
            <div
              role="status"
              className="space-y-8 p-5 animate-pulse md:space-y-0 md:space-x-8 -mt-5 rtl:space-x-reverse md:flex md:items-center"
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
      </div>
      <div className=" h-0 relative bottom-[2370rem] left-[10vw]    bg-red-300">
            <MoreToExplore />
          </div>
          <div className=" h-0 relative left-[63vw] bottom-[2435rem] bg-yellow-400 ">
            <MoreToRead />
          </div>
          <div className=" relative bottom-5 w-[50vw]">
            <h1 className=" font-normal ">
            Reported by <Link className="cursor-pointer hover:text-cyan-500 font-semibold hover:underline" to="https://www.boxofficemojo.com/date/2024-06-02/weekly/">Box Office Mojo</Link> © 2024
            </h1>
          </div>
    </div>
  );
};

export default Top250TvShows;
