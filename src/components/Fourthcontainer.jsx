import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdTheaters } from "react-icons/md";
import {
  RapidOptionsApiDojoDaimond,
  RapidOptionsTechViewDiamond,
  RapidoptionsApiDojo,
  RapidoptionsApiDojoRoman,
  RapidoptionsTechView,
} from "../constants/Rapidoptions";

const Fourthcontainer = () => {
  const [BoxOfficeMovies, setBoxOfficeMovies] = useState(null);
  const [BoxOfficeMovieID, setBoxOfficeMovieID] = useState([]);
  const [BoxOfficeMovieDetails, setBoxOfficeMovieDetails] = useState(null);

  useEffect(() => {
    const getMovies = async () => {
      // Check if data is in local storage
      let data = localStorage.getItem("BOX OFFICE MOVIES LIST");
      if (data) {
        // Parse stored json if it was found
        data = JSON.parse(data);
      } else {
        // Otherwise, fetch data from API
        const response = await fetch(
          `https://movies-tv-shows-database.p.rapidapi.com/?page=1`,
          RapidOptionsTechViewDiamond
        );
        data = await response.json();
        // Save the data to local storage
        localStorage.setItem(
          "BOX OFFICE MOVIES LIST",
          JSON.stringify(data?.movie_results)
        );
      }
      setBoxOfficeMovies(data);
    };
    getMovies();
  }, []);

  useEffect(() => {
    BoxOfficeMovies &&
      setBoxOfficeMovieID(BoxOfficeMovies.map((item) => item?.imdb_id));
  }, [BoxOfficeMovies]);

  useEffect(() => {
    // BoxOfficeMovieID && console.log(BoxOfficeMovieID);
  }, [BoxOfficeMovieID]);

  useEffect(() => {
    const getMovieDetails = async () => {
      let data = localStorage.getItem("BOX OFFICE MOVIES DETAILS");
      if (data) {
        data = JSON.parse(data);
      } else {
        data = [];
        for (let i = 0; i < BoxOfficeMovieID.length; i++) {
          const id = BoxOfficeMovieID[i];
          const response = await fetch(
            `https://imdb8.p.rapidapi.com/title/v2/get-box-office-summary?tconst=${id}`,
            RapidOptionsApiDojoDaimond
          );
          const movieData = await response.json();
          data.push(movieData?.data?.title); // Store only the title
          
          // Save the data to local storage
          localStorage.setItem(
            "BOX OFFICE MOVIES DETAILS",
            JSON.stringify(data)
          );
          // If it's not the last request in this second, don't delay
          if ((i + 1) % 5 !== 0 || i === BoxOfficeMovieID.length - 1) continue;
          // Wait for 1 second before the next request
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }
      setBoxOfficeMovieDetails(data);
    };
    if (BoxOfficeMovieID.length > 0) {
      getMovieDetails();
    }
  }, [BoxOfficeMovieID]);

  useEffect(() => {
    // BoxOfficeMovieDetails && console.log(BoxOfficeMovieDetails);
  }, [BoxOfficeMovieDetails]);

  function convertToMillions(amount) {
    return Math.floor(amount / 1000000);
  }

  return (
    <>
      <Link to="/Top-Box-Office">
        <div className=" w-[21vw] h-[10vh]">
          <div>
            <div>
              <MdTheaters className=" text-red-600 text-[2vw] relative top-11 ml-5" />
              <h1 className=" text-purple-300 font-semibold text-[2vw] ml-14">
                Top Box Office(US)
              </h1>
            </div>
          </div>
        </div>
      </Link>
      {BoxOfficeMovieDetails && (
        <div className=" w-[100vw] h-[50vh] bg-lime-30 flex justify-between mt-10 cursor-pointer">
          <div className="flex flex-col gap-10 ml-[6vw]">
            {BoxOfficeMovieDetails &&
              BoxOfficeMovieDetails.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  className="w-[22vw] h-[5.5vh] rounded-lg font-bold hover:border-red-600 hover:bg-black hover:text-white bg-indigo-100 border-2 border-cyan-600 flex items-center justify-center relative"
                >
                  {item?.originalTitleText?.text}
                  <div className="w-[3.2vw] h-[5.5vh] rounded-lg  hover:bg-black text-black  hover:text-white bg-indigo-100 border-2 border-lime-600 absolute right-[-3.2vw] flex items-center justify-center">
                    {convertToMillions(item?.worldwideGross?.total?.amount)}M
                  </div>
                </div>
              ))}
          </div>
          <div className="flex flex-col gap-10 ml-[vw]">
            {BoxOfficeMovieDetails.slice(4, 8).map((item) => (
              
              <div
                key={item.id}
                className="w-[22vw] h-[5.5vh] rounded-lg hover:border-red-600 hover:bg-black font-bold hover:text-white bg-indigo-100 border-2 border-indigo-600 flex items-center justify-center relative"
              >
                {item?.originalTitleText?.text}
                <div className="w-[3.2vw] h-[5.5vh] rounded-lg  hover:bg-black text-black  hover:text-white bg-indigo-100 border-2 border-amber-400 absolute right-[-3.2vw] flex items-center justify-center">
                  {convertToMillions(item?.worldwideGross?.total?.amount)}M
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-10 mr-[8vw] mt-20">
            {BoxOfficeMovieDetails.slice(8, 10).map((item) => (
              <div
                key={item.id}
                className="w-[22vw] h-[5.5vh] rounded-lg hover:border-red-600 hover:bg-black hover:text-cyan-500 font-bold bg-indigo-100 border-2 border-purple-600 flex items-center justify-center relative"
              >
                {item?.originalTitleText?.text}

                <div className="w-[3.2vw] h-[5.5vh] rounded-lg  hover:bg-black text-black  hover:text-white bg-indigo-100 border-2 border-purple-600 absolute right-[-3.2vw] flex items-center justify-center">
                  {convertToMillions(item?.worldwideGross?.total?.amount)}M
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Fourthcontainer;
