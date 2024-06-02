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
          "https://run.mocky.io/v3/e1f5e402-4482-4901-bf4c-6686c9601694"
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
      <div>
        <Headerfordetails />
        <div className="w-[100vw] h-[100vh] bg-black  absolute">
          <div className="w-[97.6vw] mx-auto h-[65vh] border-[5px] border-blue-700 relative top-[1vw]">
            <div className="w-[97vw] mx-auto h-[57vh] relative top-[0.5vw]">
              {Top250MoviesBanner ? (
                <>
                  <img
                    className="w-[97vw] h-[63.9vh] object-cover relative bottom-2 object-top      "
                    src={`https://image.tmdb.org/t/p/original/${Top250MoviesBanner[randomIndex]?.backdrop_path}`}
                    alt={`Movie ${randomIndex + 1}`}
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
                      <span class="relative">
                        {Top250MoviesBanner[randomIndex]?.title}
                      </span>
                    </a>
                  </div>
                </>
              ) : (
                <div
                  role="status"
                  class="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
                >
                  <div class="flex items-center justify-center w-full h-[63.9vh] bg-gray-600  sm:w-[97vw] relative bottom-2    dark:bg-gray-700">
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
          <div className="w-[90vw] h-[4400vh] mx-auto mt-10 bg-black absolute">
            <div className="w-[100vw] h-[5004vh] mx-auto absolute bg-black border-b-2 border-gray-600">
              <div className=" absolute w-[100vw] h-[4932vh] blur-[10px] bg-indigo-200 "></div>
              <h3 className=" absolute text-black left-[10vw] font-bold top-6 text-[1.2vw]">
                CINEOUT Charts{" "}
              </h3>
              <span className=" absolute text-teal-400 left-[9vw] font-bold top-[3.5vw] text-[3vw] ">
                <TbMinusVertical />
              </span>
              <h4 className=" absolute text-black left-[11vw] font-medium  top-[3.3vw] text-[2vw]">
                CINEOUT Top 250 Movies
                <h1 className=" text-[1vw] font-normal text-stone-500">
                  As rated by regular CINEOUT voters.
                </h1>
                <h1 className=" text-[1vw] font-normal text-black mt-10">
                  250 Titles
                </h1>
              </h4>
              <div className="w-[80vw] h-[4910vh] mx-auto p-5  neuro relative top-[10vw]">
                {Full250Movies ? (
                  Full250Movies.map((item, index) => (
                    <div  
                      key={index}
                      className="w-[48vw] mb-5 h-[19vh] -mt-4 border-l-[1px] hover:bg-green-100 rounded-lg  border-yellow-300"
                    >
                      <div className="w-[48vw] flex p-4 bg-red-3  border-b-[2px] rounded-lg border-red-300 ">
                        <img
                          className="w-[5.5vw] h-[15vh] rounded-lg   object-fill glow"
                          src={item?.Poster}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://lascrucesfilmfest.com/wp-content/uploads/2018/01/no-poster-available-737x1024.jpg";
                          }}
                          alt=""
                        />

                        <h1 className=" mx-2   font-bold hover:text-purple-600 cursor-pointer">
                          {index + 1}
                          {"."} {item?.Title}
                        </h1>
                      </div>
                      <div className=" flex gap-3 text-gray-500">
                        <h1 className=" relative bottom-[6vw] left-[8vw] font-normal">
                          {item?.Year}
                        </h1>
                        <h1 className="relative bottom-[6vw] left-[8vw] font-normal">
                          {item && item.Runtime
                            ? `${Math.floor(parseInt(item.Runtime) / 60)}h ${
                                parseInt(item.Runtime) % 60
                              }min`
                            : "Runtime not available"}
                        </h1>

                        <h1 className=" relative bottom-[6vw] left-[8vw] font-normal">
                          {item?.Rated}
                        </h1>
                      </div>
                      <h1 className=" mt-4 relative flex bottom-[6vw] left-[8vw] font-normal">
                        <TiStarFullOutline className=" text-yellow-400" />
                        <h1 className=" relative bottom-1 mx-1">
                          {" "}
                          {item?.imdbRating}
                        </h1>
                        <h1 className="relative bottom-1 text-gray-500">
                          (
                          {item?.imdbVotes
                            ? parseInt(item?.imdbVotes.replace(/,/g, "")) /
                                1000000 <
                              1
                              ? `${(
                                  parseInt(item?.imdbVotes.replace(/,/g, "")) /
                                  1000
                                ).toFixed(0)}K`
                              : `${(
                                  parseInt(item?.imdbVotes.replace(/,/g, "")) /
                                  1000000
                                ).toFixed(2)}M`
                            : "Votes not available"}
                          )
                        </h1>
                      </h1>
                      <h1 className=" relative flex bottom-[6vw] left-[8vw] font-normal">
                        Genre: {item?.Genre}
                      </h1> 
                    </div>
                  ))
                ) : (
                  <>
                    <div
                      role="status"
                      className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex mb-5 md:items-center"
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

                    {/* second Skeleton UI */}

                    <div
                      role="status"
                      className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 mb-5 rtl:space-x-reverse md:flex md:items-center"
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

                    {/* Third Skeleton UI */}

                    <div
                      role="status"
                      className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 mb-5 rtl:space-x-reverse md:flex md:items-center"
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

                    {/* Fourth Skeleton UI */}

                    <div
                      role="status"
                      className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
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
                        <div className="h-2 bg-red-600 rounded-full dark:bg-gray-700 w-[20vw] mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                      </div>
                      <span className="sr-only">Loading...</span>
                    </div>
                  </>
                )}
                <div className=" absolute bottom-[2220vw] h-0   bg-red-300">
                  <MoreToExplore />
                </div>
                <div className=" bg-red-400 h-0 -mt-[2265vw] mx-[52vw] ">
                  <MoreToRead />
                </div>
              </div>
              <div className=" bg-red-30  relative bottom-[7vw] left-[12vw] w-[30vw]">
                <h1 className="  font-normal ">
                  The Top Rated Movie list only includes feature films.
                  <h1 className=" relative top-2">
                    <li>
                      <ul className=" relative bottom-6 left-5  text-purple-500">
                        Shorts, TV movies, and documentaries are not included
                      </ul>
                    </li>
                  </h1>
                  <h1>
                    <li>
                      <ul className=" relative bottom-6 left-5 text-amber-600">
                        The list is ranked by a formula which includes the
                        number of ratings each movie received from users, and
                        value of ratings received from regular users
                      </ul>
                    </li>
                  </h1>
                  <h1>
                    <li>
                      <ul className=" relative bottom-6 left-5">
                        To be included on the list, a movie must receive ratings
                        from at least 25000 users
                      </ul>
                    </li>
                  </h1>
                  <h1 className=" text-cyan-500 cursor-pointer hover:underline">
                    Learn more about how list ranking is determined.
                  </h1>
                </h1>
              </div>
              <div className="  h-[62vh] bg-red-20   ">
                <div className=" relative left-[10vw]">
                  <RecentlyViewed />
                </div>
              </div>
              <div className=" bg-black">
                <div className="">
                <Footer />

                </div>
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
