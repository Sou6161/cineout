import { IoSearchCircleSharp } from "react-icons/io5";
import { useState } from "react";

const Searchtab = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="relative flex items-center space-x-2 ">
      <div className={`absolute right-[15vw] mt-5 mx-auto max-w-lg py-2 px-[1vw] rounded-full bg-purple-60 border flex focus-within:border-gray-300 transition-all duration-500 ease-in-out transform ${isOpen ? ' translate-x-0 bg-cyan-600 visible opacity-100 ' : 'translate-x-20  opacity-0 invisible overflow-x-hidden'}`}>
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
        className={`relative top-2 right-[2vw] text-[2.9vw] cursor-pointer transition-all duration-500 ease-in-out ${
          isOpen ? "text-lime-400" : "text-red-700"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      />

      <div className="relative">
        <button
          id="dropdownInformationButton"
          data-dropdown-toggle="dropdownInformation"
          class=" relative top-3 text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px- py- text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <img
            className=" rounded-full hover:border-[1.5px] hover:border-yellow-400 w-[2.5vw] h-[5vh]"
            src="https://www.denofgeek.com/wp-content/uploads/2020/11/webstory-deadpool-image06.jpg?fit=1170%2C780"
            alt=""
          />{" "}
          <svg
            class="w-2.5 h-2.5 ms-3 hover:text-lime-400"
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
            <div>Bonnie Green</div>
            <div class="font-medium truncate">name@flowbite.com</div>
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
          <div class="py-2">
            <a
              href="#"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Sign out
            </a>
          </div>
        </div>
      </div>

      <div className="">
        <input
          className=" relative group "
          onClick={() => setMenuOpen(!isMenuOpen)}
          type="checkbox"
          role="button"
          aria-label="Display the menu"
          class=" menu w-8"
        />
        <div
          className={`absolute top-[8.5vh] border-b-2 rounded-l-lg border-l-2 border-t-2 border-teal-400 right-0 z-50 w-[30vw] h-[92vh] bg-slate-500 transition-transform duration-500 ease-in-out transform ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Your content here */}
        </div>
      </div>
    </div>
  );
};

export default Searchtab;
