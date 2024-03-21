import React from "react";
import logo from "../Utils/headerlogo.png";

const Leftheader = () => {
  return (
    <div className=" ml-[40px]">
      <div className=" w-[10vw] mt-4 cursor-pointer">
        <img src={logo} alt="no image" />
      </div>
    </div>
  );
};

export default Leftheader;
