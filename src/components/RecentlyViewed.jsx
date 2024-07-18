import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { clearRecentlyVieweddata } from "../Reduxstore/RecentlyViewedSlice";

const RecentlyViewed = () => {
  const recentlyViewed = useSelector(
    (state) => state.RecentlyViewedData.recentlyviewedataa
  );

  const dispatch = useDispatch();
  const clearRecentlyViewed = () => {
    dispatch(clearRecentlyVieweddata());
  };

  // Filter unique items based on data.id
  const uniqueRecentlyViewed = recentlyViewed.filter(
    (item, index, self) => index === self.findIndex((t) => t.id === item.id)
  );
  {
    console.log(uniqueRecentlyViewed);
  }
  return (
    <>
      <div className="mb-[3vw] bg-red-30 mt-[7vw] ml-[2vw] xsmall:ml-[2vw] small:ml-[2vw] medium:ml-[2vw] large:ml-[2vw] xlarge:ml-[2vw] 2xlarge:ml-[2vw] inline-block">
        <div className=" bg-red-300 h-0 text-[6vw] xsmall:text-[4.5vw] small:text-[3.5vw] medium:text-[3vw] large:text-[2.2vw] xlarge:text-[1.9vw] 2xlarge:text-[1.7vw] text-red-600 bg-red-30 font-semibold ml-10">
          Recently Viewed
          <span className="inline-block text-[6vw] xsmall:text-[4vw] small:text-[3vw] medium:text-[2.7vw] large:text-[2vw] xlarge:text-[1.5vw] text-yellow-400  relative top-[.5vh] right-[52vw] xsmall:right-[38vw] small:right-[30vw] medium:right-[26vw] large:right-[19vw] xlarge:right-[16.5vw] 2xlarge:right-[14.5vw]">
            {" "}
            <FaEye />
          </span>
          <div className="  relative  left-[65vw] bottom-[7vw] 2xlarge:bottom-[1vw]">
            <button className="Deletebutton" onClick={clearRecentlyViewed}>
              <svg viewBox="0 0 448 512" className="DeletesvgIcon">
                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="w-[80vw] h-[60vh] relative left-[3.5vw] bg-lime-20 mb-5 border-b-2 border-red-600">
        <div className="w-[80vw] h-[60vh] relative left-[vw] bg-lime-20 mb-10 overflow-x-scroll no-scrollbar">
          <div className="flex gap-">
            {uniqueRecentlyViewed.length === 0 ? (
              <h1 className="text-[5vw] 2xlarge:text-[2vw] mt-20 relative right-[vw] text-white">
                You have no recently viewed pages
              </h1>
            ) : (
              uniqueRecentlyViewed.map((data) => (
                <div key={data.id} className="">
                  <img
                    className="max-w-[55vw] h-[45vh] object-center rounded-lg border-2 border-sky-400"
                    src={data?.primaryImage?.url}
                    alt=""
                  />
                  <h1 className="mt-5 ml-2 text-white xsmall:text-[4vw] small:text-[3vw] medium:text-[2vw] large:text-[1.7vw] xlarge:text-[1.5vw] 2xlarge:text-[1.3vw]">
                    {console.log(data?.titleText?.text)}
                    {data?.titleText?.text}
                  </h1>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RecentlyViewed;
