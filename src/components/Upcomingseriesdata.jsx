import React from 'react'
import { Link } from 'react-router-dom'

const Upcomingseriesdata = ({ nowupcomingseries }) => {
  if (nowupcomingseries === null) return
  return (

    <div className='  w-[300vw] mt-10  scrollbar-hide overflow-auto p-5 bg-black'>

      <div className=' mb-10 flex items-center gap-[47%]'>
        <h1 className=' text-3xl ml-4 font-semibold text-red-700'>

          Upcoming Tv Shows

        </h1>


      </div>

      <div className=" w-[97vw] mx-  h-[55vh]  scrollbar-hide overflow-x-auto overflow-y-hidden  mb-[8vh] -mt-2 bg-yellow-20">
          <div className=" ml-3 flex gap-10  w-[100vw] h-[47vh]  no-scrollbar ">
            {/* {finalcomingsoonmoviestheaters && console.log(finalcomingsoonmoviestheaters)} */}
            {/* {console.log(nowupcomingseries)} */}
            {nowupcomingseries &&
              nowupcomingseries.map((movie, index) => {
                {
                  return (
                    <div key={index}>
                      <Link to={`/name/nm${movie.id}`}>
                      <div className="  mr-4  ml- mt-4  min-w-[15vw] glow3 max-h-[42vh] overflow-y-hidden rounded-[10px] p-2 overflow-x-hidden scrollbar-hide cursor-pointer bg-zinc-70  bg-slate-400  hover:bg-slate-500 ">
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
                          {movie.name}
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
  )


}

export default Upcomingseriesdata;