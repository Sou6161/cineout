import React, { useEffect, useState } from "react";
import Headerfordetails from "./Headerfordetails";
import { HiChartSquareBar } from "react-icons/hi";
import { HiStop } from "react-icons/hi2";
import {
  RapidoptionsApiDojo,
  RapidoptionsApiDojo2chalo,
  RapidoptionsApiDojoJanamdin,
  RapidoptionsApiDojoRexona,
  RapidoptionsChartsForIDTechView,
  RapidoptionsChartsMovieRatingsAPI,
} from "../constants/Rapidoptions";
import { MdAlignVerticalCenter } from "react-icons/md";
import MostPopularMoviesCharts from "./MostPopularMoviesCharts";
import IMDBTop250MoviesCharts from "./IMDBTop250MoviesCharts";
import TopRatedEnglishMovies from "./TopRatedEnglishMovies";
import MostPopularCelebs from "./MostPopularCelebs";
import { Link } from "react-router-dom";
import { TbArrowBigRightLinesFilled } from "react-icons/tb";

const BoxOffice = () => {
  const [BoxOfficeMCharts, setBoxOfficeMCharts] = useState(null);
  const [BoxOfficeMChartsID, setBoxOfficeMChartsID] = useState(null);
  const [BoxOfficeMChartsIDPoster, setBoxOfficeMChartsIDPoster] =
    useState(null);
  const [BoxOfficeMChartsDetails, setBoxOfficeMChartsDetails] = useState(null);

  useEffect(() => {
    const getMCharts = async () => {
      // Check if data is in local storage
      let data = localStorage.getItem("BOX OFFICE MOVIES CHARTS");
      if (data) {
        // Parse stored json if it was found
        data = JSON.parse(data);
      } else {
        // Otherwise, fetch data from API
        const response = await fetch(
          `https://movies-tv-shows-database.p.rapidapi.com/?page=1`,
          RapidoptionsChartsForIDTechView
        );
        data = await response.json();
        // Save the data to local storage
        localStorage.setItem(
          "BOX OFFICE MOVIES CHARTS",
          JSON.stringify(data?.movie_results)
        );
      }
      setBoxOfficeMCharts(data);
    };
    getMCharts();
  }, []);

  useEffect(() => {
    BoxOfficeMCharts &&
      setBoxOfficeMChartsID(BoxOfficeMCharts.map((item) => item?.imdb_id));
  }, [BoxOfficeMCharts]);

  useEffect(() => {
    // BoxOfficeMChartsID && console.log(BoxOfficeMChartsID);
  }, [BoxOfficeMChartsID]);

  useEffect(() => {
    const getMChartsPoster = async () => {
      // Check if data is in local storage
      let data = localStorage.getItem("BOX OFFICE MOVIES CHARTS FOR POSTER");
      if (data) {
        // Parse stored json if it was found
        data = JSON.parse(data);
      } else {
        // Otherwise, fetch data from API
        const fetchPromises = BoxOfficeMChartsID.map((id) =>
          fetch(
            `https://movies-ratings2.p.rapidapi.com/ratings?id=${id}`,
            RapidoptionsChartsMovieRatingsAPI
          ).then((response) => response.json())
        );

        data = await Promise.all(fetchPromises);

        // Save the data to local storage
        localStorage.setItem(
          "BOX OFFICE MOVIES CHARTS FOR POSTER",
          JSON.stringify(data)
        );
      }

      // console.log(data); // Moved outside the else block
      setBoxOfficeMChartsIDPoster(data);
    };
    getMChartsPoster();
  }, [BoxOfficeMChartsID]);

  useEffect(() => {
    // BoxOfficeMChartsIDPoster && console.log(BoxOfficeMChartsIDPoster);
  }, [BoxOfficeMChartsIDPoster]);

  useEffect(() => {
    const getMChartsDetails = async () => {
      let data = localStorage.getItem("BOX OFFICE MOVIES CHARTS DETAILS");
      if (data) {
        console.log("if comdition");
        data = JSON.parse(data);
      } else {
        data = [];
        for (let i = 0; i < BoxOfficeMChartsID.length; i++) {
          const id = BoxOfficeMChartsID[i];
          const response = await fetch(
            `https://imdb8.p.rapidapi.com/title/v2/get-box-office-summary?tconst=${id}`,
            RapidoptionsApiDojoRexona
          );
          const movieData = await response.json();
          data.push(movieData?.data?.title); // Store only the title
          // Save the data to local storage
          localStorage.setItem(
            "BOX OFFICE MOVIES CHARTS DETAILS",
            JSON.stringify(data)
          );
          // If it's not the last request in this second, don't delay
          if ((i + 1) % 5 !== 0 || i === BoxOfficeMChartsID.length - 1)
            continue;
          // Wait for 1 second before the next request
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }
      setBoxOfficeMChartsDetails(data);
    };
    if (BoxOfficeMChartsID && BoxOfficeMChartsID.length > 0) {
      getMChartsDetails();
    }
  }, [BoxOfficeMChartsID]);

  useEffect(() => {
    BoxOfficeMChartsDetails && console.log(BoxOfficeMChartsDetails);
  }, [BoxOfficeMChartsDetails]);

  function convertToMillions(amount) {
    return Math.floor(amount / 1000000);
  }

  return (
    <div className="w-[100vw] h-[100vh] absolute bg-black">
      <div className=" relative h-[7vh] mt-7 px-5 border-b-2 border-red-600 ">
        <Headerfordetails />
      </div>
      <div
        className=" w-[100vw] h-[350vh] bg-cover"
        style={{
          backgroundImage:
            "url('https://wallpapers.com/images/featured/movie-9pvmdtvz4cb0xl37.jpg')",
          backgroundPosition: "contain",
        }}
      >
        <div className=" w-[100vw] h-[350vh] bg-[rgba(103,97,130,0.5)] backdrop-blur-sm  ">
          <div className="  w-[80vw] h-[340vh] mx-auto rounded-lg border-2 border-cyan-600  bg-[rgba(224,224,219,0.8)] backdrop-blur-sm relative top-5  ">
            <h1 className=" text-[1.8vw] p-7 font-semibold flex">
              <HiChartSquareBar className=" relative top-2 text-red-700" />
              CINEOUT CHARTS
            </h1>
            <h1 className=" text-[1.3vw] font-semibold px-[2.3vw] -mt-5 flex relative ">
              <HiStop className=" text-[1.5vw] relative top-1 ml-5 text-yellow-400 " />
              Top Box Office(US)
            </h1>
            <div className=" w-[47vw] h-[240vh] mx-10 rounded-lg border-2 border-stone-600 mt-5">
              <div>
                {BoxOfficeMChartsIDPoster &&
                  BoxOfficeMChartsDetails &&
                  BoxOfficeMChartsIDPoster.map((item, index) => {
                    const imageUrl = `https://image.tmdb.org/t/p/original${item?.media?.poster_path}`;
                    return (
                      <>
                        <div className="flex bg-red-30 m-5 rounded-lg hover:bg-slate-300">
                          <img
                            className="w-[8vw] h-[10vw] object-fill rounded-lg"
                            src={imageUrl}
                            alt="no image"
                          />
                          <div className="ml-5">
                            <h1 className=" text-[1vw] font-bold text-red-600 mb-2">
                              {index + 1}.{item?.media?.title}
                            </h1>
                            <h2 className=" font-bold">
                              <span className=" text-lime-700 font-semibold">
                                {" "}
                                Domestic Gross :{" "}
                              </span>
                              {convertToMillions(
                                BoxOfficeMChartsDetails[index]?.domesticGross
                                  ?.total?.amount
                              )}
                              M
                            </h2>
                            <h2 className=" font-bold">
                              <span className=" text-emerald-700 font-semibold">
                                WorldWide Gross :{" "}
                              </span>
                              {convertToMillions(
                                BoxOfficeMChartsDetails[index]?.worldwideGross
                                  ?.total?.amount
                              )}
                              M
                            </h2>
                            <h2 className="font-bold">
                              <span className=" text-violet-900 font-semibold">
                                {" "}
                                Release Year:
                              </span>
                              {
                                BoxOfficeMChartsDetails[index]?.releaseYear
                                  ?.year
                              }
                            </h2>
                          </div>
                        </div>
                      </>
                    );
                  })}
              </div>
            </div>
            <div className=" text-[1.7vw] font-semibold text-black relative left-[55vw] bottom-[190vh]">
              <div className=" relative top-10 right-10 text-purple-500 text-[2.2vw]">
                <MdAlignVerticalCenter />
              </div>{" "}
              More To Explore
              <h1 className=" text-amber-600 mt-5">Charts</h1>
            </div>
            <div className=" relative left-[55vw] bottom-[187vh] justify-between">
              <div>
                <Link to="/charts/most-popular-movies">
                  {" "}
                  <div className=" text-black text-[1.3vw] font-bold flex group mb">
                    Most Popular Movies
                    <div className=" text-[1.7vw] relative top-2 ml-2 group-hover:text-red-700">
                      <TbArrowBigRightLinesFilled />
                    </div>
                  </div>
                  <div className=" text-[.9vw] font-small text-slate-600 mb-5">
                    As determined by CINEOUT users
                  </div>
                </Link>
              </div>
              <div>
                <Link>
                  <div className=" text-black text-[1.5vw] font-bold flex group mb">
                  CINEOUT Top 250 Movies
                    <div className=" text-[1.7vw] relative top-2 ml-2 group-hover:text-purple-700">
                      <TbArrowBigRightLinesFilled />
                    </div>
                  </div>
                  <div className=" text-[.9vw] font-small text-slate-600 mb-5">
                  As rated by regular CINEOUT voters.
                  </div>
                </Link>
              </div>
              <div>
                <Link>
                  <div className=" text-black text-[1.5vw] font-bold flex group mb">
                  Top Rated English Movies
                    <div className=" text-[1.7vw] relative top-2 ml-2 group-hover:text-yellow-400">
                      <TbArrowBigRightLinesFilled />
                    </div>
                  </div>
                  <div className=" text-[.9vw] font-small text-slate-600 mb-5">
                  English-language movies as rated by CINEOUT users
                  </div>
                </Link>
              </div>
              <div>
                <Link>
                  <div className=" text-black text-[1.5vw] font-bold flex group mb">
                  Most Popular TV Shows
                    <div className=" text-[1.7vw] relative top-2 ml-2 group-hover:text-cyan-500">
                      <TbArrowBigRightLinesFilled />
                    </div>
                  </div>
                  <div className=" text-[.9vw] font-small text-slate-600 mb-5">
                    As determined by CINEOUT users
                  </div>
                </Link>
              </div>
              <div>
                <Link>
                  <div className=" text-black text-[1.5vw] font-bold flex group mb">
                  Top 250 TV Shows
                    <div className=" text-[1.7vw] relative top-2 ml-2 group-hover:text-blue-700">
                      <TbArrowBigRightLinesFilled />
                    </div>
                  </div>
                  <div className=" text-[.9vw] font-small text-slate-600 mb-5">
                  Top 250 as rated by CINEOUT Users
                  </div>
                </Link>
              </div>
              <div>
                <Link>
                  <div className=" text-black text-[1.5vw] font-bold flex group mb">
                  Lowest Rated Movies
                    <div className=" text-[1.7vw] relative top-2 ml-2 group-hover:text-orange-400">
                      <TbArrowBigRightLinesFilled />
                    </div>
                  </div>
                  <div className=" text-[.9vw] font-small text-slate-600 mb-5">
                  Bottom 100 as voted by CINEOUT users
                  </div>
                </Link>
              </div>
              <div>
                <Link>
                  <div className=" text-black text-[1.5vw] font-bold flex group mb">
                  Most Popular Celebs
                    <div className=" text-[1.7vw] relative top-2 ml-2 group-hover:text-lime-500">
                      <TbArrowBigRightLinesFilled />
                    </div>
                  </div>
                  <div className=" text-[.9vw] font-small text-slate-600 mb-5">
                    As determined by CINEOUT users
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BoxOffice;
