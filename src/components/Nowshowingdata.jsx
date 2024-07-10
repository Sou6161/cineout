import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GrAnnounce } from "react-icons/gr";
import { useColor } from "color-thief-react";
import { FaFire } from "react-icons/fa";
import Header from "./Header";
import { useEffect, useState } from "react";

const useWindowSize = () => {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);

  useEffect(() => {
    const handleResize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return size;
};

const Nowshowingdata = ({ nowfinal }) => {
  const [titleColor, setTitleColor] = useState("white");
  const [detailsColor, setDetailsColor] = useState("white");
  const [width] = useWindowSize();
  const [backgroundStyle, setBackgroundStyle] = useState({});

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
      background: `url(${bannerUrl})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    };

    if (width >= 1536) { // 2xl
      setBackgroundStyle({ ...baseStyle, backgroundPosition: "-30vh 0vw" });
    } else if (width >= 1280) { // xl
      setBackgroundStyle({ ...baseStyle, backgroundPosition: "-25vh 0vw" });
    } else if (width >= 1024) { // lg
      setBackgroundStyle({ ...baseStyle, backgroundPosition: "-20vh 0vw" });
    } else if (width >= 768) { // md
      setBackgroundStyle({ ...baseStyle, backgroundPosition: "-0vh 0vw" });
    } else if (width >= 640) { // sm
      setBackgroundStyle({ ...baseStyle, backgroundPosition: "-0vh 0vw" });
    } else if (width >= 480) { // xsmall
      setBackgroundStyle({ ...baseStyle, backgroundPosition: "-0vh 0vw" });
    } else { // smaller than xsmall
      setBackgroundStyle({ ...baseStyle, backgroundPosition: "center" });
    }
  }, [width, bannerUrl]);

  const titleStyle = {
    color: titleColor,
    textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
  };

  const detailsStyle = {
    color: detailsColor,
    textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
  };

  return (
    <>
      <div className="pt-12 -mt-12">
        <Header />
      </div>
      <div
        className="w-[100vw] h-[45vh] xsmall:h-[47vh] small:h-[52vh] medium:h-[56vh] relative"
        style={backgroundStyle}
      >
      
          <h1
            className="text-[5vw] font-bold relative top-[22vh] left-[2vh]  xsmall:top-[25vh] small:top-[30vh] medium:top-[33vh] mb-2"
            style={titleStyle}
          >
            {nowfinal.name ||
              nowfinal.title ||
              nowfinal.original_name ||
              nowfinal.original_title}
          </h1>

          <p
            className="text-sm font-semibold max-w-[60vw] mb-2 relative top-[22vh] xsmall:top-[25vh] small:top-[30vh] medium:top-[33vh] left-[2vh]"
            style={detailsStyle}
          >
            {nowfinal.overview.slice(0, 100)}....
            <Link
              to={`/title/tt${nowfinal.id}`}
              className="text-blue-500 hover:underline ml-1"
              style={{ textShadow: "none" }}
            >
              more
            </Link>
          </p>

          <div className="relative top-[22vh] left-[2vh] xsmall:top-[25vh] small:top-[30vh] medium:top-[34vh] ">
            <p className="text-sm font-semibold flex gap-2 items-center" style={detailsStyle}>
              <GrAnnounce className="text-yellow-400 text-xl" />{" "}
              {nowfinal.first_air_date ||
                nowfinal.release_date ||
                "No Information"}
              <FaFire className="text-orange-500 text-xl" />
              {nowfinal.popularity || "No Information"}
            </p>
          </div>

          <div className=" relative xsmall:top-[21vh] xsmall:left-[65vw] small:top-[25vh] small:left-[72vw] medium:top-[25vw] medium:left-[77vw] ">
            <Link
              to={`/title/tt${nowfinal.id}`}
              className="comic-button inline-block"
            >
              <button>Watch Trailer</button>
            </Link>
          </div>
        
      </div>
    </>
  );
};

export default Nowshowingdata;