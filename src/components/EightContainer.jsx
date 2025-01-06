import React, { useEffect, useState } from "react";
import { RapidoptionsDojo } from "../constants/Rapidoptions";
import { Link } from "react-router-dom";
import { Newspaper, Sparkles, TrendingUp } from "lucide-react";
import { useDispatch } from "react-redux";
import { addNewsSlice } from "../Reduxstore/NewsSlice";
import { RapidOptionsDetails, RapidOptionsDetailsDaimond } from "../constants/RapidOptionsForDetails";

const EightContainer = () => {
  const [Category, setCategory] = useState("TOP");
  const [Topnews, setTopnews] = useState(null);
  const dispatchTopNews = useDispatch();

  useEffect(() => {
    const getNews = async () => {
      let data = localStorage.getItem("newsData");
      if (data) {
        data = JSON.parse(data);
      } else {
        const response = await fetch(
          `https://imdb8.p.rapidapi.com/news/v2/get-by-category?category=${Category}&first=20`,
          RapidOptionsDetailsDaimond
        );
        data = await response.json();
        localStorage.setItem("newsData", JSON.stringify(data.data.news.edges));
      }
      setTopnews(data);
      dispatchTopNews(addNewsSlice(data));
    };
    getNews();
  }, []);

  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-black py-10 h-[30vh]">
      <div className="max-w-8xl mx-5 px-4">
        {/* Header Section */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="relative">
            <Newspaper className="w-8 h-8 text-red-500" />
            <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
            Top News
          </h1>
          <TrendingUp className="w-6 h-6 text-blue-400 animate-pulse" />
        </div>

        {/* News Cards Container */}
        <div className="relative">
          <div className="overflow-x-auto no-scrollbar">
            <div className="flex gap-6 pb-8">
              {Topnews &&
                Topnews.map((article, index) => (
                  <Link key={index}>
                    <div className="group relative flex-shrink-0 w-[70vw] xsmall:w-[50vw] small:w-[40vw] medium:w-[35vw] large:w-[28vw] xlarge:w-[22vw] 2xlarge:w-[20vw]">
                      <div className="relative overflow-hidden rounded-xl transition-all duration-500">
                        {/* Image */}
                        <img
                          src={article?.node?.image?.url}
                          alt=""
                          className="w-full h-[25vh] object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-4 left-4 right-4">
                            <p className="text-white text-[4vw] xsmall:text-[2.5vw] small:text-[2.5vw] medium:text-[1.5vw] large:text-[1.5vw] xlarge:text-[1.2vw] 2xlarge:text-[1vw] font-semibold line-clamp-3">
                              {article?.node?.articleTitle?.plainText}
                            </p>
                          </div>
                        </div>

                        {/* Glowing Border */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur"></div>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>

          {/* Gradient Edges */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black to-transparent pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};

export default EightContainer;