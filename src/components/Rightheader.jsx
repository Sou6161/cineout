import React from "react";
import { Link } from "react-router-dom";

const Rightheader = () => {
  return (
    <div className=" mr-[12vw]  flex items-center justify-around ">
      <div className="links flex gap-10  text-red-600 ">
        <div className=" flex gap-10 font-roboto-black-italic text-lime-400 ">
          <h1 className=" fonty">News</h1>
          <h1 className="fonty ">Movies</h1>
          <h1 className=" fonty">TvShows</h1>
          <h1 className=" fonty">Watchlist</h1>
        </div>
      </div>
    </div>
  );
};

export default Rightheader;
