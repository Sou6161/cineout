import { RiTiktokLine } from "react-icons/ri";
import { AiFillInstagram } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import { FiYoutube } from "react-icons/fi";
import { ImFacebook2 } from "react-icons/im";
import { Link } from "react-router-dom";
import { MdLaunch } from "react-icons/md";
import { useState, useEffect } from 'react';

const Footer = () => {
  return (
    <div className="w-[100vw]  relative xsmall:h-[72vh] small:h-[62vh] medium:h-[50vh] large:h-[60vh] flex flex-col items-center">
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 bg-gradiet-to-br from-black via-slate-900 to-black">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMC41IiBmaWxsPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiLz48L3N2Zz4=')] opacity-20"></div>
      </div>

      {/* Sign In Button */}
      <div className="relative z-10">
        <Link
          to="/login"
          onClick={() => window.location.reload()}
          className="relative w-[60vw] h-[7vh] xsmall:w-[40vw] small:w-[35vw] medium:w-[30vw] large:w-[30vw] xlarge:w-[25vw] 2xlarge:w-[25vw] mt-[8vw] inline-flex items-center justify-center overflow-hidden rounded-lg group"
        >
          <span className="relative px-6 py-3 bg-gradient-to-br from-red-500 to-orange-500 group-hover:from-red-500 group-hover:to-orange-400 text-white rounded-lg overflow-hidden transition-all duration-300 ease-out group-hover:scale-105 group-hover:ring-2 group-hover:ring-red-400">
            <span className="relative text-[4vw] xsmall:text-[3vw] small:text-[2.5vw] medium:text-[2vw] large:text-[1.7vw] xlarge:text-[1.4vw] 2xlarge:text-[1.1vw] font-bold text-nowrap">
              Sign In For More Access
            </span>
          </span>
        </Link>
      </div>

      {/* Social Media Section */}
      <div className="w-[95vw] h-[18vh] xsmall:w-[75vw] small:w-[55vw] medium:w-[45vw] large:w-[32vw] xlarge:w-[27vw] 2xlarge:w-[20vw] relative mt-10 2xlarge:mt-0 p-4">
        <h1 className="text-center mb-8">
          <span className="text-[4.5vw] xsmall:text-[3vw] small:text-[2.8vw] medium:text-[2vw] large:text-[1.5vw] xlarge:text-[1.4vw] 2xlarge:text-[1.2vw] text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 font-bold">
            Connect With CINEOUT
          </span>
        </h1>
        
        <div className="flex justify-center gap-6">
          {[
            { icon: AiFillInstagram, gradient: "from-purple-500 to-pink-500" },
            { icon: FaXTwitter, gradient: "from-blue-400 to-blue-600" },
            { icon: FiYoutube, gradient: "from-red-500 to-red-700" },
            { icon: RiTiktokLine, gradient: "from-purple-600 to-pink-600" },
            { icon: ImFacebook2, gradient: "from-blue-500 to-blue-700" }
          ].map((social, index) => (
            <button key={index} 
              className={`p-3 rounded-lg bg-gradient-to-br ${social.gradient} hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-white/10`}>
              <social.icon className="w-6 h-6 text-white" />
            </button>
          ))}
        </div>
      </div>

      {/* Footer Links */}
      <div className="flex flex-col items-center space-y-5 mt-5 2xlarge:mt-2 relative z-10">
        <div className="flex flex-wrap justify-center gap-6 w-[100vw] items-center small:flex-row small:flex-wrap xsmall:w-[90vw] small:w-[80vw] medium:w-[90vw] large:w-[60vw] xlarge:w-[60vw]">
          {[
            "Help", "Site Index", "CINEOUTPro", "Box Office Mojo", 
            "License Data", "Press Room", "Advertising", "Jobs",
            "Terms", "Privacy"
          ].map((text, index) => (
            <div key={index} className="group relative">
              <h1 className="text-[4vw] xsmall:text-[2.8vw] small:text-[2.5vw] medium:text-[2vw] large:text-[1.5vw] xlarge:text-[1.5vw] 2xlarge:text-[1.2vw] text-white/80 group-hover:text-white flex items-center cursor-pointer transition-colors duration-300">
                {text}
                {text !== "Press Room" && text !== "Terms" && text !== "Privacy" && (
                  <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <MdLaunch />
                  </span>
                )}
              </h1>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-orange-500 group-hover:w-full transition-all duration-300"></span>
            </div>
          ))}
        </div>

        <div className="w-full text-center mt-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/10 to-transparent animate-pulse"></div>
          <h1 className="text-[4vw] xsmall:text-[2.8vw] small:text-[2.5vw] medium:text-[2vw] large:text-[1.5vw] xlarge:text-[1.5vw] 2xlarge:text-[1.2vw] font-bold text-white relative">
            Made With <span className="text-red-500">♥</span> By a Cinephile
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Footer;