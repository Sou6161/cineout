import React, { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import {
  Rapidoptions,
  RapidoptionsDataCrawler,
} from "../constants/Rapidoptions";
import Primevideo from "./Primevideo";
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
  const [moviesdata, setmoviesdata] = useState();
  const [fanwatch, setfanwatch] = useState();
  const [selectedProvider, setSelectedProvider] = useState("Prime Video");

  const streamingServices = [
    { name: "Prime Video", color: "from-blue-500 to-blue-700", logo: "https://i.pinimg.com/474x/f5/de/23/f5de23352bd2620c5a1b2e193e6c8f20.jpg" },
    { name: "Netflix", color: "from-red-400 to-red-600", logo: "https://www.underconsideration.com/brandnew/archives/netflix_app_icon.jpg" },
    { name: "Apple TV+", color: "from-yellow-400 to-yellow-600", logo: "https://logowik.com/content/uploads/images/apple-tv1519.jpg" },
    { name: "Hulu", color: "from-green-600 to-green-700", logo: "https://i.pinimg.com/474x/8c/d1/10/8cd11044810e9c8d6e2fc2597a2c68a0.jpg" },
    { name: "Max", color: "from-purple-400 to-purple-600", logo: "https://logos-world.net/wp-content/uploads/2022/01/HBO-Max-Logo.jpg" },
    { name: "Peacock", color: "from-gray-400 to-gray-600", logo: "https://i.pinimg.com/736x/79/31/0e/79310ef5ca4e9027456695b12d0ecbe3.jpg" },
    { name: "Freevee", color: "from-emerald-400 to-emerald-600", logo: "https://static.amazon.jobs/teams/610/thumbnails/freevee_social_banners_v4_543x543_%281%29.jpg?1661462055" },
    { name: "Paramount+", color: "from-teal-400 to-teal-600", logo: "https://cdn.mos.cms.futurecdn.net/N95U8Msuh66Drmf7kGjFAa.jpg" },
    { name: "AMC+", color: "from-orange-400 to-orange-600", logo: "https://shop.amc.com/cdn/shop/products/AMCP-LOGO-100011-FR-RO_1445x.png?v=1650990755" },
    { name: "STARZ", color: "from-cyan-400 to-cyan-600", logo: "https://i0.wp.com/www.thewrap.com/wp-content/uploads/2017/12/StarzLogo.jpg?fit=618%2C412&ssl=1" },
    { name: "SHOWTIME", color: "from-slate-400 to-slate-600", logo: "https://www.cnet.com/a/img/resize/b5bbd7811f6980d51dd0af7983f5827d3aa5e92e/hub/2023/01/04/8922e8a7-64be-458a-9cc9-60f9086d25d2/3-10.png?auto=webp&fit=crop&height=900&width=1200" }
  ];

  const fetchData = async () => {
    const response = await fetch(
      `https://imdb188.p.rapidapi.com/api/v1/getWhatsStreaming?country=US`,
      Rapidoptions
    );
    const data = await response.json();
    if (data.data) {
      setmoviesdata(data.data);
    }
  };

  const fetchfanfavouritedata = async () => {
    const response = await fetch(
      `https://imdb188.p.rapidapi.com/api/v1/getFanFavorites?country=US`,
      RapidoptionsDataCrawler
    );
    const data = await response.json();
    if (data.data) {
      setfanwatch(data.data?.list);
    }
  };

  useEffect(() => {
    fetchData();
    fetchfanfavouritedata();
  }, []);

  // Helper function to render the appropriate component
  const renderStreamingComponent = (item) => {
    switch (item.providerName) {
      case "Prime Video":
        return <Primevideo finalprimeprovidername={item.providerName} finalprimemovies={item.edges} />;
      case "Netflix":
        return <Netflixvideos finalnetflixprovidername={item.providerName} finalnetflixmovies={item.edges} />;
      case "Apple TV+":
        return <Appletvvideos finalappletvprovidername={item.providerName} finalappletvmovies={item.edges} />;
      case "Hulu":
        return <Huluvideos finalhuluprovidername={item.providerName} finalhulumovies={item.edges} />;
      case "Max":
        return <Hbomaxvideos finalhbomaxprovidername={item.providerName} finalhbomaxmovies={item.edges} />;
      case "Peacock":
        return <Peacockvideos finalpeacockprovidername={item.providerName} finalpeacockmovies={item.edges} />;
      case "Freevee":
        return <Freeveevideos finalfreeveeprovidername={item.providerName} finalfreeveemovies={item.edges} />;
      case "Paramount+":
        return <Paramountvideos finalparamountprovidername={item.providerName} finalparamountmovies={item.edges} />;
      case "AMC+":
        return <Amcvideos finalamcprovidername={item.providerName} finalamcmovies={item.edges} />;
      case "STARZ":
        return <Starzvideos finalstarzprovidername={item.providerName} finalstarzmovies={item.edges} />;
      case "SHOWTIME":
        return <Showtimevideos finalshowtimeprovidername={item.providerName} finalshowtimemovies={item.edges} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-black via-slate-900 to-black">
      <div className="relative z-10">
        <Fanfavourites finalfanwatch={fanwatch} />
        
        <div className="p-6">
          <div className="mb-8">
            <h1 className="text-xl small:text-[3.5vw] medium:text-[3vw] large:text-[2.5vw] xlarge:text-[2vw] 2xlarge:text-[1.5vw] font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-purple-500 to-indigo-500">
              Streaming Services
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-violet-400 via-purple-500 to-indigo-500 rounded-full mt-2 animate-pulse"></div>
          </div>

          <div className="flex flex-wrap gap-4 mb-8">
            {streamingServices.map((service) => (
              <motion.button
                key={service.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative group overflow-hidden rounded-lg`}
                onClick={() => setSelectedProvider(service.name)}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-75`}></div>
                <div className="relative px-4 py-2 flex items-center space-x-2 backdrop-blur-sm">
                  <img
                    className="w-6 h-6 rounded object-cover"
                    src={service.logo}
                    alt={`${service.name} logo`}
                  />
                  <span className="text-white font-semibold text-sm">{service.name}</span>
                </div>
                {selectedProvider === service.name && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"></div>
                )}
              </motion.button>
            ))}
          </div>

          <div className=" relative backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
            {moviesdata?.map((item) => {
              if (item.providerName === selectedProvider) {
                return renderStreamingComponent(item);
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Secondcontainer;