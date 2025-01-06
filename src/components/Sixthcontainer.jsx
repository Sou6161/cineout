import React, { useEffect, useState } from "react";
import { API_OPTIONS } from "../constants/Apioptions";
import { Play, Calendar, Film } from "lucide-react";
import { Link } from "react-router-dom";

const SixthContainer = () => {
  const [movies, setMovies] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const getUpcomingtrailers = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=2`,
        API_OPTIONS
      );
      const data = await response.json();
      const Alltrailers = data.results;

      let movies = [];

      for (const movie of Alltrailers) {
        const id = movie.id;
        const name = movie.title;

        const trailerResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
          API_OPTIONS
        );

        const trailerData = await trailerResponse.json();
        const Trailers = trailerData?.results;

        if (Trailers) {
          for (let i = 0; i < Trailers.length; i++) {
            const Trailerkeys = Trailers[i]?.key;
            const TrailerNames = Trailers[i]?.name;
            if (TrailerNames && TrailerNames.includes("Trailer")) {
              movies.push({
                name,
                trailerKey: Trailerkeys,
                trailerName: TrailerNames,
              });
              break;
            }
          }
        }
      }

      setMovies(movies);
    };

    getUpcomingtrailers();
  }, []);

  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-black h-[65vh] px-4 py-8">
      <div className="max-w-8xl mx-5">
        {/* Header Section */}
        <div className="relative mb-12">
          <div className="flex items-center space-x-2 mb-2">
            <Film className="w-8 h-8 text-purple-500" />
            <h2 className="text-3xl h-12 font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text">
              Upcoming Trailers
            </h2>
          </div>
          <p className="text-gray-400 ml-10 text-[3.5vw] xsmall:text-[3vw] small:text-[2.5vw] medium:text-[1.5vw] large:text-[1.5vw] xlarge:text-[1.3vw] 2xlarge:text-[1vw]">
            Preview tomorrow's blockbusters today
          </p>
        </div>

        {/* Trailers Grid */}
        <div className="overflow-x-auto no-scrollbar">
          <div className="flex gap-8 pb-8">
            {movies.map((movie, index) => (
              <div
                key={index}
                className="relative group"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="relative">
                  {/* Video Container */}
                  <div className="relative overflow-hidden rounded-xl border-2 border-purple-500/30 transition-all duration-300 group-hover:border-purple-500 group-hover:shadow-lg group-hover:shadow-purple-500/20">
                    <iframe
                      className="max-w-[70vw] max-h-[20vh] xsmall:min-w-[30vw] xsmall:min-h-[20vh] small:min-w-[30vw] small:min-h-[23vh] medium:min-[30vw] medium:min-h-[25vh] large:min-w-[25vw] large:h-[25vh] xlarge:min-w-[23vw] xlarge:min-h-[25vh] 2xlarge:min-w-[22vw] 2xlarge:min-h-[25vh]"
                      src={`https://www.youtube.com/embed/${movie.trailerKey}?&mute=1`}
                      title="YouTube video player"
                      allow="picture-in-picture"
                    ></iframe>
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                        <Play className="w-6 h-6 text-white" />
                        <span className="text-white text-sm">Watch Now</span>
                      </div>
                    </div>
                  </div>

                  {/* Title Card */}
                  <div className="mt-4 transform transition-all duration-300 group-hover:translate-y-1">
                    <Link className="block">
                      <h1 className="text-[5vw] xsmall:text-[4vw] small:text-[3vw] medium:text-[2vw] large:text-[1.7vw] xlarge:text-[1.5vw] 2xlarge:text-[1.3vw] font-bold bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-500 text-transparent bg-clip-text hover:from-yellow-400 hover:to-yellow-600 transition-all duration-300">
                        {movie.name}
                      </h1>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SixthContainer;