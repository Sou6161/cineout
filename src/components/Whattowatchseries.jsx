import React from "react";

const Whattowatchseries = ({ finalwatchseries }) => {
  return (
    
    <div className="  w-[100vw] scrollbar-hide">
      {console.log(finalwatchseries)}
      <div
        className=" flex gap-4 absolute bg-black top-[10vw]  w-[100vw] h-[1030vh] overflow-y-scroll no-scrollbar"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 5fr))",
          gridGap: "1rem",
        }}
        >
        {finalwatchseries &&
          finalwatchseries.map((item, index) => (
            <>
              <div
                key={index}
                className=" mr-4  ml-3 w-[15vw] mb-10 max-h-[46vh] rounded-[10px] p-2 overflow-x-hidden scrollbar-hide cursor-pointe bg-zinc-700 hover:bg-slate-500 "
              >
                <img
                  className=" w-[30vw] h-[37vh] rounded-md drop-shadow-glow"
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
