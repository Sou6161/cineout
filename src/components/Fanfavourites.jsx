import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { API_OPTIONS } from "../constants/Apioptions";

const Fanfavourites = ({ finalfanwatch }) => {
  const [movieData, setMovieData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovieData = async () => {
      if (!finalfanwatch || finalfanwatch.length === 0) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const moviePromises = finalfanwatch.map(async (item) => {
          if (!item.id) return null;

          try {
            const response = await fetch(
              `https://api.themoviedb.org/3/find/${item.id}?external_source=imdb_id`,
              API_OPTIONS
            );
            
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            const result = data.movie_results?.[0] || data.tv_results?.[0];
            
            if (result) {
              return {
                ...item,
                tmdbId: result.id,
                type: data.movie_results?.[0] ? 'movie' : 'tv'
              };
            }
            return item;
          } catch (error) {
            console.error(`Error fetching data for ID ${item.id}:`, error);
            return item;
          }
        });

        const results = await Promise.all(moviePromises);
        const filteredResults = results.filter(Boolean);
        setMovieData(filteredResults);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieData();
  }, [finalfanwatch]);

  const getContentLink = (item) => {
    if (!item?.titleType?.text) return { path: "/", isTVSeries: false };
    
    const titleType = item.titleType.text.toLowerCase();
    const isTVSeries = titleType.includes("tv series");
    const path = isTVSeries 
      ? `/name/tv/${item.tmdbId || "loading"}` 
      : `/name/movie/${item.tmdbId || "loading"}`;
    
    return { path, isTVSeries };
  };

  return (
    <div className="h-[65vh] bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-black via-slate-900 to-black p-6 relative overflow-hidden">
      <div className="relative z-10">
        <div className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <div className="relative">
              <h1 className="text-xl small:text-[3.5vw] medium:text-[3vw] large:text-[2.5vw] xlarge:text-[2vw] 2xlarge:text-[1.5vw] font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-purple-500 to-indigo-500">
                What To Watch
              </h1>
              <div className="h-1 w-32 bg-gradient-to-r from-violet-400 via-purple-500 to-indigo-500 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>

          <h2 className="text-slate-400 text-[3vw] xsmall:text-[2.5vw] small:text-[2vw] medium:text-[1.5vw] large:text-[1.5vw] xlarge:text-[1.3vw] 2xlarge:text-[1vw] font-medium mb-6">
            This Week's Movies And Series
          </h2>

          <div className="w-full overflow-x-auto overflow-y-hidden scrollbar-hide">
            <div className="flex gap-6 pb-4 py-4">
              {!isLoading && movieData.length > 0 ? (
                movieData.map((item) => {
                  const { path, isTVSeries } = getContentLink(item);
                  
                  return (
                    <Link
                      to={path}
                      key={item.id}
                      state={{ isTVSeries, tmdbId: item.tmdbId }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.05, rotateY: 5 }}
                        transition={{ duration: 0.3 }}
                        className="relative group"
                      >
                        <div className="relative w-[48vw] xsmall:w-[34vw] small:w-[25vw] medium:w-[22vw] large:w-[18vw] xlarge:w-[15vw] 2xlarge:w-[14vw] ml-5">
                          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-xl  border border-white/10 group-hover:border-white/20 transition-all duration-300"></div>
                          
                          <div className="absolute inset-0 bg-gradient-to-t from-stone-700/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                          
                          {item?.primaryImage?.imageUrl ? (
                            <img
                              className="w-full h-[40vh] object-cover rounded-xl shadow-[0_0_15px_rgba(167,139,250,0.3)] group-hover:shadow-[0_0_25px_rgba(167,139,250,0.5)] transition-all duration-300"
                              src={item.primaryImage.imageUrl}
                              alt={item?.titleText?.text || 'Movie poster'}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://www.prokerala.com/movies/assets/img/no-poster-available.jpg";
                              }}
                            />
                          ) : (
                            <div className="w-full h-[40vh] bg-slate-800 rounded-xl flex items-center justify-center">
                              <span className="text-slate-400">No Image Available</span>
                            </div>
                          )}

                          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                            <h2 className="text-white font-semibold text-[4vw] xsmall:text-[3vw] small:text-[2.5vw] medium:text-[2vw] large:text-[1.5vw] xlarge:text-[1.2vw] 2xlarge:text-[1vw] line-clamp-2 drop-shadow-lg">
                              {item?.titleText?.text || 'Untitled'}
                            </h2>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  );
                })
              ) : (
                <div className="flex items-center justify-center w-full h-[40vh]">
                  <div className="text-slate-400 text-lg">
                    {isLoading ? "Loading..." : "No movies available"}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fanfavourites;