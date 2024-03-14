import React from 'react'
import { Link } from 'react-router-dom'

const Upcomingseriesdata = ({ nowupcomingseries }) => {
  if (nowupcomingseries === null) return
  return (

    <div className='  w-[300vw]  scrollbar-hide overflow-auto p-5 bg-black'>

      <div className=' mb-10 flex items-center gap-[47%]'>
        <h1 className=' text-3xl ml-4 font-semibold text-red-700'>

          Upcoming Tv Shows

        </h1>


      </div>

      <div className=' flex gap-4  w-[100vw] h-[47vh] overflow-y-scroll no-scrollbar '>

        { nowupcomingseries && nowupcomingseries.map((item, index) => (
          <>  <div key={index} className='mr-4  ml-3 min-w-[15vw] max-h-[46vh] rounded-[10px] p-2 overflow-x-hidden scrollbar-hide cursor-pointer bg-zinc-700 hover:bg-slate-500'>

            <img className='   w-[30vw] h-[37vh] rounded '
              src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
              alt="no image"
            />


            <div className=' '>
              <h1 className=' text-2xl font-semibold text-emerald-700 mt-2  '>
                {item.title || item.original_name || item.original_title}

              </h1>
            </div>
          </div>
          </>
        ))}

      </div>


    </div>
  )


}

export default Upcomingseriesdata;