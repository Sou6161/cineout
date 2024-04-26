import { useEffect, useState } from "react";
// import { addcomingsoonpage } from "../Reduxstore/Comingsoonpageslice";
import { API_OPTIONS } from "../constants/Apioptions";

const Comingsooninside = () => {
  const [page, setpage] = useState(2);
  const [comingsoonpage, setcomingsoonpage] = useState(null);
  const [randomMovie, setRandomMovie] = useState(null);

  const fetchData = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`,
      API_OPTIONS
    );

    const data = await response.json();
    const finaldata = data.results;
    setcomingsoonpage(finaldata);
    // console.log(finaldata);
  };
  useEffect(() => {
    fetchData();
  }, [page]);

  const nextpage = () => {
    if (page <= 9) {
      setpage((prevPage) => prevPage + 1);
    } else {
      return null;
    }
  };

  const previouspage = () => {
    if (page != 2) {
      setpage((prevPage) => prevPage - 1);
    } else {
      return null;
    }
  };

  useEffect(() => {
    if (comingsoonpage && comingsoonpage.length > 0) {
      const randomIndex = Math.floor(Math.random() * comingsoonpage.length);
      setRandomMovie(comingsoonpage[randomIndex]);
    }
  }, [comingsoonpage]);

  return (
    <>
      <div className="custom-scroll w-[100vw] h-[55vh] -mt-2 backdrop-blur-[10vh] bg-black  no-scrollbar overflow-x-hidden">
        <div className=" w-[77.6vw] h-[53vh] mx-auto bg-red-500 rounded-sm mt-2  overflow-x-auto overflow-hidden">
          <div className=" w-[76.5vw] h-[51vh] mx-auto  relative top-2 no-scrollbar overflow-x-auto overflow-hidden">
            <div
              className=" w-full h-[52vh]"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${randomMovie?.poster_path})`,
                backgroundPosition: "center",
                backgroundSize: "100%,50%",
                backgroundRepeat: "no-repeat",
                backgroundPositionY: "-24vh,0vw",
              }}
            ></div>
          </div>
        </div>
      </div>

      <div
        className="w-[100vw] bg-cover"
        style={{
          backgroundImage:
            "url('https://c4.wallpaperflare.com/wallpaper/566/514/449/marvel-cinematic-universe-marvel-comics-iron-man-spider-man-wallpaper-preview.jpg')",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full h-full bg-[rgba(63,56,56,0.1)] backdrop-blur-md">
          <div className="w-full text-center py-4">
            <h2 className="text-4xl font-bold text-black">Upcoming Releases</h2>
          </div>

          <div className="flex flex-wrap gap-10 justify-center overflow-x-auto no-scrollbar pt-10  ">
            {comingsoonpage &&
              comingsoonpage.map((movie, index) => {
                if (
                  (movie.poster_path && movie.original_title) ||
                  (movie.title &&
                    movie.poster_path !== "N/A" &&
                    movie.original_title !== "N/A")
                ) {
                  return (
                    <div key={index} className="mr-4 ml-3">
                      <div className="w-[14vw] h-[40vh] rounded-[10px] p-1 cursor-pointer bg-yellow-500 hover:bg-slate-500">
                        <img
                          className="w-full h-full rounded-md drop-shadow-glow"
                          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                          alt="no image available"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://www.prokerala.com/movies/assets/img/no-poster-available.jpg";
                          }}
                        />
                      </div>
                      <div className="w-[14vw] overflow-wrap: break-word">
                        <h1 className="text-2xl font-semibold text-yellow-500 mt-3 mb-14 whitespace-normal overflow-hidden">
                          {movie.original_title}
                        </h1>
                      </div>
                    </div>
                  );
                }
              })}
          </div>
          <div className=" mx-[42vw] flex ">
            <button
              className="relative inline-block px-2 py-2 font-medium group mr-5 mb-5 rounded-lg"
              disabled={page === 10}
              onClick={nextpage}
            >
              <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform  rounded-lg translate-x-1 translate-y-1 bg-amber-500 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
              <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black rounded-lg"></span>
              <span className="relative text-black group-hover:text-white whitespace-nowrap">
                Next Page
              </span>
            </button>
            <button
              className="relative inline-block px-2 py-2 font-medium group mb-5  rounded-lg"
              disabled={page === 2}
              onClick={previouspage}
            >
              <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-cyan-400 rounded-lg group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
              <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black rounded-lg"></span>
              <span className="relative text-black group-hover:text-white whitespace-nowrap">
                Previous Page
              </span>
            </button>
          </div>
          <div  className=" mx-[40vw] relative bottom-2 ">
            {page === 10 && (
              <h2 className=" text-lg font-semibold text-purple-400">You have reached the end of the page</h2>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Comingsooninside;
