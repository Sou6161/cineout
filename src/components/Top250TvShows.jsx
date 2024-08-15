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
        "https://run.mocky.io/v3/860f2fc7-834a-436a-b0c7-81ef1de3b8cf"
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

      <div className="w-[95vw] h-[32vh]  xsmall:w-[95vw] xsmall:h-[40vh] small:w-[95vw] small:h-[45vh] medium:h-[52vh] large:h-[58vh] xlarge:h-[62vh]   rounded-lg  mx-auto mt-[10vh]">
        <div className="w-[91vw]  h-[30vh] xsmall:w-[91vw] xsmall:h-[35vh] small:h-[40vh] medium:h-[45vh] large:h-[53vh] xlarge:h-[58vh] glow6  rounded-lg  mt-[6px] mx-auto">
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
                    className="w-full h-[30vh] xsmall:wfull xsmall:h-[35vh] small:h-[40vh] medium:h-[45vh]  large:h-[53vh] xlarge:h-[58vh] object-cover object-center rounded-lg"
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
        <div className="relative px-7 py-8">
          <h3 className="text-white font-bold text-lg xsmall:text-xl xsmall:ml-[5vw] small:ml-[8vw] small:text-[4vw] medium:text-[3vw] large:text-[2vw] large:ml-[4vw] xlarge:text-[1.8vw] 2xlarge:text-[1.5vw] mb-2">
            CINEOUT Charts
          </h3>
          <span className="text-teal-400 text-[7vw] xsmall:text-[6vw] xsmall:ml-[4vw] small:text-[4vw] small:ml-[8vw] small:top-[10vh] medium:text-[4vw] medium:ml-[7vw] medium:top-[9.5vh] large:text-[2.5vw] large:ml-[3.5vw] large:top-[9.6vh] xlarge:text-[2vw] xlarge:ml-[3.6vw] 2xlarge:text-[1.8vw] 2xlarge:ml-[3.3vw] 2xlarge:top-[8.5vh]     absolute left-2 ">
            <TbMinusVertical />
          </span>
          <h4 className="text-white font-medium text-[4.5vw] xsmall:text-[3.5vw] xsmall:ml-[5vw] small:text-[3vw] small:ml-[8vw] medium:text-[2.7vw] large:text-[1.8vw] large:ml-[4vw] xlarge:text-[1.5vw] 2xlarge:text-[1.3vw]  mb-2">
            Top 250 TV Shows
            <h1 className="text-[2.5vw] xsmall:text-base small:text-[2vw] medium:text-[2vw] large:text-[1.1vw] xlarge:text-[0.9vw] 2xlarge:text-[.8vw] font-normal text-stone-500">
              Top 250 as rated by CINEOUT Users
            </h1>
            <h1 className="text-sm xsmall:text-base small:text-[3vw] medium:text-xl large:text-[1.7vw] xlarge:text-[1.4vw] 2xlarge:text-[1vw] font-normal text-white mt-10">
              250 Titles
            </h1>
          </h4>
        </div>
      </div>

      <div className="w-[90vw] xsmall:w-[80vw] small:w-[70vw] medium:w-[60vw] large:w-[50vw] mx-auto  bg-blue-20 relative top-[40vh] xsmall:top-[40vh] small:top-[45vh] small:mx-[12vw] medium:top-[50vh] large:top-[40vh] large:mx-[6vw] 2xlarge:top-[35vh] rounded-lg">
        {Top250ShowsDetails ? (
          Top250ShowsDetails.map((movie, index) => (
            <div
              key={index}
              className="w-full  h-[28vh] small:h-[30vh] xlarge:h-[32vh]  mb-5 border-l-[1px] hover:bg-slate-700 rounded-lg border-yellow-300"
            >
              <div className="flex p-4 bg-red-3 h-[28vh] small:h-[30vh] medium:w-[70vw]  large:w-[50vw] xlarge:w-[55vw] xlarge:h-[32vh] 2xlarge:w-[50vw] border-b-[1px] rounded-lg border-red-300">
                <img
                  className="w-[26vw] h-[21vh] xsmall:max-w-[22vw] xsmall:h-[22vh] small:w-[18vw] small:h-[24vh] medium:max-w-[15vw] medium:h-[25vh] large:max-w-[12vw] large:h-[25vh] xlarge:max-w-[9.5vw] 2xlarge:max-w-[9vw] 2xlarge:h-[27vh]  object-cover rounded-lg border-[2px] border-teal-400 "
                  src={movie?.primaryImage?.url}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://lascrucesfilmfest.com/wp-content/uploads/2018/01/no-poster-available-737x1024.jpg";
                  }}
                  alt=""
                />
                <h1 className="mx-2 font-bold text-white hover:text-purple-600 cursor-pointer text-sm xsmall:text-base small:text-lg medium:text-xl">
                  {index + 1}. {movie?.titleText?.text}
                </h1>
              </div>
              <div className="flex flex-row   relative bottom-[17vh] left-[35vw] xsmall:flex-row xsmall:left-[30vw] small:left-[25vw] medium:left-[21vw] large:left-[16vw] xlarge:left-[13vw] 2xlarge:left-[12vw]  gap-2 xsmall:gap-3 text-teal-400 mt-2 xsmall:mt-0">
                <h1 className="text-xs xsmall:text-sm xlarge:text-[1.3vw] 2xlarge:text-[1.2vw]">
                  {movie?.releaseDate?.year}
                </h1>
                <h1 className="text-xs xsmall:text-sm xlarge:text-[1.3vw] 2xlarge:text-[1.2vw]">
                  {movie?.runtime?.displayableProperty?.value?.plainText ||
                    "Runtime not available"}
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
                {movie?.genres?.genres.map((genre) => genre?.text).join(", ")}
              </h1>
            </div>
          ))
        ) : (
          <div>
            <h1>inooi</h1>
          </div>
        )}
      </div>

      <div className=" hidden  large:block large:relative large:bottom-[7700vh] large:left-[15vw] 2xlarge:bottom-[8000vh]  mt-8 xsmall:mt-12 small:mt-16 medium:mt-20 large:mt-24">
        <MoreToExplore />
      </div>
      <div className=" hidden  large:block  large:relative large:bottom-[7900vh] large:left-[65vw] 2xlarge:bottom-[8200vh] mt-8 xsmall:mt-12 small:mt-16 medium:mt-20 large:mt-24">
        <MoreToRead />
      </div>

      <div className="mt-[45vh]  small:mt-[50vh] small:ml-[8vw] medium:ml-[10vw] medium:mt-[55vh] large:-mt-[130vh] large:w-[55vw] xlarge:-mt-[140vh] 2xlarge:-mt-[148vh] 2xlarge:w-[50vw]  large:ml-[5vw] px-4">
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

      <div className="mt-8 xsmall:mt-12 small:mt-16 medium:mt-20  xlarge:-mt-2  ">
        <RecentlyViewed />
      </div>
      <div className="  relative small:h-[75vh] medium:h-[70vh] large:h-[75vh] xlarge:h-[80vh] 2xlarge:min-h-auto  xsmall:top-[7vh] small:-top-[vh]">
        <div className="">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Top250TvShows;
