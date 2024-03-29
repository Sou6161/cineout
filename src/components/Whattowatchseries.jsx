import React from "react";

const Whattowatchseries = ({ finalwatchseries }) => {
  return (
    <div className=" bg-black w-[100vw] scrollbar-hide overflow-auto">
      <div className=" ml-5 flex gap-4  w-[100vw] h-[47vh] overflow-y-scroll no-scrollbar">
        {finalwatchseries &&
          finalwatchseries.map((item, index) => (
            <>
              <div
                key={index}
                className=" mr-4  ml-3 min-w-[15vw] max-h-[44vh] rounded-[10px] p-2 overflow-x-hidden scrollbar-hide cursor-pointer bg-zinc-700 hover:bg-slate-500 "
              >
                <img
                  className=" w-[30vw] h-[36vh] rounded-md drop-shadow-glow"
                  src={item?.title?.primaryImage?.imageUrl}
                  alt=""
                />
                <div className="">
                  <h1 className=" text-2xl font-semibold text-yellow-500 mt-3 ">
                    {item?.title?.titleText?.text}
                  </h1>
                </div>
              </div>
            </>
          ))}
      </div>
    </div>
  );
};

export default Whattowatchseries;
