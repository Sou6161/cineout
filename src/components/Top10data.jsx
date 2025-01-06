import React from "react";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';

const Top10data = ({ finalweekdata }) => {
  if (!finalweekdata) return null;

  return (
    <div className="h-[57vh] bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-black via-slate-900 to-black p-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[5px] opacity-50">
        </div>
      </div>

      {/* Content container with glass effect */}
      <div className="relative z-10">
        <div className="">
          <div className="flex items-center justify-between mb-8">
            <div className="relative">
              <h1 className="text-xl small:text-[3.5vw] medium:text-[3vw] large:text-[2.5vw] xlarge:text-[2vw] 2xlarge:text-[1.5vw] font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-red-500 to-purple-500">
                Top 10 on CINEOUT this week
              </h1>
              <div className="h-1 w-32 bg-gradient-to-r from-yellow-400 via-red-500 to-purple-500 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>

          <div className="w-full overflow-x-auto overflow-y-hidden scrollbar-hide">
            <div className="flex px-5 gap-6 pb-4 py-4">
              {finalweekdata.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  transition={{ duration: 0.3 }}
                  className="relative group"
                >
                  <div className="relative w-[48vw] xsmall:w-[34vw] small:w-[25vw] medium:w-[22vw] large:w-[18vw] xlarge:w-[15vw] 2xlarge:w-[14vw]">
                    {/* Card glass effect background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-xl backdro-blur-sm border border-white/10 group-hover:border-white/20 transition-all duration-300"></div>
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/90 via-red-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                    
                    {/* Rank number */}
                    <div className="absolute -left-4 -top-4 w-12 h-12 bg-gradient-to-br from-yellow-400 to-red-500 rounded-full flex items-center justify-center z-20">
                      <span className="text-white font-bold text-xl">{index + 1}</span>
                    </div>
                    
                    {/* Image */}
                    <img
                      className="w-full h-[40vh] object-cover rounded-xl shadow-[0_0_15px_rgba(234,179,8,0.3)] group-hover:shadow-[0_0_25px_rgba(234,179,8,0.5)] transition-all duration-300"
                      src={item?.primaryImage?.imageUrl}
                      alt={item?.titleText?.text}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://www.prokerala.com/movies/assets/img/no-poster-available.jpg";
                      }}
                    />

                    {/* Title overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h2 className="text-white font-semibold text-[4vw] xsmall:text-[3vw] small:text-[2.5vw] medium:text-[2vw] large:text-[1.5vw] xlarge:text-[1.2vw] 2xlarge:text-[1vw] line-clamp-2 drop-shadow-lg">
                        {item?.titleText?.text}
                      </h2>
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="absolute top-2 right-2 w-8 h-8 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm"></div>
                    <div className="absolute bottom-2 left-2 w-12 h-1 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Top10data;