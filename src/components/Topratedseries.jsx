import React from "react";

const Topratedseries = ({ finaltopratedseries }) => {
  return (
    <div
      className=" bg-black flex gap-4 absolute top-[10vw]  w-[100vw] h-[200vh] overflow-y-scroll no-scrollbar "
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 5fr))",
        gridGap: "1rem",
      }}
    >
        {console.log(finaltopratedseries)}
      {finaltopratedseries &&
        finaltopratedseries.map((item, index) => (
          <>
            {" "}
            <div
              key={index}
              className="mr-4 ml-8 w-[15vw] max-h-[46vh] rounded-[10px] p-2 overflow-x-hidden scrollbar-hide cursor-pointer bg-zinc-700 hover:bg-slate-500"
            >
              <img
                className="   w-[30vw] h-[37vh] rounded "
                src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                alt="no image"
              />

              <div className=" ">
                <h1 className=" text-2xl font-semibold text-emerald-700 mt-2  ">
                  {item.name || item.original_name || item.original_title}
                </h1>
              </div>
            </div>
          </>
        ))}
    </div>
  );
};

export default Topratedseries;
