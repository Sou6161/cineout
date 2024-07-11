import React from "react";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";

const Upcomingdata = ({
  nowupcomingfinal,
  nowupcomingmovies,
  nowupcomingmoviesdetails,
}) => {
  return (
    <>
      <div className="  scrollbar-hide overflow-clip p-5 mb-5 h-[67vh] bg-red-40 ">
        <div className=" mb-4  inline-flex items-center small:h-[5vw]  bg-red-20  overflow-y-clip">
          <h1 className=" text-xl small:text-[3.5vw]  medium:text-[3vw] large:text-[2.5vw] xlarge:text-[2vw] 2xlarge:text-[1.5vw] ml-3  font-semibold text-red-700">
            Now Showing Movies
          </h1>
          {/* <Dropdown title="filter" options={["tv","movie","all"]}/> */}
        </div>

        <div className=" w-[97vw] min-h-[58vh] 2xlarge:w-[97vw]  scrollbar-hide overflow-x-auto overflow-y-hidden 2xlarge:-mt-6  bg-yellow-20">
          <div className=" ml-1 flex  gap-10  w-[100vw] h-[47vh] no-scrollbar ">
            {/* {nowupcomingmovies &&console.log(nowupcomingmovies, "now upcoming movies ID")} */}
            {/* {console.log(nowupcomingfinal, "now upcoming final")} */}
            {nowupcomingfinal &&
              nowupcomingfinal.map((movies, index) => {
                const movie = nowupcomingfinal[index];
                return (
                  <div key={index}>
                    <Link to={`/name/nm${movies.id}`}>
                      <div className="mr-4 ml-3 max-w-[52vw] max-h-[42vh] xsmall:max-w-[40vw] small:max-w-[30vw] medium:max-w-[30vw] large:max-w-[25vw] xlarge:max-w-[20vw] 2xlarge:max-w-[15vw] mt-5 glow3  rounded-[10px] p-2 overflow-x-hidden scrollbar-hide cursor-pointer bg-zinc-70 bg-slate-40 overflow-y-hidden">
                        <img
                          className="min-w-[48vw]  h-[40vh] xsmall:min-w-[34vw] small:min-w-[25vw]  medium:min-w-[22vw] large:min-w-[18vw] xlarge:min-w-[15vw] 2xlarge:min-w-[14vw] rounded-md drop-shadow-glow"
                          src={`https://image.tmdb.org/t/p/original/${movies.poster_path}`}
                          alt="no image available"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://www.prokerala.com/movies/assets/img/no-poster-available.jpg";
                          }}
                        />
                      </div>
                      <div className=" ">
                        <h1 className="text-[5vw] xsmall:text-[4vw] small:text-[3vw] medium:text-[2vw] large:text-[1.7vw] xlarge:text-[1.5vw] 2xlarge:text-[1.3vw] font-semibold hover:underline hover:cursor-pointer text-yellow-500 ml-4 mt-5 ">
                          {movie.title}
                        </h1>
                      </div>
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div className=" w-[100vw] h-[67vh]">
        <div className=" mb-5 flex items-center gap-[47%]">
          <h1 className=" text-xl small:text-[3.5vw]  medium:text-[3vw] large:text-[2.5vw] xlarge:text-[2vw] 2xlarge:text-[1.5vw] ml-7 font-semibold text-red-700">
            Upcoming Movies
          </h1>
        </div>

        <div className=" w-[97vw] mx-4  min-h-[60vh]  scrollbar-hide overflow-x-auto overflow-y-hidd">
          <div className=" ml-2 flex gap-10  w-[100vw] h-[47vh]  no-scrollbar ">
            {/* {nowupcomingmovies && console.log(nowupcomingmovies," UpcomingMoviesIMDBID Final")} */}
            {/* {nowupcomingmoviesdetails && console.log(nowupcomingmoviesdetails," UpcomingMoviesDetails Final")} */}


            {nowupcomingmoviesdetails && 
              nowupcomingmoviesdetails.map((movie2, index) => {
                {
                  return (
                    <Link to={`/name/nm${movie2.id}`}>
                    <div key={index}>
                      <div className="mr-4  ml-2 mt-5 max-w-[52vw] max-h-[42vh] xsmall:max-w-[40vw] small:max-w-[30vw] medium:max-w-[30vw] large:max-w-[25vw] xlarge:max-w-[20vw] 2xlarge:max-w-[15vw] overflow-y-hidden glow3 rounded-[10px] p-2 overflow-x-hidden scrollbar-hide cursor-pointer bg-zinc-70  bg-black  hover:bg-slate-500">
                        <img
                          className="min-w-[48vw]  h-[40vh] xsmall:min-w-[34vw] small:min-w-[25vw]  medium:min-w-[22vw] large:min-w-[18vw] xlarge:min-w-[15vw] 2xlarge:min-w-[14vw] rounded-md "
                          src={`https://image.tmdb.org/t/p/original/${movie2.poster_path}`}
                          alt="no image available"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://www.prokerala.com/movies/assets/img/no-poster-available.jpg";
                          }}
                        />
                      </div>
                      <div className=" ">
                        <h1 className=" text-[5vw] xsmall:text-[3.5vw] small:text-[3vw] medium:text-[2vw] large:text-[1.7vw] xlarge:text-[1.5vw] 2xlarge:text-[1.3vw] font-semibold text-yellow-500   ml-3 mt-5 ">
                          {movie2.title}
                        </h1>
                      </div>
                    </div>
                    </Link>
                  );
                }
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Upcomingdata;
