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
      {/* <TbMinusVertical className=" text-lime-400 text-[13vw] relative  top-10" /> */}
      <Link to="/news/top">
        <div className=" relative flex group cursor-pointer">
          <div className=" relative bg-red-30 bottom-2">
            <h1 className=" text-[5vw] xsmall:text-[4vw] small:text-[3vw] medium:text-[3vw] large:text-[2vw] xlarge:text-[2vw] 2xlarge:text-[1.5vw] bg-cyan-30 text-red-600  inline-block ml-7">
              <span className=" text-[8vw] xsmall:text-[7vw] small:text-[5vw] medium:text-[4vw] large:text-[2.5vw] xlarge:text-[3vw] 2xlarge:text-[2vw] text-violet-600">T</span>op{" "}
              <span className=" text-[8vw] xsmall:text-[7vw] small:text-[5vw] medium:text-[4vw] large:text-[2.5vw] xlarge:text-[3vw] 2xlarge:text-[2vw] text-sky-500 font-bg-red-600">
                N
              </span>
              ews
            </h1>
          </div>
          <IoArrowForwardOutline className="  relative left-3 top-[1vh] xsmall:top-[2vh] small:top-[1vh] medium:top-[1vh] large:top-[0vh] xlarge:top-[1.8vh] 2xlarge:top-[1vh] text-[7vw] xsmall:text-[5vw] medium:text-[4vw] large:text-[3vw] xlarge:text-[2.5vw] 2xlarge:text-[2vw] text-amber-400 group-hover:text-cyan-400 " />
        </div>
      </Link>
      <div className="w-[96vw] mt-5 bg-red-30 -z-888  static flex overflow-x-scroll mb-10 no-scrollbar ml-7 mr-10">
        {Topnews &&
          Topnews.map((article, index) => {
            return (
              <Link>
                <div className=" bg-red-40 flex-shrink-0 w-[70vw] xsmall:w-[50vw] small:w-[40vw] medium:w-[35vw] large:w-[28vw] xlarge:w-[22vw] 2xlarge:w-[20vw]  mr-14 relative group overflow-hidden flex">
                  <img
                    src={article?.node?.image?.url}
                    alt=""
                    className=" hover:border-2  hover:transition-all ease-out hover:border-red-600 object-cover h-[25vh] w-[70vw] xsmall:w-[50vw] small:w-[40vw] medium:w-[35vw] large:w-[28vw] xlarge:w-[22vw] 2xlarge:w-[20vw]  rounded-lg" // This line ensures all images have the same width and height
                  />
                  <div className="absolute top-0 right-0 bg-slate-600 rounded-lg hover:border-2  hover:transition-all ease-out hover:border-red-600 text-black  max-w-[70vw] xsmall:w-[50vw] small:w-[40vw] medium:w-[35vw] large:w-[28vw] xlarge:w-[22vw] 2xlarge:w-[20vw] h-full transition-all duration-500 transform translate-x-full group-hover:translate-x-0 p-4">
                    <p className=" text-red-500 text-[4vw] xsmall:text-[2.5vw] small:text-[2.5vw] medium:text-[1.5vw]  large:text-[1.5vw] xlarge:text-[1.2vw] 2xlarge:text-[1vw] font-semibold">
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
