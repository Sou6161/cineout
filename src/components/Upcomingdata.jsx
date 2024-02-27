
import React from 'react'
import { Link } from 'react-router-dom'
import Dropdown from './Dropdown'

const Upcomingdata = ({ nowupcomingfinal, func }) => {
    return (
        <div className=' w-[300vh] scrollbar-hide overflow-auto bg-black p-5 '>

            <div className=' mb-10 flex items-center gap-[47%]'>
                <h1 className=' text-3xl ml-4 font-semibold text-red-700'>

                    Upcoming Movies

                </h1>
                {/* <Dropdown title="filter" options={["tv","movie","all"]}/> */}

            </div>

            <div className=' flex gap-4  w-[100vw] h-[500px] scrollbar-hide overflow-auto'>

                {nowupcomingfinal.map((item, index) => (
                    <> <div className=' bg-slate-900 hover:bg-teal-500 mr-4  ml-3 min-w-[15%] rounded-xl p-5'>

                        <img key={index} className=' w-[30vw] h-[30vh] rounded '
                            src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                            alt=""
                        />


                        <div className=' hover:text-black'>
                            <h1 className=' text-2xl font-semibold text-emerald-700 mt-2  '>
                                {item.title || item.original_name || item.original_title}

                            </h1>

                            <p className=' mt-4 text-purple-400 text-lg hover:text-black '>
                                {item.overview.slice(0, 100)}
                                <span className=' text-amber-600'>....</span><Link className=' hover:underline hover:text-fuchsia-950'>more</Link>
                            </p>
                        </div>
                    </div>
                    </>
                ))}

            </div>


        </div>
    )
}

export default Upcomingdata