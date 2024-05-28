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
              movies.push({ name, trailerKey: Trailerkeys, trailerName: TrailerNames });
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
        <h2 className=" text-[2vw] text-red-600 overflow-x-auto ml-8 mb-5 font-medium ">
          <span className=" text-[5vh] text-cyan-300 font-semibold  ">U</span>
          pcoming <span className=" text-[5vh] text-lime-600">T</span>railers
        </h2>
      </div>
      <h5 className=" ml-10 -mt-6 text-emerald-600 mb-5 font-light">
        Trailers for upcoming releases
      </h5>

      <div className=" w-[100vw] flex overflow-x-auto no-scrollbar mb-[8vh]">
        <div className=" flex gap-16 ml-7">
          {movies.map((movie, index) => (
            <div key={index}>
              <iframe
                className=" h-[25vh] border-2 border-purple-600 rounded-lg"
                width="350"
                height="200"
                src={`https://www.youtube.com/embed/${movie.trailerKey}?&mute=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></iframe>
              <div className=" text-[1.5vw] text-yellow-400 mx-5">
                <Link className=" hover:underline hover:"><h1>{movie.name}</h1></Link> 
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sixthcontainer
