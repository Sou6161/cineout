import { ImNewspaper } from "react-icons/im";
import { Link } from "react-router-dom";
import { BiRightArrow } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { RapidoptionsDojo } from "../constants/Rapidoptions";
import { addMovieNewsSlice } from "../Reduxstore/MovieNewsSlice";
import { addTvNewsSlice } from "../Reduxstore/TvNewsSlice";
import { addCelebrityNewsSlice } from "../Reduxstore/CelebrityNewsSlice";

const MoreToRead = () => {
  const [MovieNews, setMovieNews] = useState(null);
  const [TVSeriesNews, setTVSeriesNews] = useState(null);
  const [CelebrityNews, setCelebrityNews] = useState(null);

  const dispatchMovieNews = useDispatch();
  const dispatchTvNews = useDispatch();
  const dispatchCelebrityNews = useDispatch();

  useEffect(() => {
    const getNews = async (category, setNews, dispatchNews, action) => {
      // Check if data is in local storage
      let data = localStorage.getItem(`${category}newsData`);
      if (data) {
        // Parse stored json if it was found
        data = JSON.parse(data);
      } else {
        // Otherwise, fetch data from API
        const response = await fetch(
          `https://imdb8.p.rapidapi.com/news/v2/get-by-category?category=TV&first=20`,
          RapidoptionsDojo
        );
        data = await response.json();
        // Save the data to local storage
        localStorage.setItem(
          `${category}newsData`,
          JSON.stringify(data?.data?.news?.edges)
        );
      }
      setNews(data);
      dispatchNews(action(data));
    };
    getNews("MOVIE", setMovieNews, dispatchMovieNews, addMovieNewsSlice);
    getNews("TV", setTVSeriesNews, dispatchTvNews, addTvNewsSlice);
    getNews("CELEBRITY", setCelebrityNews, dispatchCelebrityNews, addCelebrityNewsSlice);
  }, []);

  useEffect(() => {
    // MovieNews && console.log(MovieNews);
    // TVSeriesNews && console.log(TVSeriesNews);
    // CelebrityNews && console.log(CelebrityNews);
  }, [MovieNews, TVSeriesNews,CelebrityNews]);

  return (
    <div className=" w-[20vw] h-[80vh] bg-purple-30 mt-10 ml-10 relative top-[30vh] rounded-lg">
      <h1 className=" text-[2vw] font-semibold flex text-red-600 ">
        <ImNewspaper className=" text-emerald-600 relative mb-10 top-3 ml-2 mr-2" />
        More To Read
      </h1>
      <Link to="/news/movie">
        <div className=" group ">
          <h1 className=" px-2 group-hover: text-white text-[1.5vw] font-semibold relative ml-14 border-2  border-yellow-400 rounded-md inline-block glow">
            Movie News
          </h1>
          <BiRightArrow className="  group-hover:text-green-400 relative left-[13vw] bottom-[3.7vh] text-red-600 text-[1.5vw] font-semibold" />
        </div>
      </Link>

      <div className="rounded-lg w-[20vw] h-[80vh] border-2 px-2  bg-slate-600 border-white overflow-auto no-scrollbar">
        {MovieNews &&
          MovieNews.slice(0, 5).map((MNews, index) => {
            return (
              <div className="flex border-2 mb-[1.7vw]  border-purple-400 m-2 rounded-md">
                <img
                  className="w-[7vw] h-[14vh] px-2 py-2 rounded-lg object-center"
                  src={MNews?.node?.image?.url}
                  alt="no image"
                />
                <p className="relative bottom-19 text-white ml-2 w-[10vw]">
                  {MNews?.node?.articleTitle?.plainText}
                  <br />
                  <br />
                  <div className=" text-black font-semibold relative bottom-6">
                    <p className=" relative top-2 text-lime-500">{MNews?.node?.date.split("T")[0]}</p><br/>
                    <p className=" text-rose-500">{MNews?.node?.byline}</p>
                  </div>
                </p>
              </div>
            );
          })}
      </div>

      <Link to="/tv-series-news">
        <div className=" group mt-10 ">
          <h1 className=" group-hover: px-2 text-white text-[1.5vw] font-semibold relative ml-14 border-2  border-purple-400 rounded-md inline-block glow2">
            Tv/Series News
          </h1>
          <BiRightArrow className=" group-hover:text-green-400 relative left-[15vw] bottom-[3.7vh] text-red-600 text-[1.5vw] font-semibold" />
        </div>
      </Link>

      <div className="rounded-lg w-[20vw] h-[80vh] border-2 px-2  bg-slate-600 border-white overflow-auto no-scrollbar">
        {TVSeriesNews &&
          TVSeriesNews.slice(0, 5).map((TNews, index) => {
            return (
              <div className="flex border-2 mb-[1.7vw]  border-purple-400 m-2 rounded-md">
                <img
                  className="w-[7vw] h-[14vh] px-2 py-2 rounded-lg object-center"
                  src={TNews?.node?.image?.url}
                  alt="no image"
                />
                <p className="relative bottom-19 text-white ml-2 w-[10vw]">
                  {TNews?.node?.articleTitle?.plainText}
                  <br />
                  <br />
                  <div className=" text-black font-semibold relative bottom-6">
                    <p className=" relative top-2 text-lime-500">{TNews?.node?.date.split("T")[0]}</p><br/>
                    <p className=" text-rose-500">{TNews?.node?.byline}</p>
                  </div>
                </p>
              </div>
            );
          })}
      </div>
      <Link to="/news/celebrity">
        <div className=" group mt-10 ">
          <h1 className=" group-hover: px-2 text-white text-[1.5vw] font-semibold relative ml-14 border-2  border-sky-400 rounded-md inline-block glow3">
            Celebrity News
          </h1>
          <BiRightArrow className=" group-hover:text-green-400 relative left-[15vw] bottom-[3.7vh] text-red-600 text-[1.5vw] font-semibold" />
        </div>
      </Link>
      <div className="rounded-lg w-[20vw] h-[80vh] border-2 px-2  bg-slate-600 border-white overflow-auto no-scrollbar">
        {CelebrityNews &&
          CelebrityNews.slice(0, 5).map((CNews, index) => {
            return (
              <div className="flex border-2 mb-[1.7vw]  border-purple-400 m-2 rounded-md">
                <img
                  className="w-[7vw] h-[14vh] px-2 py-2 rounded-lg object-center"
                  src={CNews?.node?.image?.url}
                  alt="no image"
                />
                <p className="relative bottom-19 text-white ml-2 w-[10vw]">
                  {CNews?.node?.articleTitle?.plainText}
                  <br />
                  <br />
                  <div className=" text-black font-semibold relative bottom-6">
                    <p className=" relative top-2 text-lime-500">{CNews?.node?.date.split("T")[0]}</p><br/>
                    <p className=" text-rose-500">{CNews?.node?.byline}</p>
                  </div>
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MoreToRead;
