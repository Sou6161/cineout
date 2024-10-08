import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_OPTIONS } from "../constants/Apioptions";
import { CgPlayListRemove } from "react-icons/cg";

const Fanfavourites = ({ finalfanwatch }) => {
  const [FanFavouritesTMDBID, setFanFavouritesTMDBID] = useState([]);
  const [fanwatchIDs, setFanwatchIDs] = useState([]); // New state for storing IDs

  useEffect(() => {
    // Extract IDs from finalfanwatch and store them in fanwatchIDs
    if (finalfanwatch) {
      const ids = finalfanwatch.map((item) => item.id);
      setFanwatchIDs(ids);
    }
  }, [finalfanwatch]);

  useEffect(() => {
    if (fanwatchIDs.length > 0) {
      console.log("FanwatchIDs:", fanwatchIDs);
    }
  }, [fanwatchIDs]);

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
        // Flatten the array and filter out empty arrays
        const flattenedIDs = tmdbIDs.flat().filter((id) => id !== undefined);
        setFanFavouritesTMDBID(flattenedIDs);
      } catch (error) {
        console.error("Error fetching TMDB IDs:", error);
        setFanFavouritesTMDBID([]); // Set to empty array in case of error
      }
    };

    if (fanwatchIDs && fanwatchIDs.length > 0) {
      fetchTMDBIDs();
    } else {
      setFanFavouritesTMDBID([]); // Set to empty array if fanwatchIDs is empty or null
    }
  }, [fanwatchIDs]);

  useEffect(() => {
    if (FanFavouritesTMDBID && FanFavouritesTMDBID.length > 0) {
      console.log("FanFavouritesTMDBID:", FanFavouritesTMDBID);
    }
  }, [FanFavouritesTMDBID]);

  const getContentLink = (item, tmdbId) => {
    if (item?.titleType?.text) {
      const titleType = item.titleType.text;
      if (titleType.includes("TV Series")) {
        return { path: `/name/tv/${tmdbId || "loading"}`, isTVSeries: true };
      } else if (titleType.includes("Movie")) {
        return {
          path: `/name/movie/${tmdbId || "loading"}`,
          isTVSeries: false,
        };
      }
    }
    return { path: "/", isTVSeries: false };
  };

  return (
    <div className="w-[300vw] scrollbar-hide overflow-auto p-5 -mt-10 bg-black">
      <div className="mb-10 items-center gap-[47%] overflow-y-clip">
        <h1 className="text-xl small:text-[3.5vw] medium:text-[2.5vw] large:text-[2.5vw] xlarge:text-[2vw] 2xlarge:text-[1.5vw] ml-4 font-semibold text-violet-700 flex">
          <button className="group flex items-center">What To Watch</button>{" "}
        </h1>
        <h2 className="text-slate-600 text-[3vw] xsmall:text-[2.5vw] small:text-[2.5vw] medium:text-[1.5vw] large:text-[1.5vw] xlarge:text-[1.3vw] 2xlarge:text-[1vw] font-semibold px-4 py-1">
          This Week Movies And Series
        </h2>
      </div>

      <div className="flex gap-4 w-[100vw] h-[52vh] overflow-y-scroll no-scrollbar">
        {console.log(finalfanwatch)}
        {finalfanwatch &&
        FanFavouritesTMDBID &&
        finalfanwatch.length > 0 &&
        FanFavouritesTMDBID.length > 0 ? (
          finalfanwatch.map((item, index) => {
            const tmdbId = FanFavouritesTMDBID[index];
            const { path, isTVSeries } = getContentLink(item, tmdbId);

            return (
              <Link
                to={path}
                key={tmdbId}
                state={{ isTVSeries: isTVSeries, tmdbId: tmdbId }}
              >
                <div className="flex flex-col">
                  <div className="mr-4 ml-3 max-w-[53vw] max-h-[42vh] xsmall:max-w-[40vw] small:max-w-[30vw] medium:max-w-[30vw] large:max-w-[25vw] xlarge:max-w-[20vw] 2xlarge:max-w-[15vw] rounded-[10px] p-2 overflow-x-hidden scrollbar-hide cursor-pointer bg-zinc-700 hover:bg-slate-500">
                    <img
                      className="min-w-[49vw] h-[40vh] xsmall:min-w-[34vw] small:min-w-[25vw] medium:min-w-[22vw] large:min-w-[18vw] xlarge:min-w-[15vw] 2xlarge:min-w-[14vw] rounded-md drop-shadow-glow"
                      src={item?.primaryImage?.imageUrl}
                      alt=""
                    />
                  </div>
                  <h1 className="text-[5vw] xsmall:text-[4vw] small:text-[3vw] medium:text-[2vw] large:text-[1.7vw] xlarge:text-[1.5vw] 2xlarge:text-[1.3vw] font-semibold text-yellow-500 mt-3 relative left-4 break-words">
                    {item?.titleText?.text}
                  </h1>
                </div>
              </Link>
            );
          })
        ) : (
          <p>loading</p>
        )}
      </div>
    </div>
  );
};

export default Fanfavourites;
