import React from "react";
import Headerfordetails from "./Headerfordetails";

const Discovermoviesfan = ({ finaldiscovermovies }) => {
  return (
    <>
      
      <div className=" scrollbar-hide ">
        {finaldiscovermovies && (
          <div
            className="  w-[90vw] h-[30vh] object-cover mx-auto relative top-[18vw] border-2 rounded-lg glow6   border-re-600  contrast-125  "
            style={{
              background: `url(https://image.tmdb.org/t/p/original/${finaldiscovermovies.backdrop_path})`,
              backgroundPosition: "center",
              backgroundSize: "100vw 15em",
              backgroundRepeat: "no-repeat",
              backgroundPositionY: "-2vh,0vw",
              backgroundPositionX: "0vh,0vw",
              
            }}
          ></div>
        )}
        
      </div>
    </>
  );
};

export default Discovermoviesfan;
