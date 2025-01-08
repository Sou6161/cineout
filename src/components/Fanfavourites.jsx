import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { API_OPTIONS } from "../constants/Apioptions";

const Fanfavourites = ({ finalfanwatch }) => {
  const [FanFavouritesTMDBID, setFanFavouritesTMDBID] = useState([]);
  const [fanwatchIDs, setFanwatchIDs] = useState([]);

  useEffect(() => {
    if (finalfanwatch) {
      const ids = finalfanwatch.map((item) => item.id);
      setFanwatchIDs(ids);
    }
  }, [finalfanwatch]);

  useEffect(() => {
    const fetchTMDBIDs = async () => {
      try {
        const tmdbIDs = await Promise.all(
          fanwatchIDs.map(async (id) => {
            const response = await fetch(
              `https://api.themoviedb.org/3/find/${id}?external_source=imdb_id`,
              API_OPTIONS
            );
            const data = await response.json();
            if (data?.movie_results && data.movie_results.length > 0) {
              return data.movie_results.map((item) => item.id);
            } else if (data?.tv_results && data.tv_results.length > 0) {
              return data.tv_results.map((item) => item.id);
            } else {
              console.log(`No movie or TV results found for ID: ${id}`);
              return [];
            }
          })
        );
        const flattenedIDs = tmdbIDs.flat().filter((id) => id !== undefined);
        setFanFavouritesTMDBID(flattenedIDs);
      } catch (error) {
        console.error("Error fetching TMDB IDs:", error);
        setFanFavouritesTMDBID([]);
      }
    };

    if (fanwatchIDs?.length > 0) {
      fetchTMDBIDs();
    } else {
      setFanFavouritesTMDBID([]);
    }
  }, [fanwatchIDs]);

  const getContentLink = (item, tmdbId) => {
    if (item?.titleType?.text) {
      const titleType = item.titleType.text;
      if (titleType.includes("TV Series")) {
        return { path: `/name/tv/${tmdbId || "loading"}`, isTVSeries: true };
      } else if (titleType.includes("Movie")) {
        return { path: `/name/movie/${tmdbId || "loading"}`, isTVSeries: false };
      }
    }
    return { path: "/", isTVSeries: false };
  };

  return (
    <div className=" h-[65vh] bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-black via-slate-900 to-black p-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[5px] opacity-50">
        </div>
      </div>

      {/* Content container with glass effect */}
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
              {finalfanwatch && FanFavouritesTMDBID?.length > 0 ? (
                finalfanwatch.map((item, index) => {
                  const tmdbId = FanFavouritesTMDBID[index];
                  const { path, isTVSeries } = getContentLink(item, tmdbId);

                  return (
                    <Link
                      to={path}
                      key={tmdbId}
                      state={{ isTVSeries: isTVSeries, tmdbId: tmdbId }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.05, rotateY: 5 }}
                        transition={{ duration: 0.3 }}
                        className="relative group"
                      >
                        <div className="relative w-[48vw] xsmall:w-[34vw] small:w-[25vw] medium:w-[22vw] large:w-[18vw] xlarge:w-[15vw] 2xlarge:w-[14vw]">
                          {/* Card glass effect background */}
                          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-xl backdro-blur-sm border border-white/10 group-hover:border-white/20 transition-all duration-300"></div>
                          
                          {/* Hover overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-stone-700/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                          
                          {/* Image */}
                          <img
                            className="w-full h-[40vh] object-cover rounded-xl shadow-[0_0_15px_rgba(167,139,250,0.3)] group-hover:shadow-[0_0_25px_rgba(167,139,250,0.5)] transition-all duration-300"
                            src={item?.primaryImage?.imageUrl}
                            alt={item?.titleText?.text}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "https://www.prokerala.com/movies/assets/img/no-poster-available.jpg";
                            }}
                          />

                          {/* Title overlay */}
                          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                            <h2 className="text-white font-semibold text-[4vw] xsmall:text-[3vw] small:text-[2.5vw] medium:text-[2vw] large:text-[1.5vw] xlarge:text-[1.2vw] 2xlarge:text-[1vw] line-clamp-2 drop-shadow-lg">
                              {item?.titleText?.text}
                            </h2>
                          </div>
                          
                          {/* Decorative elements */}
                          <div className="absolute top-2 right-2 w-8 h-8 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm"></div>
                          <div className="absolute bottom-2 left-2 w-12 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      </motion.div>
                    </Link>
                  );
                })
              ) : (
                <div className="flex items-center justify-center w-full h-[40vh]">
                  <div className="text-slate-400 text-lg animate-pulse">Loading...</div>
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