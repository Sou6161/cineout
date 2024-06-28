import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GrAnnounce } from "react-icons/gr";

import { FaFire } from "react-icons/fa";
import Header from "./Header";
import { useEffect } from "react";

const Nowshowingdata = ({ nowfinal }) => {
  // const d = useSelector((store) => store.nowshowingit?.nowshowit)

  return (
    <>
      <div className=" pt-12 -mt-12">
        <Header />
      </div>
      <div
        className=" w-[100vw] h-[70vh] "
        style={{
          background: `url(https://image.tmdb.org/t/p/original/${nowfinal.backdrop_path})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPositionY: "0vh,60vw",
        }}
      >
        <h1 className=" text-3xl w-[10%] mb-3  inline  text-sky-600 font-bold relative top-[38vh] left-[10vh]">
          {nowfinal.name ||
            nowfinal.title ||
            nowfinal.original_name ||
            nowfinal.original_title}
        </h1>

        <p className="text-lg text-fuchsia-500   font-semibold w-1/4 mb-2 relative top-[40vh] left-[10vh]">
          {nowfinal.overview.slice(0, 200)}....
          <Link to={`/title/tt${nowfinal.id}`} className=" text-blue-700 hover:underline">
            more
          </Link>
        </p>

        <div className=" relative top-[40vh] left-[10vh]">
          <p className=" text-lg text-lime-500 font-semibold flex gap-3 items-center">
            <GrAnnounce className=" text-yellow-400 text-3xl" />{" "}
            {nowfinal.first_air_date || nowfinal.release_date || "No Information"}
            <FaFire className=" text-orange-500 text-3xl" />
            {nowfinal.popularity || "No Information"}
          </p>
        </div>
        <Link to={`/title/tt${nowfinal.id}`} role="trailerbtn" className=" golden-button trailerbtn p-2 relative bg-orange-700 rounded-md top-[29vh] left-[85%] hover:underline hover:bg-emerald-500 text-zinc-950   font-bold text-lg ">
         <span className=" golden-text">Watch Trailer</span> 
        </Link> 
      </div>
    </>
  );
};
export default Nowshowingdata;
