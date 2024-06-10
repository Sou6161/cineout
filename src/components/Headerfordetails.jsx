import React, { useEffect, useState } from "react";
import { Events, animateScroll as scroll, scrollSpy } from "react-scroll";
import logo from "../Utils/headerlogo.png";
import logo2 from "../Utils/headerlogo4_processed.png";
import { Link } from "react-router-dom";
import Searchtabfordetails from "./Searchtabfordetails";
import Searchtab from "./Searchtab";


const Headerfordetails = () => {

  const [scrollPosition, setScrollPosition] = useState(0);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    Events.scrollEvent.register("begin", function () {
      console.log("begin", arguments);
    });

    Events.scrollEvent.register("end", function () {
      console.log("end", arguments);
    });

    scrollSpy.update();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      Events.scrollEvent.remove("begin");
      Events.scrollEvent.remove("end");
    };
  }, []);

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
    setLastScrollTop(position);
  };



  return (
    <>
      <div className=" relative bottom-2 border-b-[1px] border-gray-600" style={{
        backdropFilter:
          scrollPosition > 120
            ? `blur(${Math.min(scrollPosition, 20)}px) brightness(${Math.min(
                scrollPosition,
                90
              )}%) sepia(${Math.min(scrollPosition, 50)}%)`
            : "none",
        backgroundColor: "transparent",
        zIndex: 1000,
      }}>
        <div className=" cursor-pointer ">
          <img
            className=" w-[5vw] relative bottom- ml-5  "
            src={logo2}
            alt="no image"
          />
        </div>

        <div className="  flex items-center justify-between absolute left-[28vw] top-[4vh]">
          <div className="links flex gap-8 font-serif text-xl font-extrabold text-red-600">
            <div className=" flex gap-10">
              <h1>News</h1>
              <h1>Movies</h1>
              <h1>TvShows</h1>
              <h1>Watchlist</h1>
            </div>
          </div>
          <div className=" text-3xl cursor-pointer ml-[5vw] text-white"></div>
        </div>
        <div className=" absolute left-[88.2vw] bottom-[0.8vw]">
          <Searchtab />
        </div>
      </div>
    </>
  );
};

export default Headerfordetails;
