import React from "react";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';

const Upcomingdata = ({
  nowupcomingfinal,
  nowupcomingmovies,
  nowupcomingmoviesdetails,
}) => {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-black via-slate-900 to-black p-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[5px] opacity-50">
          {/* <div className="absolute top-[40%] left-[20%] w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div> */}
          {/* <div className="absolute top-[30%] right-[20%] w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-75"></div> */}
          {/* <div className="absolute bottom-[30%] left-[30%] w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-150"></div> */}
        </div>
      </div>

      {/* Content container with glass effect */}
      <div className="relative z-10">
        {/* Now Showing Section */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-8">
            <div className="relative">
              <h1 className="text-xl small:text-[3.5vw] medium:text-[3vw] large:text-[2.5vw] xlarge:text-[2vw] 2xlarge:text-[1.5vw] font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500">
                Now Showing Movies
              </h1>
              <div className="h-1 w-32 bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>

          <div className="w-full overflow-x-auto overflow-y-hidden scrollbar-hide">
            <div className="flex gap-6 pb-4 py-4 ">
              {nowupcomingfinal?.map((movie, index) => (
                <Link key={index} to={`/name/movie/${movie.id}`}>
                  <motion.div
                    whileHover={{ scale: 1.05, rotateY: 5 }}
                    transition={{ duration: 0.3 }}
                    className="relative group"
                  >
                    <div className="relative  w-[48vw] xsmall:w-[34vw] small:w-[25vw] medium:w-[22vw] large:w-[18vw] xlarge:w-[15vw] 2xlarge:w-[14vw]">
                      {/* Card glass effect background */}
                      <div className="absolute  inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-xl backdro-blur-sm border border-white/10 group-hover:border-white/20 transition-all duration-300"></div>
                      
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-700/60  to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                      
                      {/* Image */}
                      <img
                        className="w-full h-[40vh] px-1 bg-purple-500 object-cover rounded-xl shadow-[0_0_15px_rgba(167,139,250,0.3)] group-hover:shadow-[0_0_25px_rgba(167,139,250,0.5)] transition-all duration-300"
                        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                        alt={movie.title}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://www.prokerala.com/movies/assets/img/no-poster-available.jpg";
                        }}
                      />

                      {/* Movie details overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <h2 className="text-white font-semibold text-[4vw] xsmall:text-[3vw] small:text-[2.5vw] medium:text-[2vw] large:text-[1.5vw] xlarge:text-[1.2vw] 2xlarge:text-[1vw] line-clamp-2 drop-shadow-lg">
                          {movie.title}
                        </h2>
                      </div>
                      
                      {/* Decorative elements */}
                      <div className="absolute top-2 right-2 w-8 h-8 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm"></div>
                      <div className="absolute bottom-2 left-2 w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Movies Section */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <div className="relative">
              <h1 className="text-xl small:text-[3.5vw] medium:text-[3vw] large:text-[2.5vw] xlarge:text-[2vw] 2xlarge:text-[1.5vw] font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
                Upcoming Movies
              </h1>
              <div className="h-1 w-32 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>

          <div className="w-full overflow-x-auto overflow-y-hidden scrollbar-hide">
            <div className="flex gap-6 py-4 pb-4">
              {nowupcomingmoviesdetails?.map((movie, index) => (
                <Link key={index} to={`/name/movie/${movie.id}`}>
                  <motion.div
                    whileHover={{ scale: 1.05, rotateY: -5 }}
                    transition={{ duration: 0.3 }}
                    className="relative group"
                  >
                    <div className="relative w-[48vw] xsmall:w-[34vw] small:w-[25vw] medium:w-[22vw] large:w-[18vw] xlarge:w-[15vw] 2xlarge:w-[14vw]">
                      {/* Card glass effect background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-xl backdrp-blur-sm border border-white/10 group-hover:border-white/20 transition-all duration-300"></div>
                      
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                      
                      {/* Image */}
                      <img
                        className="w-full h-[40vh] px-1  bg-purple-500 object-cover rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.3)] group-hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-all duration-300"
                        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                        alt={movie.title}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://www.prokerala.com/movies/assets/img/no-poster-available.jpg";
                        }}
                      />

                      {/* Movie details overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <h2 className="text-white font-semibold text-[4vw] xsmall:text-[3vw] small:text-[2.5vw] medium:text-[2vw] large:text-[1.5vw] xlarge:text-[1.2vw] 2xlarge:text-[1vw] line-clamp-2 drop-shadow-lg">
                          {movie.title}
                        </h2>
                      </div>
                      
                      {/* Decorative elements */}
                      <div className="absolute top-2 right-2 w-8 h-8 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm"></div>
                      <div className="absolute bottom-2 left-2 w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upcomingdata;