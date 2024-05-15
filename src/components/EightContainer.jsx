import React, { useEffect, useState } from "react";
import { RapidoptionsDojo } from "../constants/Rapidoptions";
import { Link } from "react-router-dom";
import { IoArrowForwardOutline } from "react-icons/io5";
import { TbMinusVertical } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { addNewsSlice } from "../Reduxstore/NewsSlice";
import { RapidOptionsDetails, RapidOptionsDetailsDaimond } from "../constants/RapidOptionsForDetails";

const EightContainer = () => {
  const [Category, setCategory] = useState("TOP");
  const [Topnews, setTopnews] = useState(null);
  const [MovieNews, setMovieNews] = useState(null);
  const [TvNews, setTvNews] = useState(null);
  const [CelebrityNews, setCelebrityNews] = useState(null);

  const dispatchTopNews = useDispatch();

  useEffect(() => {
    const getNews = async () => {
      // Check if data is in local storage
      let data = localStorage.getItem("newsData");
      if (data) {
        // Parse stored json if it was found
        data = JSON.parse(data);
      } else {
        // Otherwise, fetch data from API
        const response = await fetch(
          `https://imdb8.p.rapidapi.com/news/v2/get-by-category?category=${Category}&first=20`,
          RapidOptionsDetailsDaimond
        );
        data = await response.json();
        // Save the data to local storage
        localStorage.setItem("newsData", JSON.stringify(data.data.news.edges));
      }
      setTopnews(data);
      dispatchTopNews(addNewsSlice(data));
    };
    getNews();
  }, []);

  useEffect(() => {
    // Topnews && console.log(Topnews);
  }, [Topnews]);

  return (
    <>
      <TbMinusVertical className=" text-lime-400 text-[3vw] relative  top-7" />
      <Link to="/news/top">
        <div className=" relative flex group cursor-pointer">
          <div className=" relative -mt-7">
            <h1 className=" text-[1.6vw] bg-cyan-30 text-red-600 mb-8 inline-block ml-10">
              <span className=" text-[2.2vw] text-violet-600">T</span>op{" "}
              <span className=" text-[2.2vw] text-sky-500 font-bg-red-600">
                N
              </span>
              ews
            </h1>
          </div>
          <IoArrowForwardOutline className="  relative left-3 bottom-3 text-[1.9vw] text-yellow-400 group-hover:text-orange-600 " />
        </div>
      </Link>
      <div className="w-[96vw] bg-red-40 -z-888  static flex overflow-x-scroll mb-10 no-scrollbar ml-7 mr-10">
        {Topnews &&
          Topnews.map((article, index) => {
            return (
              <Link>
                <div className=" bg-red-40 flex-shrink-0 w-[100vw] md:w-1/2 lg:w-1/3 xl:w-[20vw] mr-14 relative group overflow-hidden flex">
                  <img
                    src={article?.node?.image?.url}
                    alt=""
                    className=" hover:border-2  hover:transition-all ease-out hover:border-red-600 object-center h-[25vh] w-[19vw] rounded-lg" // This line ensures all images have the same width and height
                  />
                  <div className="absolute top-0 right-0 bg-slate-600 rounded-lg hover:border-2  hover:transition-all ease-out hover:border-red-600 text-black  w-full h-full transition-all duration-500 transform translate-x-full group-hover:translate-x-0 p-4">
                    <p className=" text-red-500 text-[1vw] font-semibold">
                      {article?.node?.articleTitle?.plainText}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })  }
      </div>
    </>
  );
};

export default EightContainer;
