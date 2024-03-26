import React from "react";

const Top10data = ({ finalweekdata }) => {
  return (
    <>
      <div className=" w-[100vw] text-white -mt-[3vh]">
        <h1 className=" text-[3.2vh] px-5 mb-[4vh] ml-2 ">
          Top <span className=" text-red-600 font-bold ">10</span> on{" "}
          <span className=" text-yellow-500 font-bold">CINEOUT</span> this{" "}
          <span className=" text-violet-400 font-bold">week</span>
        </h1>
      </div>
      <div className=" bg-black w-[100vw] scrollbar-hide overflow-auto">
        <div className=" ml-3 flex gap-4  w-[100vw] h-[47vh] overflow-y-scroll no-scrollbar">
          {finalweekdata &&
            finalweekdata.map((item, index) => (
              <div key={index}>   
                <div
                  className=" mr-4  ml-3 min-w-[15vw] max-h-[38vh] rounded-[10px] p-2 overflow-x-hidden scrollbar-hide cursor-pointer bg-zinc-700 hover:bg-slate-500 "
                >
                  <img
                    className=" w-[30vw] h-[36vh] rounded-md drop-shadow-glow"
                    src={item?.primaryImage?.imageUrl}
                    alt=""
                  />
                </div>
                <div className=" ">
                  <h1 className=" text-2xl font-semibold text-yellow-500 mt-3  ml-4 ">
                    {item?.titleText?.text}
                  </h1>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Top10data;
