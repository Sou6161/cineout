import {
  IoEarthSharp,
  IoSearchCircleSharp,
  IoTvOutline,
} from "react-icons/io5";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdEmojiEvents, MdMovie } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { SlPeople } from "react-icons/sl";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../constants/Firebase";

const Searchtab = () => {
  const navigate = useNavigate();

  const user = useSelector((store) => store.user);
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPageRefreshed, setPageRefreshed] = useState(true);

  const HandleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/home");
      })
      .catch((error) => {
        navigate("/error");
      });
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

  return (
    <div className="relative flex items-center space-x-2 ">
      <div
        className={`absolute right-[15vw] mt-5 mx-auto max-w-lg py-2 px-[1vw] rounded-full bg-purple-60 border flex focus-within:border-gray-300 transition-all duration-500 ease-in-out transform ${
          isOpen
            ? " translate-x-0 bg-cyan-600 visible opacity-100 "
            : "translate-x-20  opacity-0 invisible overflow-x-hidden"
        }`}
      >
        {isOpen ? (
          <>
            <input
              type="text"
              placeholder="Search Movies,TV-Series"
              class=" w-[10vw] bg-slate-300 h-[4vh] rounded-full mr-2 focus:outline-none pr-4 font-semibold border-0 focus:ring-0 px- py- transition-all duration-500 ease-in-out"
              name="topic"
            />
            <button class="flex flex-row items-center justify-center min-w-[5vw] h-[4vh] px-4 rounded-full  tracking-wide   border disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-500 ease-in-out text-base bg-black text-white font-medium border-transparent py-1.5 -mr-3">
              Search
            </button>
          </>
        ) : null}
      </div>

      <IoSearchCircleSharp
        className={`relative top-2 right-[1vw] text-[3.5vw] cursor-pointer transition-all duration-500 ease-in-out ${
          isOpen ? "text-lime-400" : "text-red-700"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      />

      {!user ? (
        <div className="flex relative top-2">
          <Link
            to="/login"
            class="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group"
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
            <span class="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">
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
            class=" relative top-3 text-white focus:ring-[1px] focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px- py- text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <img
              className=" rounded-full hover:border-[1.5px] hover:border-yellow-400 w-[2.5vw] h-[5vh]"
              src="https://www.denofgeek.com/wp-content/uploads/2020/11/webstory-deadpool-image06.jpg?fit=1170%2C780"
              alt=""
            />{" "}
            <svg
              class="w-10 h-2.5 ms-3 text-red-700 hover:text-lime-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
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
            class={`absolute mt-3 right-[1vw] z-50 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 top-full ${
              isDropdownOpen ? "" : "hidden"
            }`}
          >
            <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
              <div>{user && user.displayName}</div>
              <div class="font-medium truncate">{user && user.email}</div>
            </div>
            <ul
              class="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownInformationButton"
            >
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Settings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Earnings
                </a>
              </li>
            </ul>
            {user && (
              <div class="py-2">
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    HandleSignOut();
                    window.location.reload();
                  }}
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
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
          className={`relative group menu w-8 ${
            isMenuOpen ? "ripple" : isPageRefreshed ? "" : "ripple-reverse"
          }`}
          onClick={() => setMenuOpen(!isMenuOpen)}
          type="checkbox"
          role="button"
          aria-label="Display the menu"
          style={{ zIndex: 9999 }} // yahan z-index add kiya gaya hai
        />
        <div
          className={`absolute -top-[0.4vh] -right-[0.8vw]  z-50 w-[101vw] h-[102vh] transition-transform duration-500 ease-in-out transform ${
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
                <span className="text-yellow-400 mr-2 relative top-2">
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
                <span className="text-yellow-400 mr-2 relative top-2">
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
                to="/chart/tvmeter"
                className=" relative bottom-[1.2vw] left-[44.5vw] text-[1vw] font-normal text-white hover:underline"
              >
                <h1 className="">Most Popular TV Shows</h1>
              </Link>
              <Link
                to="/chart/"
                className=" relative left-[44.5vw] text-[1vw] font-normal text-white hover:underline"
              >
                <h1 className=" ">Browse TV Shows by Genre</h1>
              </Link>
              <Link
                to="/chart/ "
                className=" relative top-[1vw] left-[44.5vw] text-[1vw] font-normal text-white hover:underline"
              >
                <h1 className=" ">TV News</h1>
              </Link>
              <h1 className=" flex relative bottom-[11.5vw] left-[65vw] font-bold text-cyan-400 text-[2vw]">
                <span className="text-yellow-400 mr-2 relative top-2">
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
                <span className=" relative bottom-3"> Celebs</span>
              </h1>
              <Link
                to="/chart/moviemeter"
                className=" w-[10vw] relative top-[8vw] left-[22.5vw] text-[1vw] font-normal text-white hover:underline"
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
