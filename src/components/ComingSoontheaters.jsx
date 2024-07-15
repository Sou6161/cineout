import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { TbMinusVertical } from "react-icons/tb";
import { Link } from "react-router-dom";

const ComingSoontheaters = ({ finalcomingsoonmoviestheaters }) => {
  return (
    <>
      <div className="w-[100vw]  scrollbar-hide overflow-auto p-5">
        <div className=" mb-10 items-center gap-[47%] overflow-y-clip   ">
          <h1 className=" text-xl ml-2 font-semibold text-lime-400 flex">
            <Link to="/coming-soon">
              <span className=" inline-block -translate-x-6 translate-y-10 text-[6vh] text-yellow-400">
                <TbMinusVertical />
              </span>
              <button className=" group flex items-center -translate-y- ml-4 ">
                Coming Soon To Theaters
                <span className="block relative top- ml-4 hover:text-purple-900 group-hover:text-purple-900">
                  <FaArrowRight />
                </span>
              </button>{" "}
            </Link>
          </h1>
        </div>
      </div>
      <div className=" w-[99vw] h-[55vh] ml-2  scrollbar-hide overflow-x-auto overflow-y-hidden  mb-[8vh] -mt-5 bg-yellow-20">
        <div className=" ml-3 flex gap-10  w-[100vw] h-[47vh]  no-scrollbar ">
          {/* {finalcomingsoonmoviestheaters && console.log(finalcomingsoonmoviestheaters)} */}
          {finalcomingsoonmoviestheaters &&
            finalcomingsoonmoviestheaters.map((movie, index) => {
              if (
                (movie.poster_path && movie.original_title) ||
                (movie.title &&
                  movie.poster_path !== "N/A" &&
                  movie.original_title !== "N/A")
              ) {
                return (
                  <div key={index} className=" bg-red-30">
                    <div className=" mr-4 ml-3 max-w-[52vw] max-h-[42vh] xsmall:max-w-[40vw] small:max-w-[30vw] medium:max-w-[30vw] large:max-w-[25vw] xlarge:max-w-[20vw] 2xlarge:max-w-[15vw] mt-5 glow3  rounded-[10px] p-2 overflow-x-hidden scrollbar-hide cursor-pointer bg-zinc-70 bg-slate-40 overflow-y-hidden">
                      <img
                        className=" min-w-[48vw]  h-[40vh] xsmall:min-w-[34vw] small:min-w-[25vw]  medium:min-w-[22vw] large:min-w-[18vw] xlarge:min-w-[15vw] 2xlarge:min-w-[14vw] rounded-md drop-shadow-glow"
                        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                        alt="no image available"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://www.prokerala.com/movies/assets/img/no-poster-available.jpg";
                        }}
                      />
                    </div>
                    <div className=" ">
                      <h1 className=" text-[5vw] xsmall:text-[4vw] small:text-[3vw] medium:text-[2vw] large:text-[1.7vw] xlarge:text-[1.5vw] 2xlarge:text-[1.3vw] font-semibold hover:underline hover:cursor-pointer text-yellow-500 ml-4 mt-5 ">
                        {movie.original_title}
                      </h1>
                    </div>
                  </div>
                );
              }
            })}
        </div>
      </div>
    </>
  );
};

export default ComingSoontheaters;
