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

  return (
    <>
      <div className="mb-[3vw] bg-red-30 inline-block">
        <div className="text-[2vw] text-red-600 bg-red-30 font-semibold ml-14">
          Recently Viewed
          <span className="inline-block text-[1.6vw] text-yellow-400 relative top-[.4vh] right-[17vw]">
            {" "}
            <FaEye />
          </span>
          <div className="  relative  left-[70vw]">
            <button className="Deletebutton" onClick={clearRecentlyViewed}>
              <svg viewBox="0 0 448 512" className="DeletesvgIcon">
                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="w-[80vw] h-[60vh] relative left-[3.5vw] bg-lime-20 mb-10">
        <div className="w-[80vw] h-[60vh] relative left-[3.5vw] bg-lime-20 mb-10">
          <div className="flex gap-10">
            {uniqueRecentlyViewed.length === 0 ? (
              <h1 className="text-[1.4vw] mt-20 relative right-[3vw] text-white">
                You have no recently viewed pages
              </h1>
            ) : (
              uniqueRecentlyViewed.map((data) => (
                <div key={data.id}>
                  <img
                    className="w-[14vw] h-[45vh] object-center rounded-lg border-2 border-sky-400"
                    src={data?.primaryImage?.url}
                    alt=""
                  />
                  <h1 className="mt-5 ml-2 text-[1.4vw]">
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
