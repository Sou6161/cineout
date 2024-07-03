import React from "react";
import logo from "../Utils/headerlogo.png";
import { Link } from "react-router-dom";

const Leftheader = () => {
  return (
    <div className="ml-4 sm:ml-8 md:ml-12 lg:ml-[40px]">
      <Link to="/home">
        <div className="w-[120px] sm:w-[140px] md:w-[160px] lg:w-[180px] xl:w-[200px] max-w-[90vw] mt-4 cursor-pointer">
          <img src={logo} alt="Logo" className="w-full h-auto" />
        </div>
      </Link>
    </div>
  );
};

export default Leftheader;
