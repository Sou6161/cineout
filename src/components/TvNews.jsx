import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addTvNewsSlice } from "../Reduxstore/TvNewsSlice";
import { RapidoptionsDojo } from "../constants/Rapidoptions";
import Headerfordetails from "./Headerfordetails";
import ImageChangeRefresh from "./ImageChangeRefresh";
import MoreToRead from "./MoreToRead";
import { FaGripLinesVertical } from "react-icons/fa6";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";

const TvNews = () => {
  const [TvNews, setTvNews] = useState(null);
  const dispatchTvNews = useDispatch();
  const [showText, setShowText] = useState([]); // Change this line

  useEffect(() => {
    const getTvNews = async () => {
      // Check if data is in local storage
      let data = localStorage.getItem("TnewsData");
      if (data) {
        // Parse stored json if it was found
        data = JSON.parse(data);
      } else {
        // Otherwise, fetch data from API
        const response = await fetch(
          `https://imdb8.p.rapidapi.com/news/v2/get-by-category?category=MOVIE&first=20`,
          RapidoptionsDojo
        );
        data = await response.json();
        // Save the data to local storage
        localStorage.setItem(
          "TnewsData",
          JSON.stringify(data?.data?.news?.edges)
        );
      }
      setTvNews(data);
      dispatchTvNews(addTvNewsSlice(data));
      setShowText(new Array(data?.data?.news?.edges?.length).fill(false)); // Add this line
    };
    getTvNews();
  }, []);

  useEffect(() => {
    TvNews && console.log(TvNews);
  }, [TvNews]);

  const Images = TvNews && TvNews.map((item) => item?.node?.image?.url);
  console.log(Images);

  return (
    <>
      <div className=" w-[100vw] h-[59vh] bg-black relative no-scrollbar">
        <div className="  w-[100vw] h-[9vh]  bg-black px-3 py-1">
          <div className=" relative top-5 px-5 ">
            <Headerfordetails />
          </div>
        </div>
        <div className="">
          <ImageChangeRefresh images={Images} />
        </div>
      </div>
      <div className=" bg-black -mt-10 ">
        <MoreToRead />
        <div className=" text-[1.8vw] relative left-[30vw] bottom-[77vh] flex">
          <FaGripLinesVertical className="text-[2vw] text-red-600 relative top-2" />
          <h1 className=" text-emerald-400 font-semibold">Tv-Series News</h1>
        </div>
        <div className="flex ml-[30vw] relative bottom-[80vh] flex-wrap overflow-auto mt-7">
          {TvNews &&
            TvNews.map((news, index) => {
              return (
                <div className="w-[65vw] h-auto mb-5 rounded-lg border-2 border-amber-400 bg-zinc-300">
                  <div>
                    <img
                      src={news?.node?.image?.url}
                      alt="no image"
                      className=" mt-2 border-2 border-red-600 hover:transition-all ease-in mx-auto mb-6  object-fill h-[32vh] w-[15vw] rounded-lg" // This line ensures all images have the same width and height
                    />
                    <div>
                      {showText[index] ? (
                        <>
                          <p className="text-[1vw] w-[50vw] mx-auto text-rose-500 font-semibold">
                            {news?.node?.text?.plainText}
                            <span
                              className="cursor-pointer inline-flex items-center" // Add these classes
                              onClick={() => {
                                const newShowText = [...showText];
                                newShowText[index] = !newShowText[index];
                                setShowText(newShowText);
                              }}
                            >
                              <BiSolidUpArrow className=" text-black relative top-1" />
                            </span>
                          </p>
                          <br />
                          <div className=" ml-[7.3vw]">
                            <h1>
                              <a
                                className=" text-lime-700 cursor-pointer font-semibold text-[1vw] hover:underline"
                                href={news?.node?.externalUrl}
                              >
                                Click to Read In Detail
                              </a>
                              <br />
                              <div className=" flex gap-5 ">
                                <h1 className=" font-semibold">Written By :</h1>
                                <div className=" text-indigo-600 font-bold">
                                  {news?.node?.byline}
                                </div>
                              </div>

                              <div className=" flex">
                                <h1 className=" font-semibold">
                                  Published Date :
                                </h1>
                                <div className=" text-violet-800 font-semibold">
                                  {news?.node?.date.split("T")[0]}
                                </div>
                                <br />
                                <div className="">
                                  {news?.node?.source?.homepage?.label}
                                </div>
                              </div>
                            </h1>
                          </div>
                        </>
                      ) : (
                        <>
                          <p className="text-[1vw] w-[50vw] mx-auto leading-relaxed text-amber-800 font-semibold ">
                            {news?.node?.text?.plainText.substring(0, 500)}
                            <span
                              className="cursor-pointer inline-flex items-center" // Add these classes
                              onClick={() => {
                                const newShowText = [...showText];
                                newShowText[index] = !newShowText[index];
                                setShowText(newShowText);
                              }}
                            >
                              ...
                              <BiSolidDownArrow className=" text-black" />
                              <br />
                            </span>
                          </p>{" "}
                          <br />
                          <div className=" ml-[7.3vw]">
                            <h1>
                              <a
                                className=" text-lime-700 cursor-pointer font-semibold text-[1vw] hover:underline"
                                href={news?.node?.externalUrl}
                              >
                                Click to Read In Detail
                              </a>
                              <br />
                              <div className=" flex gap-5 ">
                                <h1 className=" font-semibold">Written By :</h1>
                                <div className=" text-indigo-600 font-bold">
                                  {news?.node?.byline}
                                </div>
                              </div>

                              <div className=" flex">
                                <h1 className=" font-semibold">
                                  Published Date :
                                </h1>
                                <div className=" text-violet-800 font-semibold">
                                  {news?.node?.date.split("T")[0]}
                                </div>
                                <div className=" relative ml-[27vw] -mt-16 flex">
                                  <h1 className=" relative ml- text-[1.5vw] font-semibold">
                                    Source:{" "}
                                  </h1>
                                  <h1 className=" text-[1vw] ml-2 relative top-2 text-green-800 font-medium">
                                    {news?.node?.source?.homepage?.label}
                                  </h1>
                                </div>
                              </div>
                            </h1>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default TvNews;
