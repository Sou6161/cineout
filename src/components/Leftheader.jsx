import React from "react";
import logo from "../Utils/headerlogo.png";
import { Link } from "react-router-dom";

const Leftheader = () => {
  return (
    <div className=" ml-[40px]">
      <Link to="/home">
      <div className=" w-[10vw] mt-4 cursor-pointer">
        <img src={logo} alt="no image" />
      </div>
      </Link>
    </div>
  );
};

export default Leftheader;
