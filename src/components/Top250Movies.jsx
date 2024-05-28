import { useEffect, useState } from "react";
import BackToTop from "../constants/BackToTop";
import { TbMinusVertical } from "react-icons/tb";

const Top250Movies = () => {
  const [Top250Movies, setTop250Movies] = useState(null);
  const [Full250Movies, setFull250Movies] = useState(null);
  const [randomIndex, setRandomIndex] = useState(0);
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
    const getTop250Movies = async () => {
      try {
        const response = await fetch(
          "https://run.mocky.io/v3/266f73fc-abad-4cc8-85ab-a0da1417bfce"
        );
        const data = await response.json();
        const FullData = data;
        // Filter movies released after 1990-01-01
        const filteredMovies = data.filter(
          (item) =>
            item.datePublished &&
            new Date(item.datePublished) >= new Date("2019-01-01")
        );
        setTop250Movies(filteredMovies);
        setFull250Movies(FullData);
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
    Top250Movies && console.log(Top250Movies);
  }, [Top250Movies]);

  useEffect(() => {
    Full250Movies && console.log(Full250Movies);
  }, [Full250Movies]);

  return (
    <>
      <div>
        <div className="w-[100vw] h-[100vh] bg-black  absolute">
          <div className="w-[97.6vw] mx-auto h-[65vh] border-[5px] border-blue-700 relative top-[1vw]">
            <div className="w-[97vw] mx-auto h-[57vh] relative top-[0.5vw]">
              {Top250Movies ? (
                <img
                  className="w-[97vw] h-[63.9vh] object-cover relative bottom-2"
                  src={
                    Top250Movies[randomIndex]?.trailer?.thumbnail?.contentUrl
                  }
                  alt={`Movie ${randomIndex + 1}`}
                />
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
          <div className="w-[100vw] h-[4400vh] mx-auto mt-10 bg-black absolute">
            <div className="w-[100vw] h-[5000vh] mx-auto absolute bg-black">
              <div className=" absolute w-[100vw] h-[4910vh] blur-[10px] bg-indigo-200 "></div>
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

              <div className="w-[80vw] h-[4875vh] mx-auto p-5 bg-slae-100  neuro relative top-[14vw]">
                {Full250Movies ? (
                  Full250Movies.map((item, index) => (
                    <div
                      key={index}
                      className="w-[48vw] mb-5 h-[19vh] -mt-4 border-l-[1px] hover:bg-green-100 rounded-lg  border-yellow-300"
                    >
                      <div className="w-[48vw] flex p-4 bg-red-3  border-b-[2px] rounded-lg border-red-300 ">
                        <img
                          className="w-[6vw] h-[15vh] object-contain"
                          src={item?.image}
                          alt=""
                        />
                        <h1 className=" flex  font-bold hover:text-red-600 cursor-pointer">
                          {index + 1}
                          {"."} {item?.name}
                        </h1>
                      </div>
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
            </div>
          </div>
        </div>
        {showScrollButton && <BackToTop />}
      </div>
    </>
  );
};

export default Top250Movies;
