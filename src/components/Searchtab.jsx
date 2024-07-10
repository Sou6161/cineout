import { IoSearchCircleSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdMovie } from "react-icons/md";
import { IoTvOutline } from "react-icons/io5";
import { MdEmojiEvents } from "react-icons/md";
import { SlPeople } from "react-icons/sl";
import { FaRegEye } from "react-icons/fa";
import { IoEarthSharp } from "react-icons/io5";
import { SearchButtonAPI } from "../constants/SearchButtonAPI";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../constants/Firebase";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../Reduxstore/UserSlice";

const Searchtab = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const [hasReloaded, setHasReloaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPageRefreshed, setPageRefreshed] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [isInputEmpty, setIsInputEmpty] = useState(true); // Add this line
  const [hiddenByScroll, setHiddenByScroll] = useState(false);
  const [SearchInputData, setSearchInputData] = useState(null);
  const [SearchDataID, setSearchDataID] = useState();

  const HandleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/home");
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  const handleSearch = () => {
    // Add this function
    console.log(searchInput);
  };

  const handleInputChange = (e) => {
    // Modify this function
    setSearchInput(e.target.value);
    setIsInputEmpty(e.target.value === "");
  };

  const handleButtonClick = () => {
    // Your button click logic here

    // Set a flag in localStorage
    localStorage.setItem("reloadOnce", "true");
  };

  useEffect(() => {
    const navigationEntries = performance.getEntriesByType("navigation");

    // If there are any navigation entries and the type is 'reload', then the page was refreshed
    if (
      navigationEntries.length > 0 &&
      navigationEntries[0].type === "reload"
    ) {
      setPageRefreshed(true);
    }
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.overflowX = "clip";
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const visible = currentScrollPos < 2000; // Change this to the scroll position you want

      if (!visible) {
        setIsOpen(false);
        setSearchInput("");
        setIsInputEmpty(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const getSearchData = async () => {
      if (searchInput.trim() !== "") {
        // Add this condition
        try {
          const response = await fetch(
            `https://imdb8.p.rapidapi.com/auto-complete?q=${searchInput}`,
            SearchButtonAPI
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setSearchInputData({ d: data.d, q: data.q }); // Set the data in one state
          setSearchDataID(
            data.d.map((title) => {
              return title?.id;
            })
          );
        } catch (error) {
          console.error("Fetch or parsing error:", error);
        }
      }
    };

    getSearchData();
  }, [searchInput]); // Add searchInput as a dependency

  useEffect(() => {
    SearchInputData && console.log(SearchInputData);
  }, [SearchInputData]);

  useEffect(() => {
    SearchDataID && console.log(SearchDataID);
  }, [SearchDataID]);

  return (
    <div className="relative flex  items-cente space-x-2 ">
      <div
        className={`absolute  right-[49vw] xsmall:right-[35vw] xsmall:top-2 small:right-[27vw] small:top-1 medium:right-[24vw] top-1 medium:top-1 large:right-[18vw] xlarge:right-[18vw] large:top-2  2xlarge:top-1 2xlarge:right-[14vw] bg-black  mx-auto w-[51vw] xsmall:w-[62vw] small:w-[72vw] medium:w-[43vw] large:w-[45vw] xlarge:w-[43.2vw] 2xlarge:w-[36vw] py-1 px-[1vw] rounded-full bg-purple-60 border-2 flex focus-within:border-purple-600 transition-all duration-500 ease-in-out transform ${
          isOpen && !hiddenByScroll
            ? " translate-x-0 bg-gray-600 border-yellow-40 visible opacity-100  "
            : "translate-y-5  opacity-0 border-blue-600 invisible"
        }`}
      >
        {isOpen && !hiddenByScroll ? (
          <>
            <input
              type="text"
              placeholder="Search Movies,TV-Series,Actor,Actress"
              className=" w-[28vw] xsmall:w-[45vw] small:w-[58vw] medium:w-[30vw] large:w-[35vw] 2xlarge:w-[28vw] relative bg-slate-300 h-[4vh] small:h-[5vh] rounded-full mr-2 focus:outline-none pr-4 font-semibold border-2 focus:ring-0 px- py-  focus-within:border-blue-600 transition-all duration-500 ease-in-out"
              name="topic"
              onChange={(e) => {
                setSearchInput(e.target.value);
                handleInputChange(e);
              }}
            />
            <button
              className="flex flex-row items-center justify-center min-w-[5vw] h-[4vh] px-1  small:px-2 small:h-[5vh] medium:left-[1vw]  relative  rounded-full  tracking-wide   border disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-500 ease-in-out text-base bg-red-600 text-white font-medium border-transparent py-1.5 -mr-3"
              onClick={handleSearch}
            >
              Search
            </button>
            {!isInputEmpty && (
              <div className="max-w-[100vw] h-[94vh] p-2 z-99 bg-[#1F1F1F] overflow-hidden  rounded-l-lg absolute top-[10vw] -left-[0.5vw] xsmall:-left-[3.2vw] xsmall:top-[7.5vw] small:-left-[1.5vw] small:w-[80vw] small:top-[7vw] medium:top-[5.5vw] medium:w-[65vw] large:w-[65vw] large:top-[4.5vw] xlarge:w-[45.5vw] xlarge:top-[3.5vw] xlarge:left-[0vw] 2xlarge:w-[45vw] 2xlarge:top-[3vw]   ">
                {/* Add your content here */}
                <div className="rounded-l-lg max-w-[100vw] h-[85vh] small:w-[78vw] medium:w-[63.5vw] large:w-[63vw] xlarge:w-[44.4vw] bg-zinc-500 overflow-hidde overflow-y-scroll   ">
                  <div>
                    {SearchInputData &&
                      SearchInputData.d.slice(0, 5).map((data) => {
                        return (
                          <Link
                            to={`/head/hd${data?.id}/?q=${SearchInputData?.q}`}
                            className=" cursor-pointer"
                          >
                            <div className=" flex hover:bg-slate-600 border-t-[1px] hover:border-cyan-400  max-h-[55vw] xsmall:h-[30vw] small:h-[25vw] small:py-[2vw] medium:h-[20vw] medium:py-[2vw] large:max-h-[15vw] large:py-[2vw] xlarge:max-h-[13vw] xlarge:py-[2vw] 2xlarge:max-h-[10vw] 2xlarge:py-[1vw] py-[3.5vw] px-3  mt-    ">
                            
                              <img
                                className="max-w-[22vw] max-h-[16vh] xsmall:max-w-[17vw] xsmall:h-[17vh]  object-center flex rounded-lg mb-5 glow5 "
                                src={data?.i?.imageUrl}
                                alt=""
                              />

                              <div className="flex flex-col mx-5 -mt-1  ">
                                <h1 className=" text-white font-bold">
                                  {data?.l}
                                </h1>
                                <h1 className=" text-lime-400 font-normal">
                                  {data?.y}
                                </h1>
                                <h1 className=" text-orange-400 font-normal   ">
                                  {data?.s}
                                </h1>
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    <Link to={`/find/?q=${SearchInputData?.q}`}>
                      <h1 className=" w-[97vw] small:w-[76vw] medium:w-[62vw] large:w-[62vw] xlarge:w-[43.5vw] 2xlarge:w-[43.5vw] -mt-2  hover:bg-slate-600 relative top-2  border-t-[1px]">
                        <span className=" mx-3">
                          See All Results for{" "}
                          <span className=" text-red-600">
                            '{SearchInputData?.q}'
                          </span>{" "}
                        </span>
                      </h1>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : null}
      </div>

      <IoSearchCircleSharp
        className={`
    relative 
    cursor-pointer 
    transition-all 
    duration-500 
    ease-in-out 
    top-1
    text-[12vw]
    left-[6vw]
    xsmall:text-[9vw]
    xsmall:top
    small:left-[5.5vw]
    small:text-[8vw]
    small:top-1
    medium:text-[6vw]
    medium:left-[3.5vw]
    large:text-[5vw]
    large:left-[3.5vw]
    xlarge:text-[4vw]
    xlarge:left-[2vw]
    2xlarge:text-[3vw]
    
    
  
    
    ${isOpen ? "text-lime-400" : "text-red-700"}

  `}
        onClick={() => {
          setIsOpen(!isOpen);
          if (isOpen) {
            setSearchInput("");
            setIsInputEmpty(true);
          } else {
            setHiddenByScroll(false);
          }
        }}
      />

      {!user ? (
        <div className="flex relative top-2">
          <Link
            to="/login"
            // onClick={() => window.location.reload()} // Add this line
            class="relative inline-flex top-[0.vw] h-[7vw] left-[4vw] xsmall:top-0 xsmall:left-[5vw] small:h-[6vw] medium:left-[4vw] medium:w-[12vw] medium:h-[4vw]  medium:-top-0 large:top-0 large:left-[3vw] large:h-[3.5vw]  large:w-[9vw] xlarge:left-[2vw]  2xlarge:h-[2.5vw] 2xlarge:w-[7.5vw] 2xlarge:left-[2vw]  items-center justify-center  px-5 py-4 medium:-px-2  overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group"
          >
            <span class="absolute inset-0 flex items-center justify-center w-[4vw] h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </span>
            <span class="absolute flex items-center top-0  justify-center w-full h-full  large:rounded-full  text-purple-500  bg-white transition-all duration-300 transform group-hover:translate-x-full ease">
              Sign In
            </span>
            <span class="relative invisible w-[1vw] h-[1vw] px-5">Sign In</span>
          </Link>
        </div>
      ) : null}

      {user && (
        <div className="relative">
          <button
            id="dropdownInformationButton"
            data-dropdown-toggle="dropdownInformation"
            class=" relative top-3 text-white font-medium rounded-lg text-sm px- py- text-center inline-flex items-center"
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <img
              className=" rounded-full hover:border-[1.5px] hover:border-yellow-400 w-[2.5vw] h-[5vh]"
              src={user && user.photoURL}
              alt=""
            />{" "}
            <svg
              className="w-3 h-2.5 relative left-2 hover:text-lime-400"
              aria-hidden="true"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          <div
            id="dropdownInformation"
            class={`absolute mt-4 right-[1vw] z-50 bg-[#181717] divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 top-full ${
              isDropdownOpen ? "" : "hidden"
            }`}
          >
            <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
              <div className=" text-[1vw] font-semibold text-white">
                {user && user.displayName}
              </div>
              {/* <div class="font-medium truncate">{user && user.email}</div> */}
            </div>
            <ul
              class="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownInformationButton"
            >
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 text-[1vw] hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Your Activity
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 text-[1vw] hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Your Watchlist
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 text-[1vw] hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Your Ratings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 text-[1vw] hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Your Lists
                </a>
              </li>
            </ul>
            {user && (
              <div class="py-2 ">
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    HandleSignOut();
                    window.location.reload();
                  }}
                  href="#"
                  class="block px-4  py-2 text-[1vw] text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Sign out
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="">
        <input
          className={`relative group menu  xsmall:left-[2vw] xsmall:w-[6vw] small:w-[4.8vw] medium:w-[4vw] w-[8vw] large:left-[0.8vw] large:w-9 xlarge:left-[0.5vw] 2xlarge:left-[0.8vw]  ${
            isMenuOpen ? "ripple" : isPageRefreshed ? "" : "ripple-reverse"
          }`}
          onClick={() => setMenuOpen(!isMenuOpen)}
          type="checkbox"
          role="button"
          aria-label="Display the menu"
          style={{ zIndex: 9999 }} // yahan z-index add kiya gaya hai
        />
        <div
          className={`absolute -top-[1.7vh]  right-0 z-50 w-[100vw] h-[100vh] transition-transform duration-500 ease-in-out transform ${
            isMenuOpen
              ? "ripple translate-x-0"
              : isPageRefreshed
              ? ""
              : "ripple-reverse translate-x-0"
          }`}
          style={{ display: isMenuOpen ? "block" : "none" }}
        >
          {isMenuOpen && (
            <div className=" w-[100vw] h-[100vh] bg-red-10  ">
              <h1 className=" flex relative top-[7vw] left-[20vw] font-bold text-cyan-400 text-[2vw]">
                <span className="text-yellow-400 mr-2">
                  {" "}
                  <MdMovie />
                </span>
                Movies
              </h1>
              <Link
                onClick={handleButtonClick}
                to="/chart/top"
                className=" w-[7vw] relative top-[8vw] left-[22.5vw] text-[1vw] font-normal text-white hover:underline"
              >
                <h1 className="">Top 250 Movies</h1>
              </Link>
              <Link
                to="/chart/moviemeter"
                className=" w-[10vw] relative top-[9vw] left-[22.5vw] text-[1vw] font-normal text-white hover:underline"
              >
                <h1 className="">Most Popular Movies</h1>
              </Link>
              <Link
                to="/chart/boxoffice"
                className=" relative top-[10vw] left-[22.5vw] text-[1vw] font-normal text-white hover:underline"
              >
                <h1 className="  ">Top Box Office</h1>
              </Link>
              <Link
                to="/news/movie"
                className=" relative top-[11vw] left-[22.5vw] text-[1vw] font-normal text-white hover:underline"
              >
                <h1 className="  ">Movie News</h1>
              </Link>
              <Link
                to="/chart/india-spotlight"
                className=" relative top-[12vw] left-[22.5vw] text-[1vw] font-normal text-white hover:underline"
              >
                <h1 className="  ">India Movie Spotlight</h1>
              </Link>
              <h1 className=" flex relative bottom-[3vw] left-[42vw] font-bold text-cyan-400 text-[2vw]">
                <span className="text-yellow-400 mr-2">
                  {" "}
                  <IoTvOutline />
                </span>
                TV Shows
              </h1>
              <Link
                to="/chart/toptv"
                className="  inline-block relative bottom-[2.2vw] left-[44.5vw] text-[1vw] font-normal text-white hover:underline"
              >
                <h1 className="">Top 250 TV Shows</h1>
              </Link>
              <Link
                to="/chart/toptv"
                className=" relative bottom-[1.2vw] left-[44.5vw] text-[1vw] font-normal text-white hover:underline"
              >
                <h1 className="">Most Popular TV Shows</h1>
              </Link>
              <Link
                to="/chart/toptv"
                className=" relative left-[44.5vw] text-[1vw] font-normal text-white hover:underline"
              >
                <h1 className=" ">Browse TV Shows by Genre</h1>
              </Link>
              <Link
                to="/chart/toptv"
                className=" relative top-[1vw] left-[44.5vw] text-[1vw] font-normal text-white hover:underline"
              >
                <h1 className=" ">TV News</h1>
              </Link>
              <h1 className=" flex relative bottom-[11.5vw] left-[65vw] font-bold text-cyan-400 text-[2vw]">
                <span className="text-yellow-400 mr-2">
                  {" "}
                  <MdEmojiEvents />
                </span>
                Awards & Events
              </h1>
              <Link
                to="/chart/toptv"
                className="  inline-block relative bottom-[10.8vw] left-[67.4vw] text-[1vw] font-normal text-white hover:underline"
              >
                <h1 className="">Oscars Winners</h1>
              </Link>
              <Link
                to="/chart/toptv"
                className=" relative bottom-[9.8vw] left-[67.4vw] text-[1vw] font-normal text-white hover:underline"
              >
                <h1 className="">Emmy Winners</h1>
              </Link>
              <h1 className=" flex relative top-[8vw] left-[20vw] font-bold text-cyan-400 text-[2vw]">
                <span className="text-yellow-400 mr-2 text-[1.7vw]">
                  {" "}
                  <SlPeople />
                </span>
                Celebs
              </h1>
              <Link
                to="/chart/moviemeter"
                className=" w-[10vw] relative top-[9vw] left-[22.5vw] text-[1vw] font-normal text-white hover:underline"
              >
                <h1 className="">Born Today</h1>
              </Link>
              <Link
                to="/chart/moviemeter"
                className=" w-[10vw] relative top-[10vw] left-[22.5vw] text-[1vw] font-normal text-white hover:underline"
              >
                <h1 className="">Most Popular Celebs</h1>
              </Link>
              <Link
                to="/chart/moviemeter"
                className=" w-[10vw] relative top-[11vw] left-[22.5vw] text-[1vw] font-normal text-white hover:underline"
              >
                <h1 className="">Celebrity News</h1>
              </Link>
              <h1 className=" flex relative top-[1.5vw] left-[42vw] font-bold text-cyan-400 text-[2vw]">
                <span className="text-yellow-400 mr-2 text-[1.7vw]">
                  {" "}
                  <FaRegEye />
                </span>
                Watch
              </h1>
              <Link
                to="/chart/moviemeter"
                className=" w-[10vw] relative top-[2.4vw] left-[44.5vw] text-[1vw] font-normal text-white hover:underline"
              >
                <h1 className="">What To Watch</h1>
              </Link>
              <Link
                to="/chart/moviemeter"
                className=" w-[10vw] relative top-[3.4vw] left-[44.5vw] text-[1vw] font-normal text-white hover:underline"
              >
                <h1 className="">Latest Trailers</h1>
              </Link>
              <Link
                to="/chart/moviemeter"
                className=" w-[10vw] relative top-[4.4vw] left-[44.5vw] text-[1vw] font-normal text-white hover:underline"
              >
                <h1 className="">Born Today</h1>
              </Link>
              <h1 className=" flex relative bottom-[5vw] left-[65vw] font-bold text-cyan-400 text-[2vw]">
                <span className="text-yellow-400 mr-2 text-[1.7vw]">
                  {" "}
                  <IoEarthSharp />
                </span>
                Community
              </h1>
              <Link
                to="/chart/moviemeter"
                className=" w-[10vw] relative bottom-[4.2vw] left-[67.2vw] text-[1vw] font-normal text-white hover:underline"
              >
                <h1 className="">Help Center</h1>
              </Link>
              <Link
                to="/chart/moviemeter"
                className=" w-[10vw] relative bottom-[3.2vw] left-[67.2vw] text-[1vw] font-normal text-white hover:underline"
              >
                <h1 className="">Contributor Zone</h1>
              </Link>
              <Link
                to="/chart/moviemeter"
                className=" w-[10vw] relative bottom-[2.2vw] left-[67.2vw] text-[1vw] font-normal text-white hover:underline"
              >
                <h1 className="">Polls</h1>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Searchtab;
