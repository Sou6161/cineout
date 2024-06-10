import React from "react";
import { Link } from "react-router-dom";

const Rightheader = () => {
  return (
    <div className=" mr-[12vw]  flex items-center justify-around ">
      <div className="links flex gap-10    font-['Ubuntu-Medium'] text-red-600 ">
        <div className=" flex gap-10">
          <h1>News</h1>
          <h1>Movies</h1>
          <h1>TvShows</h1>
          <h1>Watchlist</h1>
        </div>
      </div>
    </div>
  );
};

export default Rightheader;
