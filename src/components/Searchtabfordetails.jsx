import React from 'react'

const Searchtabfordetails = () => {
  return (
    <div>
      <div className=' '>
        <form className="w-[40vw] mx-[18vw] -my-[5vh]">
          <label
            for="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4  text-red-700"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-2 ps-10 text-[2vh] text-gray-900  rounded-lg bg-gray-50 dark:bg-lime-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black font-semibold "
              placeholder="Search Movies,Series..."
              required
            />
            <button
              type="submit"
              className="text-white absolute end-[.8vh] bottom-[.3vh] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Searchtabfordetails