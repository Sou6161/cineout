import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { GrAnnounce } from "react-icons/gr";

import { FaFire } from "react-icons/fa";





const Nowshowingdata = ({ nowfinal }) => {

    // const d = useSelector((store) => store.nowshowingit?.nowshowit)



    return (
        <div className=" w-full h-[60vh]" style={{
            background: `url(https://image.tmdb.org/t/p/original/${nowfinal.backdrop_path})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: "no-repeat",
            backgroundPositionY: '0vh,60vw'
        }}>
            <h1 className=" text-4xl w-[70%] mb-3 hover:text-purple-200 hover:font-serif inline  text-white font-bold relative top-[28vh] left-[20vh]">{nowfinal.name ||
                nowfinal.title ||
                nowfinal.original_name ||
                nowfinal.original_title}
            </h1>

            <p className=" w-[70%]text-xl text-yellow-300 w-1/3 mb-2 font-black relative top-[30vh] left-[20vh]">{nowfinal.overview.slice(0, 200)}....<Link className=" text-blue-700 hover:underline">more</Link></p>

            <div className=" relative top-[30vh] left-[20vh]">
                <p className=" text-lg text-white flex gap-3 items-center">
                    <GrAnnounce className=" text-cyan-500 text-2xl" /> {nowfinal.release_date || "No Information"}
                    <FaFire className=" text-red-700 text-2xl" />{nowfinal.popularity || "No Information"}
                </p>

            </div>
            <Link className=" p-2 relative bg-orange-700 rounded-md top-[27vh] left-[55vh] hover:underline hover:bg-emerald-500 text-zinc-950   font-bold text-lg ">Watch Trailer</Link>
        </div>
    )
}
export default Nowshowingdata; 