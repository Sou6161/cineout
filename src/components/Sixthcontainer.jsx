import React, { useEffect, useState } from "react";
import { API_OPTIONS } from "../constants/Apioptions";
import { TbHelicopter } from "react-icons/tb";
import { Link } from "react-router-dom";

const Sixthcontainer = () => {
  const [movies, setMovies] = useState([]);

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

  useEffect(() => {
    // movies && console.log(movies);
  }, [movies]);

  return (
    <>
      <div className="">
        <h2 className=" inline-block p-4 bg-red-30 text-xl text-sky-400  overflow-x-auto  mb-5 font-medium ">
          <span className=" text-[5vh]  text-cyan-300  font-semibold ml-5  ">
            U
          </span>
          pcoming <span className=" text-[5vh] text-cyan-300 ">T</span>railers
        </h2>
      </div>
      <h5 className=" ml-10 -mt-10 text-gray-600 mb-5 font-light text-[3.5vw] xsmall:text-[3vw] small:text-[2.5vw] medium:text-[1.5vw] large:text-[1.5vw] xlarge:text-[1.3vw] 2xlarge:text-[1vw]">
        Trailers for upcoming releases
      </h5>

      <div className=" w-[100vw] h-[40vh] bg-red-30 flex overflow-x-auto py-2 no-scrollbar mb-[8vh] ">
        <div className=" flex gap-16 ml-7">
          {movies.map((movie, index) => (
            <div key={index}>
              <iframe
                className=" max-w-[70vw] max-h-[20vh] xsmall:min-w-[30vw] xsmall:min-h-[20vh] small:min-w-[30vw] small:min-h-[23vh] medium:min-[30vw] medium:min-h-[25vh] large:min-w-[25vw] large:h-[25vh] xlarge:min-w-[23vw] xlarge:min-h-[25vh] 2xlarge:min-w-[22vw] 2xlarge:min-h-[25vh]   border-2 border-purple-600 rounded-lg"
                src={`https://www.youtube.com/embed/${movie.trailerKey}?&mute=1`}
                title="YouTube video player"
                allow=" picture-in-picture"
              ></iframe>
              <div className=" text-[5vw] xsmall:text-[4vw] small:text-[3vw] medium:text-[2vw] large:text-[1.7vw] xlarge:text-[1.5vw] 2xlarge:text-[1.3vw] font-semibold hover:underline hover:cursor-pointer text-yellow-500 ml-4 mt-2">
                <Link className=" hover:underline hover:">
                  <h1>{movie.name}</h1>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sixthcontainer;
