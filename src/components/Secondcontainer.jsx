import React, { useEffect, useState } from "react";
import {
  Rapidoptions,
  RapidoptionsDataCrawler,
} from "../constants/Rapidoptions";
import Primevideo from "./Primevideo";
import { useDispatch } from "react-redux";
import { addPrimevideodata } from "../Reduxstore/Watchprovidersslice";
import Netflixvideos from "./Netflixvideos";
import Appletvvideos from "./Appletvvideos";
import Huluvideos from "./Huluvideos";
import Hbomaxvideos from "./Hbomaxvideos";
import Peacockvideos from "./Peacockvideos";
import Freeveevideos from "./Freeveevideos";
import Paramountvideos from "./Paramountvideos";
import Amcvideos from "./Amcvideos";
import Starzvideos from "./Starzvideos";
import Showtimevideos from "./Showtimevideos";
import Fanfavourites from "./Fanfavourites";

const Secondcontainer = () => {
  // const dispatch = useDispatch()

  const [moviesdata, setmoviesdata] = useState();
  const [fanwatch, setfanwatch] = useState();
  // const [providername, setprovidername] = useState()
  const [selectedProvider, setSelectedProvider] = useState("Prime Video");

  let watchdata = {};

  const fetchData = async () => {
    const response = await fetch(
      `https://imdb188.p.rapidapi.com/api/v1/getWhatsStreaming?country=US`,
      Rapidoptions
    );
    const data = await response.json();
    watchdata = data.data;
    if (watchdata) {
      setmoviesdata(watchdata);
      // setprovidername(watchdata);
      // dispatch(addPrimevideodata(watchdata))
    }
  };
  let fanwatchdata;
  const fetchfanfavouritedata = async () => {
    const response = await fetch(
      `https://imdb188.p.rapidapi.com/api/v1/getFanFavorites?country=US`,
      RapidoptionsDataCrawler
    );
    const data = await response.json();
    fanwatchdata = data.data;
    if (fanwatchdata) {
      setfanwatch(fanwatchdata?.list);
      // setprovidername(watchdata);
      // dispatch(addPrimevideodata(watchdata))
    }
  };
  useEffect(() => {
    fetchData();
    fetchfanfavouritedata();
  }, []);

  useEffect(() => {
    if ((moviesdata, fanwatch)) {
      // console.log(moviesdata, "Hello moviesdata");
      // console.log(fanwatch,"hello fanfavourite data")
    }
  }, [moviesdata, fanwatch]);

  const handleProviderClick = (providerName) => {
    setSelectedProvider(providerName);
  };

  return (
    <>
      <div>
        <Fanfavourites finalfanwatch={fanwatch} />
      </div>

      <>
        <div className="mt-[4vw] mb-5 px-5 text-xl small:text-[3.5vw]  medium:text-[2.5vw] large:text-[2.5vw] xlarge:text-[2vw] 2xlarge:text-[1.5vw] leading-relaxed text-fuchsia-500 dark:text-yellow-300 bg-black font-thin">
          <span className="glowText">See</span>{" "}
          <span className="text-red-600 font-bold">What</span>{" "}
          <span className="glowText">That</span>{" "}
          <span className="text-sky-300 font-bold">Excites</span>{" "}
          <span className="glowText">You</span>
        </div>
        <div className=" px-5 py-2 bg-black ">
          <button
            className="text-white  font-bold bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 rounded-lg text-sm px-5 py-2.5 text-center me-2"
            onClick={() => handleProviderClick("Prime Video")}
          >
            {" "}
            <img
              className="w-[5vw] xsmall:w-[4vw] small:w-[3vw] medium:w-[2.5vw] large:w-[1.8vw] xlarge:w-[1.5vw] 2xlarge:w-[1.3vw] rounded-lg justify-center inline mr-1 "
              src="https://i.pinimg.com/474x/f5/de/23/f5de23352bd2620c5a1b2e193e6c8f20.jpg"
              alt=""
            />
            PRIME VIDEO
          </button>
          <button
            className="text-white font-bold bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80  rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={() => handleProviderClick("Netflix")}
          >
            {" "}
            <img
              className=" w-[5vw] xsmall:w-[4vw] small:w-[3vw] medium:w-[2.5vw] large:w-[1.8vw] xlarge:w-[1.5vw] 2xlarge:w-[1.3vw] rounded-lg object-center justify-center inline-block mr-1"
              src="https://www.underconsideration.com/brandnew/archives/netflix_app_icon.jpg"
              alt=""
            />
            NETFLIX
          </button>
          <button
            className="text-white font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 shadow-lg shadow-yellow-500/50 dark:shadow-lg dark:shadow-yellow-800/80  rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={() => handleProviderClick("Apple TV+")}
          >
            {" "}
            <img
              className="w-[5vw] xsmall:w-[4vw] small:w-[3vw] medium:w-[2.5vw] large:w-[1.8vw] xlarge:w-[1.5vw] 2xlarge:w-[1.3vw] rounded-lg object-center justify-center inline-block mr-1"
              src="https://logowik.com/content/uploads/images/apple-tv1519.jpg"
              alt=""
            />
            APPLE TV+
          </button>
          <button
            className="text-white font-bold bg-gradient-to-r from-green-600 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80  rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={() => handleProviderClick("Hulu")}
          >
            {" "}
            <img
              className="w-[5vw] xsmall:w-[4vw] small:w-[3vw] medium:w-[2.5vw] large:w-[1.8vw] xlarge:w-[1.5vw] 2xlarge:w-[1.3vw] rounded-lg object-center justify-center inline-block mr-1"
              src="https://i.pinimg.com/474x/8c/d1/10/8cd11044810e9c8d6e2fc2597a2c68a0.jpg"
              alt=""
            />
            HULU
          </button>
          <button
            className="text-white font-bold bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={() => handleProviderClick("Max")}
          >
            {" "}
            <img
              className="w-[6vw] h-[2vh] xsmall:w-[4vw] small:w-[3vw] medium:w-[2.5vw] large:w-[1.8vw] xlarge:w-[1.5vw] 2xlarge:w-[1.3vw] object-center rounded-lg justify-center inline-block mr-1"
              src="https://logos-world.net/wp-content/uploads/2022/01/HBO-Max-Logo.jpg"
              alt=""
            />
            MAX
          </button>
          <button
            className="text-white font-bold bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 shadow-lg shadow-gray-500/50 dark:shadow-lg dark:shadow-gray-800/80  rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={() => handleProviderClick("Peacock")}
          >
            {" "}
            <img
              className="w-[5vw] xsmall:w-[4vw] small:w-[3vw] medium:w-[2.5vw] large:w-[1.8vw] xlarge:w-[1.5vw] 2xlarge:w-[1.3vw] rounded-lg justify-center inline-block mr-1"
              src="https://i.pinimg.com/736x/79/31/0e/79310ef5ca4e9027456695b12d0ecbe3.jpg"
              alt=""
            />
            PEACOCK
          </button>
          <button
            className="text-white font-bold bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:focus:ring-emerald-800 shadow-lg shadow-emerald-500/50 dark:shadow-lg dark:shadow-emerald-800/80 rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={() => handleProviderClick("Freevee")}
          >
            {" "}
            <img
              className="w-[5vw] xsmall:w-[4vw] small:w-[3vw] medium:w-[2.5vw] large:w-[1.8vw] xlarge:w-[1.5vw] 2xlarge:w-[1.3vw] rounded-lg justify-center inline-block mr-1"
              src="https://static.amazon.jobs/teams/610/thumbnails/freevee_social_banners_v4_543x543_%281%29.jpg?1661462055"
              alt=""
            />
            FREEVEE
          </button>
          <button
            className="text-white font-bold bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80  rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={() => handleProviderClick("Paramount+")}
          >
            {" "}
            <img
              className="w-[6vw] h-[2.5vh] xsmall:w-[4vw] small:w-[3vw] medium:w-[2.5vw] large:w-[1.8vw] xlarge:w-[1.5vw] 2xlarge:w-[1.3vw] rounded-lg justify-center inline-block mr-1"
              src="https://cdn.mos.cms.futurecdn.net/N95U8Msuh66Drmf7kGjFAa.jpg"
              alt=""
            />
            PARAMOUNT+
          </button>
          <button
            className="text-white font-bold bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 shadow-lg shadow-orange-500/50 dark:shadow-lg dark:shadow-orange-800/80  rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={() => handleProviderClick("AMC+")}
          >
            {" "}
            <img
              className="w-[6vw] h-[2.5vh] xsmall:w-[4vw] small:w-[3vw] medium:w-[2.5vw] large:w-[1.8vw] xlarge:w-[1.5vw] 2xlarge:w-[1.3vw] rounded-lg object-cover justify-center inline-block mr-1"
              src="https://shop.amc.com/cdn/shop/products/AMCP-LOGO-100011-FR-RO_1445x.png?v=1650990755"
              alt=""
            />
            AMC+
          </button>
          <button
            className="text-white font-bold bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80  rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={() => handleProviderClick("STARZ")}
          >
            {" "}
            <img
              className="w-[6vw] h-[2vh] xsmall:w-[4vw] small:w-[3vw] medium:w-[2.5vw] large:w-[1.8vw] xlarge:w-[1.5vw] 2xlarge:w-[1.3vw] rounded-lg object-cover justify-center inline-block mr-1"
              src="https://i0.wp.com/www.thewrap.com/wp-content/uploads/2017/12/StarzLogo.jpg?fit=618%2C412&ssl=1"
              alt=""
            />
            STARZ
          </button>
          <button
            className="text-white font-bold bg-gradient-to-r from-slate-400 via-slate-500 to-slate-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-slate-300 dark:focus:ring-slate-800 shadow-lg shadow-slate-500/50 dark:shadow-lg dark:shadow-slate-800/80 rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={() => handleProviderClick("SHOWTIME")}
          >
            {" "}
            <img
              className="w-[7vw] xsmall:w-[4vw] small:w-[3vw] medium:w-[2.5vw] large:w-[1.8vw] xlarge:w-[1.5vw] 2xlarge:w-[1.3vw] object-cover  rounded-lg justify-center inline-block mr-1"
              src="https://www.cnet.com/a/img/resize/b5bbd7811f6980d51dd0af7983f5827d3aa5e92e/hub/2023/01/04/8922e8a7-64be-458a-9cc9-60f9086d25d2/3-10.png?auto=webp&fit=crop&height=900&width=1200"
              alt=""
            />
            SHOWTIME
          </button>
        </div>

        <div className="text-yellow-400 px-4 text-2xl font-semibold bg-black">
          {moviesdata &&
            moviesdata.map((item, index) => {
              if (item.providerName === selectedProvider) {
                switch (index) {
                  case 0:
                    return (
                      <Primevideo
                        key={index}
                        finalprimeprovidername={item.providerName}
                        finalprimemovies={item.edges}
                      />
                    );
                  case 1:
                    return (
                      <Netflixvideos
                        key={index}
                        finalnetflixprovidername={item.providerName}
                        finalnetflixmovies={item.edges}
                      />
                    );
                  case 2:
                    return (
                      <Appletvvideos
                        key={index}
                        finalappletvprovidername={item.providerName}
                        finalappletvmovies={item.edges}
                      />
                    );
                  case 3:
                    return (
                      <Huluvideos
                        key={index}
                        finalhuluprovidername={item.providerName}
                        finalhulumovies={item.edges}
                      />
                    );
                  case 4:
                    return (
                      <Hbomaxvideos
                        key={index}
                        finalhbomaxprovidername={item.providerName}
                        finalhbomaxmovies={item.edges}
                      />
                    );
                  case 5:
                    return (
                      <Peacockvideos
                        key={index}
                        finalpeacockprovidername={item.providerName}
                        finalpeacockmovies={item.edges}
                      />
                    );
                  case 6:
                    return (
                      <Freeveevideos
                        key={index}
                        finalfreeveeprovidername={item.providerName}
                        finalfreeveemovies={item.edges}
                      />
                    );
                  case 7:
                    return (
                      <Paramountvideos
                        key={index}
                        finalparamountprovidername={item.providerName}
                        finalparamountmovies={item.edges}
                      />
                    );
                  case 8:
                    return (
                      <Amcvideos
                        key={index}
                        finalamcprovidername={item.providerName}
                        finalamcmovies={item.edges}
                      />
                    );
                  case 9:
                    return (
                      <Starzvideos
                        key={index}
                        finalstarzprovidername={item.providerName}
                        finalstarzmovies={item.edges}
                      />
                    );
                  case 10:
                    return (
                      <Showtimevideos
                        key={index}
                        finalshowtimeprovidername={item.providerName}
                        finalshowtimemovies={item.edges}
                      />
                    );
                  default:
                    return null;
                }
              }
            })}
        </div>
      </>
    </>
  );
};

export default Secondcontainer;
