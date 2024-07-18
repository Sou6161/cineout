import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdTheaters } from "react-icons/md";
import {
  RapidOptionsApiDojoDaimond,
  RapidOptionsApiDojoDiamond,
  RapidoptionsApiDojo,
  RapidoptionsApiDojoRoman,
  RapidoptionsTechView,
} from "../constants/Rapidoptions";
import { API_OPTIONS } from "../constants/Apioptions";

const Fourthcontainer = () => {
  const [BoxOfficeMovies, setBoxOfficeMovies] = useState(null);
  const [BoxOfficeMovieID, setBoxOfficeMovieID] = useState([]);
  const [BoxOfficeIMDBID, setBoxOfficeIMDBID] = useState(null);
  const [BoxOfficeMovieDetails, setBoxOfficeMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1`,
        API_OPTIONS
      );
      const data = await response.json();
      console.log(data?.results.slice(0, 10), "Box Office Movies List");
      setBoxOfficeMovies(data?.results.slice(0, 10));
    };
    getMovies();
  }, []);

  useEffect(() => {
    if (BoxOfficeMovies) {
      const movieIDs = BoxOfficeMovies.map((item) => item?.id);
      setBoxOfficeMovieID(movieIDs);
    }
  }, [BoxOfficeMovies]);

  useEffect(() => {
    const findIMDBIDs = async () => {
      if (BoxOfficeMovieID && BoxOfficeMovieID.length > 0) {
        const imdbIDs = await Promise.all(
          BoxOfficeMovieID.map(async (id) => {
            try {
              const response = await fetch(
                `https://api.themoviedb.org/3/movie/${id}/external_ids`,
                API_OPTIONS
              );
              const data = await response.json();
              return data?.imdb_id;
            } catch (error) {
              console.error(`Error fetching IMDB ID for movie ${id}:`, error);
              return null;
            }
          })
        );

        // Filter out any null values in case of errors
        const validIMDBIDs = imdbIDs.filter((id) => id !== null);
        setBoxOfficeIMDBID(validIMDBIDs);
      }
    };

    findIMDBIDs();
  }, [BoxOfficeMovieID]);

  useEffect(() => {
    if (BoxOfficeIMDBID) {
      console.log("Box Office IMDB IDs:", BoxOfficeIMDBID);
    }
  }, [BoxOfficeIMDBID]);

  useEffect(() => {
    const getMovieDetails = async () => {
      setIsLoading(true);

      // Check local storage first
      const storedData = localStorage.getItem("Top Box Office Movies List");
      if (storedData) {
        setBoxOfficeMovieDetails(JSON.parse(storedData));
        setIsLoading(false);
        return;
      }

      const details = [];

      const fetchMovieWithDelay = (index) => {
        if (index >= BoxOfficeIMDBID.length) {
          setBoxOfficeMovieDetails(details);
          // Store in local storage
          localStorage.setItem(
            "Top Box Office Movies List",
            JSON.stringify(details)
          );
          setIsLoading(false);
          return;
        }

        const id = BoxOfficeIMDBID[index];
        fetch(
          `https://imdb8.p.rapidapi.com/title/v2/get-box-office-summary?tconst=${id}`,
          RapidOptionsApiDojoDaimond
        )
          .then((response) => response.json())
          .then((movieData) => {
            details.push(movieData);
            setTimeout(() => fetchMovieWithDelay(index + 1), 2000);
          })
          .catch((error) => {
            console.error(`Error fetching details for movie ${id}:`, error);
            setTimeout(() => fetchMovieWithDelay(index + 1), 2000);
          });
      };

      if (BoxOfficeIMDBID && BoxOfficeIMDBID.length > 0) {
        fetchMovieWithDelay(0);
      } else {
        setIsLoading(false);
      }
    };

    getMovieDetails();

    // Removed the cleanup function that was clearing local storage
  }, [BoxOfficeIMDBID]);

  useEffect(() => {
    if (BoxOfficeMovieDetails && BoxOfficeMovieDetails.length > 0) {
      console.log("All Box Office Movie Details:", BoxOfficeMovieDetails);
    }
  }, [BoxOfficeMovieDetails]);

  const convertToMillions = (amount) => {
    if (!amount) return "N/A";
    return (amount / 1000000).toFixed(1);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!BoxOfficeMovieDetails || BoxOfficeMovieDetails.length === 0) {
    return <div>No movie details available</div>;
  }

  return (
    <>
      <Link to="/Top-Box-Office">
        <div className="">
          <MdTheaters className=" text-red-600 text-[8vw] xsmall:text-[6vw] small:text-[5vw] medium:text-[4vw] large:text-[3.5vw] xlarge:text-[3vw] 2xlarge:text-[2.5vw] relative top-[10vw] ml-5" />
          <h1 className=" text-purple-300 font-semibold text-[5vw] xsmall:text-[4vw] small:text-[3.5vw] medium:text-[3vw] large:text-[2.5vw] xlarge:text-[2.5vw] 2xlarge:text-[1.5vw] relative top-[2vw] xsmall:top-[4vw] small:top-[5vw] medium:top-[5.5vw] large:top-[6.2vw] xlarge:top-[6.4vw] 2xlarge:top-[7.5vw] ml-[14vw]   xsmall:ml-[11vw]  small:ml-[9vw] medium:ml-[7vw] large:ml-[6vw] xlarge:ml-[5vw] 2xlarge:ml-[4vw]">
            Top Box Office(US)
          </h1>
        </div>
      </Link>

      <div className="w-full p-4 mt-[10vw] cursor-pointer">
        <div className="grid grid-cols-1 xsmall:grid-cols-2 small:grid-cols-3 medium:grid-cols-4 large:grid-cols-5 gap-4">
          {BoxOfficeMovieDetails &&
            BoxOfficeMovieDetails.map((item, index) => (
              <div
                key={index}
                className="bg-[#080808] border-2 border-cyan-600 rounded-lg p-4 hover:border-red-600 hover:bg-black hover:text-white transition-all duration-300"
              >
                <div className="flex justify-between items-center">
                  <div className="font-bold text-purple-600 text-md small:text-base truncate flex-1">
                    {item?.data?.title?.originalTitleText?.text ||
                      "Title Not Available"}
                  </div>
                  <div className="text-white font-semibold text-sm small:text-base ml-2">
                    {convertToMillions(
                      item?.data?.title?.worldwideGross?.total?.amount
                    )}{" "}
                    M
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Fourthcontainer;
