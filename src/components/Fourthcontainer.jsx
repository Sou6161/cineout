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
import { Clapperboard, TrendingUp, DollarSign, Trophy } from "lucide-react";

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
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!BoxOfficeMovieDetails || BoxOfficeMovieDetails.length === 0) {
    return (
      <div className="text-gray-400 text-center py-12">
        No movie details available
      </div>
    );
  }


  return (
    <div className="bg-gradient-to-b from-black via-blue-900/10 to-black mt-[20vh]">
    <div className="max-w-8xl mx-5 px-4">
      {/* Header Section */}
      <Link to="/Top-Box-Office">
        <div className="flex items-center space-x-4 mb-12">
          <div className="relative">
            <Clapperboard className="w-10 h-10 text-red-500" />
            <Trophy className="w-5 h-5 text-yellow-400 absolute -top-2 -right-2" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
              Top Box Office (US)
            </h1>
            <p className="text-gray-400 text-sm mt-1">Latest weekend earnings</p>
          </div>
          <TrendingUp className="w-6 h-6 text-green-400 animate-pulse ml-auto" />
        </div>
      </Link>

      {/* Grid Container */}
      <div className="grid grid-cols-1 xsmall:grid-cols-2 small:grid-cols-3 medium:grid-cols-4 large:grid-cols-5 gap-6">
        {BoxOfficeMovieDetails &&
          BoxOfficeMovieDetails.map((item, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/30 rounded-xl p-4 transition-all duration-300
                           hover:border-purple-500 hover:bg-gray-900/80 hover:shadow-lg hover:shadow-purple-500/20
                           transform hover:-translate-y-1">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold text-purple-300 text-md small:text-lg mb-2 line-clamp-2">
                      {item?.data?.title?.originalTitleText?.text || "Title Not Available"}
                    </h3>
                    <div className="flex items-center text-green-400 space-x-1">
                      <DollarSign className="w-4 h-4" />
                      <span className="font-mono text-lg">
                        {convertToMillions(item?.data?.title?.worldwideGross?.total?.amount)} M
                      </span>
                    </div>
                  </div>
                  <div className="bg-purple-500/20 rounded-full p-2 w-8 h-8 flex items-center justify-center">
                    <span className="text-purple-300 text-sm font-bold">{index + 1}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  </div>
  );
};

export default Fourthcontainer;
