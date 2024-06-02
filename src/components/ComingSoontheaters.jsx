import React from 'react'
import { FaArrowRight } from 'react-icons/fa';
import { TbMinusVertical } from 'react-icons/tb';
import { Link } from 'react-router-dom';

const ComingSoontheaters = ({finalcomingsoonmoviestheaters}) => {
  return (
    <>
        <div className="w-[100vw]  scrollbar-hide overflow-auto p-5">
          <div className=" mb-10 items-center gap-[47%] overflow-y-clip   ">
            <h1 className=" text-3xl ml-4 font-semibold text-lime-400 flex">
              <Link to="/coming-soon">
                <span className=" inline-block -translate-x-6 translate-y-10 text-[6vh] text-yellow-400">
                  <TbMinusVertical />
                </span>
                <button className=" group flex items-center -translate-y-2 ml-4 ">
                  Coming Soon To Theaters
                  <span className="block relative top-1 ml-4 hover:text-purple-900 group-hover:text-purple-900">
                    <FaArrowRight />
                  </span>
                </button>{" "}
              </Link>
            </h1>
          </div>
        </div>
        <div className=" w-[100vw] h-[55vh]  scrollbar-hide overflow-x-auto overflow-y-hidden  mb-[8vh] -mt-2 bg-yellow-20">
          <div className=" ml-3 flex gap-10  w-[100vw] h-[47vh]  no-scrollbar ">
            {/* {finalcomingsoonmoviestheaters && console.log(finalcomingsoonmoviestheaters)} */}
            {finalcomingsoonmoviestheaters &&
              finalcomingsoonmoviestheaters.map((movie, index) => {
                if (
                  movie.poster_path &&
                  movie.original_title || movie.title&&
                  movie.poster_path !== "N/A" &&
                  movie.original_title !== "N/A"
                ) {
                  return (
                    <div key={index}>
                      <div className="  mr-4  ml-3 min-w-[15vw] glow3 max-h-[42vh] rounded-[10px] p-2 overflow-x-hidden scrollbar-hide cursor-pointer bg-zinc-70  bg-slate-400  hover:bg-slate-500 overflow-y-auto">
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
                        <h1 className=" text-2xl font-semibold text-yellow-500   ml-4 mt-5 ">
                          {movie.original_title}
                        </h1>
                      </div>
                    </div>
                  );
                }
              })}
          </div>
        </div>
      </>
  )
}

export default ComingSoontheaters