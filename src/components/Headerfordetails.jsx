import React from "react";
import logo from "../Utils/headerlogo.png";
import Searchtab from "./Searchtab";
import { Link } from "react-router-dom";
import { RiMenuFoldLine } from "react-icons/ri";
import Searchtabfordetails from "./Searchtabfordetails";


const Headerfordetails = () => {
  return (
    <>
      <div className=" ">
        <div className=" cursor-pointer">
          <img className=" w-[8vw] -mt-[1.5vh]" src={logo} alt="no image" />
        </div>
        <Searchtabfordetails/>

        <div className="  flex items-center justify-between absolute left-[68vw] top-[2vh]">
            <div className="links flex gap-8 font-serif text-xl font-extrabold text-white">
            {["SIGN UP", "NEWS", "ABOUT","LANG"].map((item, index) =>{ return(<Link key={index}>{item}</Link>)})}
                
            </div>
            <div className=" text-3xl cursor-pointer ml-[5vw] text-white">
                <RiMenuFoldLine />
                </div>
        </div>
      </div>
    </>
  );
};

export default Headerfordetails;
