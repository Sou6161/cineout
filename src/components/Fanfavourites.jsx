import React from "react";
import { IoArrowForwardCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const Fanfavourites = ({ finalfanwatch }) => {
  return (
    <div className=" w-[300vw]  scrollbar-hide overflow-auto p-5 bg-black ">
      <div className=" mb-10 items-center gap-[47%] overflow-y-clip  ">
        <h1 className=" text-3xl ml-4 font-semibold text-violet-700 flex">
          <Link  to="/fan-favourites">
            <button className=" group flex items-center  ">
              What To Watch
              <span className="block relative top-1 ml-4 hover:text-emerald-500 group-hover:text-emerald-500">
                <IoArrowForwardCircleSharp />
              </span>
            </button>{" "}
          </Link>
        </h1>
        <h2 className=" text-slate-500 font-semibold px-4 py-1">
          This Week Movies And Series
        </h2>
        {/* <Dropdown title="filter" options={["tv","movie","all"]}/> */}
      </div>

      <div className=" flex gap-4  w-[100vw] h-[47vh] overflow-y-scroll no-scrollbar">
        {finalfanwatch &&
          finalfanwatch.map((item, index) => (
            <>
              <div
                key={index}
                className=" mr-4  ml-3 min-w-[15vw] max-h-[44vh] rounded-[10px] p-2 overflow-x-hidden scrollbar-hide cursor-pointer bg-zinc-700 hover:bg-slate-500 "
              >
                <img
                  className=" w-[30vw] h-[36vh] rounded-md drop-shadow-glow"
                  src={item?.primaryImage?.imageUrl}
                  alt=""
                />
                <div className="">
                  <h1 className=" text-2xl font-semibold text-yellow-500 mt-3 ">
                    {item?.titleText?.text}
                  </h1>
                </div>
              </div>
            </>
          ))}
      </div>
    </div>
  );
};

export default Fanfavourites;
