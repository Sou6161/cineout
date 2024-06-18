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
      <div className="  scrollbar-hide overflow-clip p-5 h-[67vh] ">
        <div className=" mb-10 flex items-center gap-[47%] overflow-y-clip">
          <h1 className=" text-3xl ml-3 font-semibold text-red-700">
            Now Showing Movies
          </h1>
          {/* <Dropdown title="filter" options={["tv","movie","all"]}/> */}
        </div>

        <div className=" w-[97vw] h-[55vh]  scrollbar-hide overflow-x-auto overflow-y-hidden  mb-[8vh] -mt-2 bg-yellow-20">
          <div className=" ml-3 flex gap-10  w-[100vw] h-[47vh]  no-scrollbar ">
            {/* {nowupcomingmovies &&console.log(nowupcomingmovies, "now upcoming movies ID")} */}
            {console.log(nowupcomingfinal, "now upcoming final")}
            {nowupcomingfinal &&
              nowupcomingfinal.map((movies, index) => {
                const movie = nowupcomingfinal[index];
                return (
                  <div key={index}>
                    <Link to={`/name/nm${movies.id}`}>
                      <div className="mr-4 ml-3 min-w-[15vw] mt-5 glow3 max-h-[42vh] rounded-[10px] p-2 overflow-x-hidden scrollbar-hide cursor-pointer bg-zinc-70 bg-slate-40 overflow-y-auto">
                        <img
                          className="w-[30vw] h-[40vh] rounded-md drop-shadow-glow"
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
                        <h1 className="text-2xl font-semibold hover:underline hover:cursor-pointer text-yellow-500 ml-4 mt-5 ">
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
      <div className=" w-[100vw] h-[58vh] bg-red-30">
        <div className=" mb-10 flex items-center gap-[47%] overflow-y-clip">
          <h1 className=" text-3xl ml-7 font-semibold text-red-700">
            Upcoming Movies
          </h1>
          {/* <Dropdown title="filter" options={["tv","movie","all"]}/> */}
        </div>

        <div className=" w-[97vw] mx-4  h-[55vh]  scrollbar-hide overflow-x-auto overflow-y-hidden  mb-[8vh] -mt-2 bg-yellow-20">
          <div className=" ml-3 flex gap-10  w-[100vw] h-[47vh]  no-scrollbar ">
            {/* {finalcomingsoonmoviestheaters && console.log(finalcomingsoonmoviestheaters)} */}
            {nowupcomingmoviesdetails &&
              nowupcomingmoviesdetails.map((movie, index) => {
                {
                  return (
                    <div key={index}>
                      <div className="  mr-4  ml-6 mt-4 min-w-[15vw] glow3 max-h-[42vh] rounded-[10px] p-2 overflow-x-hidden scrollbar-hide cursor-pointer bg-zinc-70  bg-slate-400  hover:bg-slate-500 overflow-y-auto">
                        <img
                          className=" w-[30vw] h-[40vh] rounded-md drop-shadow-glow"
                          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                          alt="no image available"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://www.prokerala.com/movies/assets/img/no-poster-available.jpg";
                          }}
                        />
                      </div>
                      <div className=" ">
                        <h1 className=" text-2xl font-semibold text-yellow-500   ml-7 mt-5 ">
                          {movie.title}
                        </h1>
                      </div>
                    </div>
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
