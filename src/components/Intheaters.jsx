import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { TbMinusVertical } from "react-icons/tb";

const Intheaters = ({ finallasttheaterdata }) => {

  const first15Movies = finallasttheaterdata ? finallasttheaterdata.slice(0, 15) : [];
  
  return (
    <>
      <div className=" w-[100vw] text-white -mt-[3vh]">
        <h1 className=" text-[3.2vh] px-5 mb-[4vh] ml-2 ">
          Explore <span className=" text-red-600 font-bold ">Movies</span> &{" "}
          <span className=" text-violet-400 font-bold ">TV shows</span>
        </h1>

        <div>
          <Link className=" flex" to="/In-theaters">
            <span className=" relative left-[.5vw] top-.5 flex">
              <TbMinusVertical className=" text-amber-500 text-[2.7vw] " />
            </span>
            
            <button className="group flex ">
              {" "}
              <h1 className=" flex items-center text-[3.5vh] font-medium text-white -px-[1vw] mb-[5vh]">
                In Theaters{" "}
                <span className=" inline-block h-[2.5vh] hover:text-indigo-700 group-hover:text-indigo-700  ml-5">
                  <FaArrowRight />
                </span>
              </h1>
            </button>
          </Link>
        </div>
      </div>
      {first15Movies && console.log(first15Movies)}
      <div className=" bg-yellow-200  w-[100vw] scrollbar-hide overflow-y-auto">
        <div className=" ml-3 flex gap-4  w-[100vw] h-[47vh] overflow-y-scroll no-scrollbar">
          {first15Movies &&
            first15Movies
              .filter((item) => item.Poster !== "N/A") // Filter out movies without posters
              .map((item, index) => (
                <div key={index}>
                  <div className=" mr-4  ml-3 min-w-[15vw] max-h-[38vh] rounded-[10px] p-2 overflow-x-hidden scrollbar-hide cursor-pointer bg-zinc-700 hover:bg-slate-500 ">
                    {item.Poster !== "N/A" && ( // Render img tag only when poster is available
                      <img
                        className=" w-[30vw] h-[36vh] rounded-md drop-shadow-glow"
                        src={item.Poster}
                        alt="no image available"
                      />
                    )}
                  </div>
                  <div className=" ">
                    <h1 className=" text-2xl font-semibold text-yellow-500 mt-3  ml-4 ">
                      {item.Title}
                    </h1>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </>
  );
};

export default Intheaters;
