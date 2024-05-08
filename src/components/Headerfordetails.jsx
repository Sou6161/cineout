import React from "react";
import logo from "../Utils/headerlogo.png";
import logo2 from "../Utils/headerlogo4_processed.png"
import { Link } from "react-router-dom";
import Searchtabfordetails from "./Searchtabfordetails";

const Headerfordetails = () => {
  return (
    <>
      <div className=" ">
        <div className=" cursor-pointer">
          <img className=" w-[5vw] rel] ml-5  " src={logo2} alt="no image" />
        </div>

        <div className="  flex items-center justify-between absolute left-[35vw] top-[3vh]">
          <div className="links flex gap-8 font-serif text-xl font-extrabold text-red-600">
            {["SIGN UP", "NEWS", "ABOUT", "LANG"].map((item, index) => {
              return <Link key={index}>{item}</Link>;
            })}
          </div>
          <div className=" text-3xl cursor-pointer ml-[5vw] text-white">
          </div>
        </div>
        <div className=" absolute left-[85vw] top-2">
          <Searchtabfordetails />
        </div>
      </div>
    </>
  );
};

export default Headerfordetails;
