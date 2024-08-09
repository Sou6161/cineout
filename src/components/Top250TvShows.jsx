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
import Header from "./Header";
import RecentlyViewed from "./RecentlyViewed";
import Footer from "./Footer";

const Top250TvShows = () => {
  const [Top250showsIDs, setTop250showsIDs] = useState(null);
  const [AllTop250ShowsIDs, setAllTop250Shows] = useState(null);
  const [Top250ShowsBanner, setTop250ShowsBanner] = useState(null);
  const [Top250ShowsDetails, setTop250ShowsDetails] = useState();

  useEffect(() => {
    const getTop250Shows = async () => {
      const response = await fetch(
        "https://run.mocky.io/v3/372e6bd5-108c-4e55-88f0-367b026f848b"
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
    <div className="w-full min-h-screen bg-black overflow-hidden">
      <div>
        <Header />
      </div>

      <div className="w-[95vw] border-[1px] border-blue-600  rounded-lg h-[32vh] mx-auto mt-[10vh]">
        <div className="w-[91vw] h-[30vh] border-[1px] rounded-lg  border-blue-600 mt-[6px] mx-auto">
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
                <SwiperSlide key={index}>
                  <img
                    className="w-full h-[30vh] object-cover object-center rounded-lg"
                    src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
                    alt=""
                  />
                  <div className="absolute left-[2vw] top-[1vw] bg-blue-300 rounded-lg">
                    <a
                      href="#_"
                      className="px-4 py-2.5 relative rounded group font-medium text-white inline-block"
                    >
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
            <div
              role="status"
              className="flex items-center justify-center w-full h-full rounded-lg bg-gray-600 dark:bg-gray-700"
            >
              <svg
                className="w-10 h-10 text-white dark:text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </div>
      </div>

      <div className="w-full bg-black absolute mt-5">
        <div className="relative px-4 py-8">
          <h3 className="text-white font-bold text-lg xsmall:text-xl small:text-2xl medium:text-3xl large:text-4xl mb-2">
            CINEOUT Charts
          </h3>
          <span className="text-teal-400 text-4xl xsmall:text-5xl small:text-6xl absolute left-0 top-8">
            <TbMinusVertical />
          </span>
          <h4 className="text-white font-medium text-2xl xsmall:text-3xl small:text-4xl medium:text-5xl large:text-6xl mb-2">
            Top 250 TV Shows
            <h1 className="text-sm xsmall:text-base small:text-lg medium:text-xl font-normal text-stone-500">
              Top 250 as rated by CINEOUT Users
            </h1>
            <h1 className="text-sm xsmall:text-base small:text-lg medium:text-xl font-normal text-white mt-4">
              250 Titles
            </h1>
          </h4>
        </div>
      </div>

      <div className="w-[90vw] xsmall:w-[80vw] small:w-[70vw] medium:w-[60vw] large:w-[50vw] mx-auto neuro py-8 px-5 bg-zinc-600 relative top-[35vh] xsmall:top-[40vh] small:top-[45vh] medium:top-[50vh] large:top-[55vh] rounded-lg">
        {Top250ShowsDetails ? (
          Top250ShowsDetails.map((movie, index) => (
            <div
              key={index}
              className="w-full mb-5 border-l-[1px] hover:bg-slate-700 rounded-lg border-yellow-300"
            >
              <div className="flex p-4 bg-red-3 border-b-[2px] rounded-lg border-red-300">
                <img
                  className="w-[20%] xsmall:w-[15%] small:w-[12%] medium:w-[10%] h-auto object-cover rounded-lg border-[1px] glow"
                  src={movie?.primaryImage?.url}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://lascrucesfilmfest.com/wp-content/uploads/2018/01/no-poster-available-737x1024.jpg";
                  }}
                  alt=""
                />
                <h1 className="mx-2 font-bold hover:text-purple-600 cursor-pointer text-sm xsmall:text-base small:text-lg medium:text-xl">
                  {index + 1}. {movie?.titleText?.text}
                </h1>
              </div>
              <div className="flex flex-col xsmall:flex-row gap-2 xsmall:gap-3 text-gray-500 mt-2 xsmall:mt-0">
                <h1 className="text-xs xsmall:text-sm">
                  {movie?.releaseDate?.year}
                </h1>
                <h1 className="text-xs xsmall:text-sm">
                  {movie?.runtime?.displayableProperty?.value?.plainText ||
                    "Runtime not available"}
                </h1>
                <h1 className="text-xs xsmall:text-sm">
                  {movie?.certificate?.rating}
                </h1>
              </div>
              <div className="flex items-center mt-2 xsmall:mt-0">
                <TiStarFullOutline className="text-yellow-400" />
                <h1 className="mx-1 text-xs xsmall:text-sm">
                  {movie.ratingsSummary.aggregateRating}
                </h1>
                <h1 className="text-gray-500 text-xs xsmall:text-sm">
                  ({movie.ratingsSummary.voteCount})
                </h1>
              </div>
              <h1 className="mt-2 text-xs xsmall:text-sm">
                Genre:{" "}
                {movie.genres.genres.map((genre) => genre.text).join(", ")}
              </h1>
            </div>
          ))
        ) : (
          <div>
            <h1>inooi</h1>
          </div>
        )}
      </div>

      <div className="mt-8 xsmall:mt-12 small:mt-16 medium:mt-20 large:mt-24">
        <MoreToExplore />
      </div>
      <div className="mt-8 xsmall:mt-12 small:mt-16 medium:mt-20 large:mt-24">
        <MoreToRead />
      </div>

      <div className="mt-8 xsmall:mt-12 small:mt-16 medium:mt-20 large:mt-24 px-4">
        <h1 className="font-normal text-sm xsmall:text-base text-red-600">
          The Top Rated Movie list only includes feature films.
          <ul className="list-disc pl-5 mt-2">
            <li className="text-purple-500">
              Shorts, TV movies, and documentaries are not included
            </li>
            <li className="text-amber-600">
              The list is ranked by a formula which includes the number of
              ratings each movie received from users, and value of ratings
              received from regular users
            </li>
            <li>
              To be included on the list, a movie must receive ratings from at
              least 25000 users
            </li>
          </ul>
          <h1 className="text-cyan-500 cursor-pointer hover:underline mt-2">
            Learn more about how list ranking is determined.
          </h1>
        </h1>
      </div>

      <div className="mt-8 xsmall:mt-12 small:mt-16 medium:mt-20 large:mt-24">
        <RecentlyViewed />
      </div>

      <Footer />
    </div>
  );
};

export default Top250TvShows;
