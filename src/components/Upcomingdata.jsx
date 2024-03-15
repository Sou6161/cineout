
import React from 'react'
import { Link } from 'react-router-dom'
import Dropdown from './Dropdown'

const Upcomingdata = ({ nowupcomingfinal, func }) => {
    return (
        <div className='  scrollbar-hide overflow-auto p-5 bg-black '>

            <div className=' mb-10 flex items-center gap-[47%] overflow-y-clip'>
                <h1 className=' text-3xl ml-4 font-semibold text-red-700'>

                    Upcoming Movies

                </h1>
                {/* <Dropdown title="filter" options={["tv","movie","all"]}/> */}

            </div>

            <div className=' flex gap-4  h-[47vh] overflow-y-scroll no-scrollbar'>
                {nowupcomingfinal && nowupcomingfinal.map((item, index) => (
                    <>
                        <div key={index} className=' mr-4  ml-3 min-w-[15vw] max-h-[44vh] rounded-[10px] p-2 overflow-x-hidden scrollbar-hide cursor-pointer bg-zinc-700 hover:bg-slate-500 '>
                            <img className=' w-[30vw] h-[36vh] rounded-md drop-shadow-glow'
                                src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                                alt=""
                            />
                            <div className=''>
                                <h1 className=' text-2xl font-semibold text-yellow-500 mt-3 '>
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

export default Upcomingdata