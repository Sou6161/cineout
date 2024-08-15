import React from "react";
import { Link } from "react-router-dom";

const Upcomingseriesdata = ({ nowupcomingseries }) => {
  if (nowupcomingseries === null) return;
  return (
    <div className="  w-[300vw] mt-10  scrollbar-hide overflow-auto p-5 bg-black">
      <div className=" mb-10 flex items-center gap-[47%]">
        <h1 className="  text-xl small:text-[3.5vw]  medium:text-[3vw] large:text-[2.5vw] xlarge:text-[2vw] 2xlarge:text-[1.5vw] ml-4 font-semibold text-red-700">
          Upcoming Tv Shows
        </h1>
      </div>

      <div className=" w-[97vw] mx-  h-[55vh]  scrollbar-hide overflow-x-auto overflow-y-hidden  mb-[8vh] -mt-2 bg-yellow-20">
        <div className=" ml-3 flex gap-10  w-[100vw] h-[47vh]  no-scrollbar ">
          {/* {finalcomingsoonmoviestheaters && console.log(finalcomingsoonmoviestheaters)} */}
          {/* {console.log(nowupcomingseries)} */}
          {nowupcomingseries &&
            nowupcomingseries.map((movie3, index) => {
              {
                return (
                  <div key={index}>
                    <Link to={`/name/tv/nm${movie3.id}`}>
                      <div className="  mr-4  ml- mt-4  max-w-[52vw] max-h-[42vh] xsmall:max-w-[40vw] small:max-w-[30vw] medium:max-w-[30vw] large:max-w-[25vw] xlarge:max-w-[20vw] 2xlarge:max-w-[15vw] glow3  overflow-y-hidden rounded-[10px] p-2 overflow-x-hidden scrollbar-hide cursor-pointer bg-zinc-70  bg-black  hover:bg-slate-500 ">
                        <img
                          className=" min-w-[48vw]  h-[40vh] xsmall:min-w-[34vw] small:min-w-[25vw]  medium:min-w-[22vw] large:min-w-[18vw] xlarge:min-w-[15vw] 2xlarge:min-w-[14vw] rounded-md "
                          src={`https://image.tmdb.org/t/p/original/${movie3?.poster_path}`}
                          alt="no image available"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://www.prokerala.com/movies/assets/img/no-poster-available.jpg";
                          }}
                        />
                      </div>
                      <div className=" ">
                        <h1 className=" text-[5vw] xsmall:text-[4vw] small:text-[3vw] medium:text-[2vw] large:text-[1.7vw] xlarge:text-[1.5vw] 2xlarge:text-[1.3vw] font-semibold text-yellow-500   ml-2 mt-5 ">
                          {movie3?.name}
                        </h1>
                      </div>
                    </Link>
                  </div>
                );
              }
            })}
        </div>
      </div>
    </div>
  );
};

export default Upcomingseriesdata;
