import React from "react";

const Starzvideos = ({ finalstarzmovies }) => {
  return (
    <div className=" flex gap-5  w-[92vw] xsmall:w-[94vw] small:w-[96vw] medium:w-[96vw] large:w-[97vw] xlarge:w-[98vw] 2xlarge:w-[97.5vw] h-[65vh] mt-5 overflow-y-hidden bg-lime-30  no-scrollbar">
      {finalstarzmovies &&
        finalstarzmovies.map((item, index) => (
          <>
            {" "}
            <div key={index} className=" mr-4 bg-black  ml-5 max-w-[52vw] max-h-[42vh] xsmall:max-w-[40vw] small:max-w-[30vw] medium:max-w-[30vw] large:max-w-[25vw] xlarge:max-w-[20vw] 2xlarge:max-w-[15vw] rounded-[10px] relative top-6  p-2 glow3">
              <img
                className="  rounded-md  min-w-[48vw]  h-[40vh] xsmall:min-w-[34vw] small:min-w-[25vw]  medium:min-w-[22vw] large:min-w-[18vw] xlarge:min-w-[15vw] 2xlarge:min-w-[14vw] "
                src={item?.title?.primaryImage?.imageUrl}
                alt=""
              />

              <div className=" hover:text-black">
                <h1 className=" text-[5vw] xsmall:text-[4vw] small:text-[3vw] medium:text-[2vw] large:text-[1.7vw] xlarge:text-[1.5vw] 2xlarge:text-[1.3vw] font-semibold text-yellow-500 mt-5   ">
                  {item?.title?.titleText?.text}
                </h1>
              </div>
              {/* <p className="text-black">Movie ID: {item.title.primaryImage.imageUrl}</p> */}
            </div>
          </>
        ))}
    </div>
  );
};

export default Starzvideos;
