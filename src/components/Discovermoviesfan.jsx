import React from "react";
import Headerfordetails from "./Headerfordetails";

const Discovermoviesfan = ({ finaldiscovermovies }) => {
  return (
    <>
      
      <div className="  h-[65vh] z-10 bg-red-200  w-[100vw] scrollbar-hide overflow-auto ">
        {finaldiscovermovies && (
          <div
            className="  w-[100vw] h-[65vh] scroll  "
            style={{
              background: `url(https://image.tmdb.org/t/p/original/${finaldiscovermovies.backdrop_path})`,
              backgroundPosition: "center",
              backgroundSize: "100vw 60em",
              backgroundRepeat: "no-repeat",
              backgroundPositionY: "-12vh,0vw",
              backgroundPositionX: "0vh,0vw",
            }}
          ></div>
        )}
        
      </div>
    </>
  );
};

export default Discovermoviesfan;
