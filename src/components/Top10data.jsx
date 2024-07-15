import React from "react";

const Top10data = ({ finalweekdata }) => {
  return (
    <>
      <div className=" w-[100vw] text-white mt-8">
        <h1 className=" text-xl small:text-[3.5vw]  medium:text-[2.5vw] large:text-[2.5vw] xlarge:text-[2vw] 2xlarge:text-[1.5vw] px-5 mb-[4vh] ml-2 ">
          <span className="glowText2">Top</span>{" "}
          <span className=" text-red-600 font-bold ">10</span>{" "}
          <span className=" glowText2 ">on</span>{" "}
          <span className=" text-yellow-500 font-bold">CINEOUT</span>{" "}
          <span className=" glowText2 ">this</span>{" "}
          <span className=" text-violet-400 font-bold">week</span>
        </h1>
      </div>
      <div className=" bg-black w-[100vw] h-auto scrollbar-hide overflow-auto">
        <div className=" ml-3 flex gap-4 overflow-y-hidden  w-[98vw] h-[60vh]  no-scrollbar">
          {finalweekdata &&
            finalweekdata.map((item, index) => (
              <div key={index} className=" relative top-5">
                <div className="  mr-4  ml-3 max-w-[52vw] max-h-[42vh] xsmall:max-w-[40vw] small:max-w-[30vw] medium:max-w-[30vw] large:max-w-[25vw] xlarge:max-w-[20vw] 2xlarge:max-w-[15vw] rounded-[10px] p-2 overflow-x-hidden scrollbar-hide cursor-pointer bg-black hover:bg-slate-500 glow3 ">
                  <img
                    className=" min-w-[48vw]  h-[40vh] xsmall:min-w-[34vw] small:min-w-[25vw]  medium:min-w-[22vw] large:min-w-[18vw] xlarge:min-w-[15vw] 2xlarge:min-w-[14vw] rounded-md "
                    src={item?.primaryImage?.imageUrl}
                    alt=""
                  />
                </div>
                <div className=" ">
                  <h1 className="text-[4.5vw] xsmall:text-[4vw] small:text-[3vw] medium:text-[2vw] large:text-[1.7vw] xlarge:text-[1.5vw] 2xlarge:text-[1.3vw] font-semibold text-yellow-500 mt-3  ml-5 ">
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
