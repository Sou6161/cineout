import { useEffect, useState } from "react";
// import { addcomingsoonpage } from "../Reduxstore/Comingsoonpageslice";
import { API_OPTIONS } from "../constants/Apioptions";
import Header from "./Header";

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
  <div>
    <Header />
  </div>
  <div className="custom-scroll w-full h-[45vh] small:h-[50vh] medium:h-[55vh] large:h-[62vh] backdrop-blur-[10vh] bg-black no-scrollbar overflow-x-hidden">
    <div
      className="w-[93vw] h-[31.3vh] mx-auto bg-amber-400 rounded-sm mt-[12vh]
          xsmall:w-[94vw] xsmall:h-[33vh]
          small:w-[96vw] small:h-[36vh]
          medium:w-[90vw] medium:h-[42vh]
          large:w-[85vw] large:h-[45vh]
          xlarge:w-[80vw] xlarge:h-[47vh]
          2xlarge:w-[75vw] 2xlarge:h-[48vh] p-1"
    >
      <div className="w-full h-full relative no-scrollbar">
        <div
          className="w-full h-full absolute inset-0"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${randomMovie?.poster_path})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPositionY:"-15vh"
          }}
        ></div>
      </div>
    </div>
  </div>

  <div
    className="w-full object-cover flex flex-col min-h-screen"
    style={{
      backgroundImage:
        "url('https://c4.wallpaperflare.com/wallpaper/566/514/449/marvel-cinematic-universe-marvel-comics-iron-man-spider-man-wallpaper-preview.jpg')",
      backgroundPosition: "center",
    }}
  >
    <div className="w-full h-full bg-[rgba(63,56,56,0.1)] backdrop-blur-md flex-grow">
      <div className="w-full h-full text-center py-10">
        <h2
          className="text-[7vw] font-bold text-black
                 xsmall:text-3xl
                 small:text-2xl
                 medium:text-3xl
                 large:text-4xl"
        >
          Upcoming Releases
        </h2>
      </div>

      <div className="flex flex-wrap gap-5 justify-center overflow-x-auto no-scrollbar pt-">
        {comingsoonpage &&
          comingsoonpage.map((movie, index) => {
            if (
              (movie.poster_path && movie.original_title) ||
              (movie.title &&
                movie.poster_path !== "N/A" &&
                movie.original_title !== "N/A")
            ) {
              return (
                <div key={index} className=" ">
                  <div
                    className="w-full max-w-[90vw] h-[36vh] aspect-[2/3] rounded-[10px] p-1 cursor-pointer bg-yellow-500 hover:bg-slate-500
xsmall:max-w-[35vw] xsmall:min-h-[40vh]
small:max-w-[30vw] small:min-h-[40vh]
medium:max-w-[26vw] medium:min-h-[45vh]
large:max-w-[22vw] large:min-h-[45vh]
xlarge:max-w-[18vw] xlarge:h-[48vh]
2xlarge:max-w-[30vw] 2xlarge:min-h-[40vh]"
                  >
                    <img
                      className="w-full h-full object-cover object-center rounded-md drop-shadow-glow"
                      src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                      alt="no image available"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://www.prokerala.com/movies/assets/img/no-poster-available.jpg";
                      }}
                    />
                  </div>
                  <div
                    className="w-[40vw] whitespace-nowrap
                          xsmall:w-[40vw]
                          small:w-[35vw]
                          medium:w-[30vw]
                          large:w-[25vw]
                          xlarge:w-[20vw]
                          2xlarge:w-[15vw]"
                  >
                    <h1
                      className="ml-2 text-[5vw] font-semibold text-yellow-500 mt-3 mb-[2vh] whitespace-normal overflow-hidden
                           xsmall:text-lg
                           small:text-xl
                           medium:text-2xl
                           large:text-2xl"
                    >
                      {movie.original_title}
                    </h1>
                  </div>
                </div>
              );
            }
          })}
      </div>
      <div className="flex justify-center mt-5 mb-4">
        <button
          className="relative inline-block px-2 py-2 font-medium group mr-5 rounded-lg"
          disabled={page === 10}
          onClick={nextpage}
        >
          <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform rounded-lg translate-x-1 translate-y-1 bg-amber-500 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
          <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black rounded-lg"></span>
          <span className="relative text-black group-hover:text-white whitespace-nowrap">
            Next Page
          </span>
        </button>
        <button
          className="relative inline-block px-2 py-2 font-medium group rounded-lg"
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
      <div className="text-center pb-4">
        {page === 10 && (
          <h2 className="text-lg font-semibold text-purple-400">
            You have reached the end of the page
          </h2>
        )}
      </div>
    </div>
  </div>
</>
  );
};
export default Comingsooninside;
