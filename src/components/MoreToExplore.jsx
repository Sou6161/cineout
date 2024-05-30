import { MdAlignVerticalCenter } from "react-icons/md";
import { TbArrowBigRightLinesFilled } from "react-icons/tb";
import { Link } from "react-router-dom";

const MoreToExplore = () => {
  return (
    
      <><div className=" text-[1.7vw] inline-block font-semibold text-black relative left-[55vw] bottom-[190vh]">
          <div className=" relative top-10 right-10 text-purple-500 text-[2.2vw]">
              <MdAlignVerticalCenter />
          </div>{" "}
          More To Explore
          <h1 className=" text-amber-600 mt-5">Charts</h1>
      </div><div className=" relative left-[55vw] bottom-[187vh] justify-between">
              <div>
                  <Link to="/charts/most-popular-movies">
                      {" "}
                      <div className=" text-black text-[1.3vw] font-bold flex group mb">
                          Most Popular Movies
                          <div className=" text-[1.7vw] relative top-2 ml-2 group-hover:text-red-700">
                              <TbArrowBigRightLinesFilled />
                          </div>
                      </div>
                      <div className=" text-[.9vw] font-small text-slate-600 mb-5">
                          As determined by CINEOUT users
                      </div>
                  </Link>
              </div>
              <div>
                  <Link>
                      <div className=" text-black text-[1.5vw] font-bold flex group mb">
                          CINEOUT Top 250 Movies
                          <div className=" text-[1.7vw] relative top-2 ml-2 group-hover:text-purple-700">
                              <TbArrowBigRightLinesFilled />
                          </div>
                      </div>
                      <div className=" text-[.9vw] font-small text-slate-600 mb-5">
                          As rated by regular CINEOUT voters.
                      </div>
                  </Link>
              </div>
              <div>
                  <Link>
                      <div className=" text-black text-[1.5vw] font-bold flex group mb">
                          Top Rated English Movies
                          <div className=" text-[1.7vw] relative top-2 ml-2 group-hover:text-yellow-400">
                              <TbArrowBigRightLinesFilled />
                          </div>
                      </div>
                      <div className=" text-[.9vw] font-small text-slate-600 mb-5">
                          English-language movies as rated by CINEOUT users
                      </div>
                  </Link>
              </div>
              <div>
                  <Link>
                      <div className=" text-black text-[1.5vw] font-bold flex group mb">
                          Most Popular TV Shows
                          <div className=" text-[1.7vw] relative top-2 ml-2 group-hover:text-cyan-500">
                              <TbArrowBigRightLinesFilled />
                          </div>
                      </div>
                      <div className=" text-[.9vw] font-small text-slate-600 mb-5">
                          As determined by CINEOUT users
                      </div>
                  </Link>
              </div>
              <div>
                  <Link>
                      <div className=" text-black text-[1.5vw] font-bold flex group mb">
                          Top 250 TV Shows
                          <div className=" text-[1.7vw] relative top-2 ml-2 group-hover:text-blue-700">
                              <TbArrowBigRightLinesFilled />
                          </div>
                      </div>
                      <div className=" text-[.9vw] font-small text-slate-600 mb-5">
                          Top 250 as rated by CINEOUT Users
                      </div>
                  </Link>
              </div>
              <div>
                  <Link>
                      <div className=" text-black text-[1.5vw] font-bold flex group mb">
                          Lowest Rated Movies
                          <div className=" text-[1.7vw] relative top-2 ml-2 group-hover:text-orange-400">
                              <TbArrowBigRightLinesFilled />
                          </div>
                      </div>
                      <div className=" text-[.9vw] font-small text-slate-600 mb-5">
                          Bottom 100 as voted by CINEOUT users
                      </div>
                  </Link>
              </div>
              <div>
                  <Link>
                      <div className=" text-black text-[1.5vw] font-bold flex group mb">
                          Most Popular Celebs
                          <div className=" text-[1.7vw] relative top-2 ml-2 group-hover:text-lime-500">
                              <TbArrowBigRightLinesFilled />
                          </div>
                      </div>
                      <div className=" text-[.9vw] font-small text-slate-600 mb-5">
                          As determined by CINEOUT users
                      </div>
                  </Link>
              </div>
          </div></>
    
  );
};

export default MoreToExplore;
