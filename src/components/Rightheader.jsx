import React from "react";
import { Link } from "react-router-dom";

const Rightheader = () => {
  return (
    <div className="  flex items-center justify-around ">
      <div className="links flex  text-red-600 ">
        <div className=" flex  font-roboto-black-italic small:gap-10 text-lime-400 hidden medium:block medium:flex medium:gap-3 medium:relative  medium:right-[5vw] large:right-[10vw] xlarge:right-[13vw] 2xlarge:gap-8  ">
          <h1 className=" fonty medium:text-[2vw] large:text-[1.7vw] xlarge:text-[1.3vw] 2xlarge:text-[1.2vw]">News</h1>
          <h1 className="fonty medium:text-[2vw] large:text-[1.7vw] xlarge:text-[1.3vw] 2xlarge:text-[1.2vw] ">Movies</h1>
          <h1 className=" fonty medium:text-[2vw] large:text-[1.7vw] xlarge:text-[1.3vw] 2xlarge:text-[1.2vw]">TvShows</h1>
          <h1 className=" fonty medium:text-[2vw] large:text-[1.7vw] xlarge:text-[1.3vw] 2xlarge:text-[1.2vw]">Watchlist</h1>
        </div>
      </div>
    </div>
  );
};

export default Rightheader;
