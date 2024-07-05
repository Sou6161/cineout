import React from "react";
import logo from "../Utils/headerlogo.png";
import { Link } from "react-router-dom";

const Leftheader = () => {
  return (
    <div className="ml-4 small:ml-3 medium:ml-3 large:ml-3">
      <Link to="/home">
        <div className="w-[100px] small:w-[90px] medium:w-[100px] large:w-[110px] xlarge:w-[120px] 2xlarge:w-[130px] 3xlarge:w-[150px] mt-4 cursor-pointer">
          <img src={logo} alt="Logo" className="w-full h-auto" />
        </div>
      </Link>
    </div>
  );
};

export default Leftheader;
