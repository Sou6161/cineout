import React from "react";
import { Eye, Trash2, History, ArrowRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { clearRecentlyVieweddata } from "../Reduxstore/RecentlyViewedSlice";

const RecentlyViewed = () => {
  const recentlyViewed = useSelector(
    (state) => state.RecentlyViewedData.recentlyviewedataa
  );
  const dispatch = useDispatch();

  const uniqueRecentlyViewed = recentlyViewed.filter(
    (item, index, self) => index === self.findIndex((t) => t.id === item.id)
  );

  return (
    <div className="bg-gradient-to-b from-black via-blue-900/10 to-black py-12">
      <div className="max-w-8xl mx-5 px-4">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <History className="w-8 h-8 text-purple-500" />
              <Eye className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
              Recently Viewed
            </h1>
          </div>
          
          <button
            onClick={() => dispatch(clearRecentlyVieweddata())}
            className="group flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-all duration-300"
          >
            <Trash2 className="w-5 h-5 text-red-400 group-hover:text-red-300" />
            <span className="text-red-400 group-hover:text-red-300">Clear History</span>
          </button>
        </div>

        {/* Content Section */}
        <div className="relative">
          <div className="overflow-x-auto no-scrollbar">
            <div className="flex gap-6 pb-8">
              {uniqueRecentlyViewed.length === 0 ? (
                <div className="flex items-center justify-center w-full py-12 bg-gray-900/30 rounded-xl border border-gray-800">
                  <div className="text-center">
                    <Eye className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg">No recently viewed items</p>
                  </div>
                </div>
              ) : (
                uniqueRecentlyViewed.map((data) => (
                  <div key={data.id} className="group relative flex-shrink-0">
                    <div className="relative overflow-hidden rounded-xl transition-all duration-500 px-10">
                      <img
                        className="w-[15vw] h-[40vh] object-fill border-l-2 border-r-2 border-amber-400 rounded-lg transition-transform duration-500 group-hover:scale-110"
                        src={data?.primaryImage?.url}
                        alt={data?.titleText?.text}
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-8 right-4">
                          <p className="text-white text-lg font-bold mb-2">{data?.titleText?.text}</p>
                          <button className="flex items-center space-x-2 text-purple-400 hover:text-purple-300">
                            {/* <span>View Details</span> */}
                            {/* <ArrowRight className="w-4 h-4" /> */}
                          </button>
                        </div>
                      </div>

                      {/* Glowing Border */}
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur"></div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Gradient Edges */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black to-transparent pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};

export default RecentlyViewed;