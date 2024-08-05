import { useEffect, useState } from "react";
import BackToTop from "../constants/BackToTop";
import { TbMinusVertical } from "react-icons/tb";
import { API_OPTIONS } from "../constants/Apioptions";
import { TiStarFullOutline } from "react-icons/ti";
import MoreToExplore from "./MoreToExplore";
import MovieNews from "./MovieNews";
import MoreToRead from "./MoreToRead";
import Header from "./Header";
import Headerfordetails from "./Headerfordetails";
import RecentlyViewed from "./RecentlyViewed";
import Footer from "./Footer";

const Top250Movies = () => {
  const [Top250Movies, setTop250Movies] = useState(null);
  const [Top250MoviesBanner, setTop250MoviesBanner] = useState(null);
  const [Full250Movies, setFull250Movies] = useState(null);
  const [Full250MoviesID, setFull250MoviesID] = useState(null);
  const [randomIndex, setRandomIndex] = useState(0);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const shouldReload = localStorage.getItem("reloadOnce");

    if (shouldReload) {
      localStorage.removeItem("reloadOnce"); // remove the flag
      window.location.reload();
    }
  }, []);

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
    const getTop250Movies = async () => {
      try {
        const response = await fetch(
          "https://run.mocky.io/v3/7fdaba40-a74b-4c1f-b5eb-c7990f05f97c"
        );
        const data = await response.json();
        const FullData = data.movies;
        // console.log(FullData);
        // Filter movies released after 1990-01-01
        const filteredMovies = FullData.filter(
          (item) =>
            item.Released && new Date(item.Released) >= new Date("2018-01-01")
        );
        setTop250Movies(filteredMovies);
        setFull250Movies(FullData);
        setFull250MoviesID(
          filteredMovies.map((item) => {
            return item?.imdbID;
          })
        );

        setRandomIndex(Math.floor(Math.random() * filteredMovies.length));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getTop250Movies();
  }, []);

  useEffect(() => {
    // Auto-scroll every 5 seconds
    const interval = setInterval(() => {
      setRandomIndex((prevIndex) => (prevIndex + 1) % Top250Movies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [Top250Movies]);

  useEffect(() => {
    const getBannerTop250 = async () => {
      if (Full250MoviesID) {
        const BannerData = await Promise.all(
          Full250MoviesID.map(async (id) => {
            const response = await fetch(
              `https://api.themoviedb.org/3/find/${id}?external_source=imdb_id`,
              API_OPTIONS
            );
            const data = await response.json();
            return data?.movie_results;
          })
        );
        setTop250MoviesBanner(BannerData.flat());
      }
    };
    getBannerTop250();
  }, [Full250MoviesID]);

  useEffect(() => {
    Top250MoviesBanner && console.log(Top250MoviesBanner, "Banner Image");
  }, [Top250MoviesBanner]);

  useEffect(() => {
    Top250Movies && console.log(Top250Movies, " Filtered Movies For Banner");
  }, [Top250Movies]);

  useEffect(() => {
    Full250Movies && console.log(Full250Movies, " All 250 Movies ");
  }, [Full250Movies]);

  useEffect(() => {
    Full250MoviesID && console.log(Full250MoviesID, "All 250 movies IDs");
  }, [Full250MoviesID]);

  return (
    <>
      <div className="min-h-screen w-full bg-black overflow-x-hidden">
        <Header />
        <div className="w-full min-h-screen pt-[8vh] bg-black overflow-y-visible">
          <div className="w-[95vw] mx-auto h-[31vh] xsmall:h-[40vh] small:h-[50vh] medium:h-[60vh] large:h-[65vh] bg-black border-[5px] border-blue-700 relative top-[1vw]">
            <div className="w-full h-full relative">
              {Top250MoviesBanner ? (
                <>
                  <img
                    className="w-full h-full object-cover object-top"
                    src={`https://image.tmdb.org/t/p/original/${Top250MoviesBanner[randomIndex]?.backdrop_path}`}
                    alt={`Movie ${randomIndex + 1}`}
                  />
                  <div className="absolute left-[2vw] top-[1vw] bg-blue-300 rounded-lg">
                    <a
                      href="#_"
                      className="px-2 py-1 xsmall:px-4 xsmall:py-2.5 relative rounded group font-medium text-white inline-block"
                    >
                      <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-lime-600 to-cyan-500"></span>
                      <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-lime-600 to-cyan-500"></span>
                      <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-md from-lime-600 to-cyan-500"></span>
                      <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-lime-600 from-cyan-500"></span>
                      <span className="relative text-xs xsmall:text-sm small:text-base">
                        {Top250MoviesBanner[randomIndex]?.title}
                      </span>
                    </a>
                  </div>
                </>
              ) : (
                <div
                  role="status"
                  className="flex items-center justify-center w-full h-full bg-gray-600 dark:bg-gray-700"
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
          <div className="w-[90vw] mx-auto mt-10 bg-black relative">
            <div className="w-full border-b-2 border-gray-600 relative">
              <div className="absolute w-full  blur-[10px] bg-indigo-200"></div>
              <h3 className="absolute text-black left-[5vw] xsmall:left-[10vw] top-4 font-bold text-[5vw] xsmall:text-[4vw] small:text-[3vw] medium:text-[2.5vw] large:text-[2vw]">
                CINEOUT Charts
              </h3>
              <span className="absolute text-teal-400 left-[3vw] xsmall:left-[8vw] font-bold top-[12vw] xsmall:top-[10vw] small:top-[8vw] medium:top-[6vw] text-[4.7vw] xsmall:text-[4vw] small:text-[3vw] medium:text-[2.5vw]">
                <TbMinusVertical />
              </span>
              <h4 className="absolute text-black left-[6vw] xsmall:left-[11vw] font-medium top-[12vw] xsmall:top-[10vw] small:top-[8vw] medium:top-[6vw] text-[3vw] xsmall:text-[2.5vw] small:text-[2vw] medium:text-[1.5vw]">
                CINEOUT Top 250 Movies
                <h1 className="text-[2.5vw] xsmall:text-[2vw] small:text-[1.5vw] medium:text-[1vw] font-normal text-stone-500">
                  As rated by regular CINEOUT voters.
                </h1>
                <h1 className="text-[3vw] xsmall:text-[2.5vw] small:text-[2vw] medium:text-[1.5vw] font-normal text-black mt-2">
                  250 Titles
                </h1>
              </h4>
              <div className="w-full ml-[2.5vw] xsmall:ml-[5vw] p-2 xsmall:p-4 relative top-[35vw] xsmall:top-[30vw] small:top-[25vw] medium:top-[20vw]">
                {Full250Movies ? (
                  Full250Movies.map((item, index) => (
                    <div
                      key={index}
                      className="w-full xsmall:w-[94vw] small:w-[90vw] medium:w-[85vw] large:w-[80vw] mb-5 h-auto xsmall:h-[27vh] small:h-[25vh] medium:h-[22vh] -mt-2 bg-purple-30 border-l-[1px] hover:bg-green-100 rounded-lg border-yellow-300"
                    >
                      <div className="w-[30vw] h-full flex  flex-row xsmall:flex-row p-2 xsmall:p-4 bg-red-3 border-b-[2px] rounded-lg border-red-300">
                        <img
                          className="w-[30vw xsmall:w-[24vw] small:w-[20vw] medium:w-[15vw] h-[20vh] xsmall:h-[20vh] small:h-[18vh] medium:h-[16vh] rounded-lg object-cover xsmall:object-center glow5 mb-2 xsmall:mb-0"
                          src={item?.Poster}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://lascrucesfilmfest.com/wp-content/uploads/2018/01/no-poster-available-737x1024.jpg";
                          }}
                          alt=""
                        />
                        <div className="ml-4 xsmall:ml-2 flex flex-col justify-between">
                          <h1 className="font-bold w-[40vw] text-white whitespace-normal   hover:text-purple-600 cursor-pointer text-sm xsmall:text-base small:text-lg">
                            {index + 1}. {item?.Title}
                          </h1>
                          <div className="flex flex-wrap gap-2 text-gray-500 text-xs xsmall:text-sm">
                            <span>{item?.Year}</span>
                            <span>
                              {item && item.Runtime
                                ? `${Math.floor(
                                    parseInt(item.Runtime) / 60
                                  )}h ${parseInt(item.Runtime) % 60}min`
                                : "Runtime not available"}
                            </span>
                            <span>{item?.Rated}</span>
                          </div>
                          <div className="flex items-center mt-1 xsmall:mt-2">
                            <TiStarFullOutline className="text-yellow-400" />
                            <span className="mx-1">{item?.imdbRating}</span>
                            <span className="text-gray-500">
                              (
                              {item?.imdbVotes
                                ? parseInt(item?.imdbVotes.replace(/,/g, "")) /
                                    1000000 <
                                  1
                                  ? `${(
                                      parseInt(
                                        item?.imdbVotes.replace(/,/g, "")
                                      ) / 1000
                                    ).toFixed(0)}K`
                                  : `${(
                                      parseInt(
                                        item?.imdbVotes.replace(/,/g, "")
                                      ) / 1000000
                                    ).toFixed(2)}M`
                                : "Votes not available"}
                              )
                            </span>
                          </div>
                          <p className="mt-1 xsmall:mt-2 text-xs xsmall:text-sm">
                            Genre:{" "}
                            <span className="whitespace-normal">
                              {item?.Genre}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>
                    <h1></h1>
                  </div>
                )}
                <div className="hidden 2xlarge:block absolute bottom-[2220vw] h-0 bg-red-300">
                  <MoreToExplore />
                </div>
                <div className="hidden 2xlarge:block bg-red-400 h-0 -mt-[2265vw] mx-[52vw]">
                  <MoreToRead />
                </div>
              </div>
              <div className="bg-red-30 relative -bottom-[32vw] left-[5vw] xsmall:left-[12vw] w-[90vw] xsmall:w-[80vw] small:w-[70vw] medium:w-[60vw] large:w-[50vw]">
                <h1 className="font-normal text-sm xsmall:text-base">
                  The Top Rated Movie list only includes feature films.
                  <ul className="list-disc pl-5 mt-2">
                    <li className="text-purple-500">
                      Shorts, TV movies, and documentaries are not included
                    </li>
                    <li className="text-amber-600">
                      The list is ranked by a formula which includes the number
                      of ratings each movie received from users, and value of
                      ratings received from regular users
                    </li>
                    <li>
                      To be included on the list, a movie must receive ratings
                      from at least 25000 users
                    </li>
                  </ul>
                  <h1 className="text-cyan-500 cursor-pointer hover:underline mt-2">
                    Learn more about how list ranking is determined.
                  </h1>
                </h1>
              </div>
              <div className="h-auto xsmall:h-[62vh] bg-red-20">
                <div className=" relative top-[35vw] left-[5vw] xsmall:left-[10vw]">
                  <RecentlyViewed />
                </div>
              </div>
              <div className="bg-black relative">
                <Footer />
              </div>
            </div>
          </div>
        </div>
        {showScrollButton && <BackToTop />}
      </div>
    </>
  );
};

export default Top250Movies;
