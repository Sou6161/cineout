import React from "react";
import Headerfordetails from "./Headerfordetails";

const Discovermoviesfan = ({ finaldiscovermovies }) => {
  return (
    <>
      
      <div className="  h-[65vh] z-10  bg-black  w-[100vw] scrollbar-hide ">
        {finaldiscovermovies && (
          <div
            className="  w-[95vw] mx-auto relative top-[5.5vw] border-2 rounded-lg glow   border-re-600 h-[65vh] contrast-125  "
            style={{
              background: `url(https://image.tmdb.org/t/p/original/${finaldiscovermovies.backdrop_path})`,
              backgroundPosition: "fill",
              backgroundSize: "100vw 66em",
              backgroundRepeat: "no-repeat",
              backgroundPositionY: "-26vh,0vw",
              backgroundPositionX: "0vh,0vw",
              
            }}
          ></div>
        )}
        
      </div>
    </>
  );
};

export default Discovermoviesfan;
