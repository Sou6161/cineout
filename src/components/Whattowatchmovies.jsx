import React from 'react'
import Discovermoviesfan from './Discovermoviesfan';

const Whattowatchmovies = ({ finalwatchmovies }) => {
    return (
        <>
            <div className=' bg-black w-[100vw] scrollbar-hide overflow-auto'>

                <h1 className=' text-[5vh] font-bold text-green-200 mb-5 mx-[70vh]'>
                    What to Watch - <span className=' text-purple-500 font-bold text-[5vh]'>CINEOUT</span>
                </h1>

                <button class="relative inline-flex items-center justify-center p-0.5 mb-10 me-2 mx-[70vh] overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                    <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                     MOST POPULAR MOVIES
                    </span>
                </button>
                <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400">
                    <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    MOST POPULAR SERIES
                    </span>
                </button>

                <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
                    <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    TOP RATED
                    </span>
                </button>
            </div>
            
            <div className=' bg-black flex gap-4  w-[100vw] h-[47vh] overflow-y-scroll no-scrollbar '>

                {finalwatchmovies && finalwatchmovies.map((item, index) => (
                    <>  <div key={index} className='mr-4 ml-8 min-w-[15vw] max-h-[46vh] rounded-[10px] p-2 overflow-x-hidden scrollbar-hide cursor-pointer bg-zinc-700 hover:bg-slate-500'>

                        <img className='   w-[30vw] h-[37vh] rounded '
                            src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                            alt="no image" />


                        <div className=' '>
                            <h1 className=' text-2xl font-semibold text-emerald-700 mt-2  '>
                                {item.title || item.original_name || item.original_title}

                            </h1>
                        </div>
                    </div>
                    </>
                ))}

            </div>
        </>
    )

}

export default Whattowatchmovies;