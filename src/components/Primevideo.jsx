import React from "react";

const Primevideo = ({ finalprimemovies }) => {
  // console.log(finalprimemovies, "finalprimemovies");

  return (
    <div className=" flex gap-4  w-[100vw] mt-5 overflow-y-hidden bg-lime-30 h-auto no-scrollbar">
      {finalprimemovies &&
        finalprimemovies.map((item, index) => (
          <>
            {" "}
            <div key={index} className=" mr-4  ml-3 min-w-[15vw] rounded-xl bg-red-30 relative top-2  p-4">
              <img
                className=" border-[3px] glow3 border-gray-600 hover:scale-105  w-[30vw] h-[40vh] rounded "
                src={item?.title?.primaryImage?.imageUrl}
                alt=""
              />

              <div className=" hover:text-black">
                <h1 className=" text-2xl font-semibold text-emerald-700 mt-5  ">
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

export default Primevideo;
