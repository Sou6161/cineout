import React from "react";
import { IoArrowForwardCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const Fanfavourites = ({ finalfanwatch }) => {
  return (
    <div className=" w-[300vw]  scrollbar-hide overflow-auto p-5 -mt-10  bg-black ">
      <div className=" mb-10 items-center gap-[47%] overflow-y-clip  ">
        <h1 className=" text-xl small:text-[3.5vw]  medium:text-[2.5vw] large:text-[2.5vw] xlarge:text-[2vw] 2xlarge:text-[1.5vw] ml-4 font-semibold text-violet-700 flex">
          {/* <Link to="/fan-favourites"> */}
            <button className=" group flex items-center  ">
              What To Watch
              {/* <span className="block relative top-1 ml-4 hover:text-emerald-500 group-hover:text-emerald-500">
                <IoArrowForwardCircleSharp />
              </span> */}
            </button>{" "}
          {/* </Link> */}
        </h1>
        <h2 className=" text-slate-600 text-[3vw] xsmall:text-[2.5vw] small:text-[2.5vw] medium:text-[1.5vw] large:text-[1.5vw] xlarge:text-[1.3vw] 2xlarge:text-[1vw] font-semibold px-4 py-1">
          This Week Movies And Series
        </h2>
        {/* <Dropdown title="filter" options={["tv","movie","all"]}/> */}
      </div>

      <div className="flex gap-4 w-[100vw] h-[52vh] overflow-y-scroll no-scrollbar">
        {finalfanwatch &&
          finalfanwatch.map((item, index) => (
            <div key={index} className="flex flex-col">
              <div className="mr-4 ml-3 max-w-[53vw] max-h-[42vh] xsmall:max-w-[40vw] small:max-w-[30vw] medium:max-w-[30vw] large:max-w-[25vw] xlarge:max-w-[20vw] 2xlarge:max-w-[15vw] rounded-[10px] p-2 overflow-x-hidden scrollbar-hide cursor-pointer bg-zinc-700 hover:bg-slate-500">
                <img
                  className="min-w-[49vw]  h-[40vh] xsmall:min-w-[34vw] small:min-w-[25vw]  medium:min-w-[22vw] large:min-w-[18vw] xlarge:min-w-[15vw] 2xlarge:min-w-[14vw] rounded-md drop-shadow-glow"
                  src={item?.primaryImage?.imageUrl}
                  alt=""
                />
              </div>
              <h1 className="text-[5vw] xsmall:text-[4vw] small:text-[3vw] medium:text-[2vw] large:text-[1.7vw] xlarge:text-[1.5vw] 2xlarge:text-[1.3vw] font-semibold text-yellow-500 mt-3 relative left-4 break-words  ">
                {item?.titleText?.text}
              </h1>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Fanfavourites;
