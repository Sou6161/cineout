import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useColor } from "color-thief-react";
import { Calendar, Play, Star } from 'lucide-react';
import Header from "./Header";
import { FaFire } from "react-icons/fa";


const useWindowSize = () => {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);

  useEffect(() => {
    const handleResize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
};

const Nowshowingdata = ({ nowfinal }) => {
  const [titleColor, setTitleColor] = useState("white");
  const [detailsColor, setDetailsColor] = useState("white");
  const [width] = useWindowSize();
  const [backgroundStyle, setBackgroundStyle] = useState({});
  const [isHovered, setIsHovered] = useState(false);
  const [showFullOverview, setShowFullOverview] = useState(false);

  const bannerUrl = `https://image.tmdb.org/t/p/original/${nowfinal.backdrop_path}`;
  const { data: dominantColor } = useColor(bannerUrl, "rgb", {
    crossOrigin: "anonymous",
  });

  const calculateContrastColor = (rgb, threshold) => {
    const [r, g, b] = rgb;
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > threshold ? "black" : "white";
  };

  useEffect(() => {
    if (dominantColor) {
      setTitleColor(calculateContrastColor(dominantColor, 128));
      setDetailsColor(calculateContrastColor(dominantColor, 160));
    }
  }, [dominantColor]);

  useEffect(() => {
    const baseStyle = {
      backgroundImage: `
        linear-gradient(
          to right,
          rgba(0,0,0,0.85) 0%,
          rgba(0,0,0,0.5) 50%,
          rgba(0,0,0,0.3) 100%
        ),
        url(${bannerUrl})
      `,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: width < 480 ? "center" : "-0vh 0vw",
    };

    setBackgroundStyle(baseStyle);
  }, [width, bannerUrl]);

  return (
    <div className="relative">
      <div className="pt-12 -mt-12">
        <Header />
      </div>
      
      <div className="relative w-screen">
        <div 
          className="h-[75vh] xlarge:h-[85vh]  2xlarge:h-[80vh] relative"
          style={backgroundStyle}
        >
          {/* Content Container */}
          <div className="absolute bottom-0 left-0 w-full pb-16 px-8 space-y-6">
            {/* Rating Badge */}
            <div className="inline-flex items-center gap-1 bg-amber-400/90 text-black px-3 py-1 rounded-full">
              <Star className="w-4 h-4 fill-current" />
              <span className="font-semibold">{(nowfinal.vote_average || 0).toFixed(1)}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl 2xlarge:text-5xl font-bold tracking-tight text-white max-w-4xl leading-tight">
              {nowfinal.name || nowfinal.title || nowfinal.original_name || nowfinal.original_title}
            </h1>

            {/* Overview */}
            <div className="relative max-w-2xl">
              <p className="text-lg text-gray-100 leading-relaxed">
                {showFullOverview ? nowfinal.overview : 
                  `${nowfinal.overview.slice(0, width >= 1024 ? 200 : 150)}${nowfinal.overview.length > (width >= 1024 ? 200 : 150) ? '...' : ''}`
                }
                {nowfinal.overview.length > (width >= 1024 ? 200 : 150) && (
                  <button
                    onClick={() => setShowFullOverview(!showFullOverview)}
                    className="ml-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
                  >
                    {showFullOverview ? 'Show less' : 'Read more'}
                  </button>
                )}
              </p>
            </div>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-200">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-yellow-400" />
                <span className="text-sm font-medium">
                  {nowfinal.first_air_date || nowfinal.release_date || "Release date unavailable"}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <FaFire className="w-5 h-5 text-orange-500" />
                <span className="text-sm font-medium">
                  {`${Math.round(nowfinal.popularity || 0)} popularity score`}
                </span>
              </div>

              {nowfinal.genres && (
                <div className="flex flex-wrap gap-2">
                  {nowfinal.genres.map(genre => (
                    <span key={genre.id} className="px-3 py-1 bg-white/10 rounded-full text-sm">
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 pt-4 text-nowrap ">
              <Link
                to={`/title/tt${nowfinal.id}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="inline-flex items-center gap-2 px-4 py-4 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 font-semibold"
              >
                <Play className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                Watch Trailer
              </Link>
              
              <Link
                to={`/name/movie/${nowfinal.id}`}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300 font-semibold"
              >
                More Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nowshowingdata;