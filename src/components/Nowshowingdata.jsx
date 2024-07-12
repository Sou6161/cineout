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

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return size;
};

const Nowshowingdata = ({ nowfinal }) => {
  const [titleColor, setTitleColor] = useState("white");
  const [detailsColor, setDetailsColor] = useState("white");
  const [width] = useWindowSize();
  const [backgroundStyle, setBackgroundStyle] = useState({});
  const [leftOpacity, setLeftOpacity] = useState(0.7);
const [middleOpacity, setMiddleOpacity] = useState(0.2);


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
      backgroundImage: `linear-gradient(to right, rgba(0,0,0,${leftOpacity}) 0%, rgba(0,0,0,${middleOpacity}) 50%, rgba(0,0,0,0) 100%), url(${bannerUrl})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    };
  

    if (width >= 1536) {
      // 2xl
      setBackgroundStyle({ ...baseStyle, backgroundPosition: "-0vh 0vw" });
    } else if (width >= 1280) {
      // xl
      setBackgroundStyle({ ...baseStyle, backgroundPosition: "-0vh 0vw" });
    } else if (width >= 1024) {
      // lg
      setBackgroundStyle({ ...baseStyle, backgroundPosition: "-0vh 0vw" });
    } else if (width >= 768) {
      // md
      setBackgroundStyle({ ...baseStyle, backgroundPosition: "-0vh 0vw" });
    } else if (width >= 640) {
      // sm
      setBackgroundStyle({ ...baseStyle, backgroundPosition: "-0vh 0vw" });
    } else if (width >= 480) {
      // xsmall
      setBackgroundStyle({ ...baseStyle, backgroundPosition: "-0vh 0vw" });
    } else {
      // smaller than xsmall
      setBackgroundStyle({ ...baseStyle, backgroundPosition: "center" });
    }
  }, [width, bannerUrl, leftOpacity, middleOpacity]);

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
        className="w-[100vw] h-[45vh] xsmall:h-[47vh] small:h-[52vh] medium:h-[56vh] large:h-[60vh] xlarge:h-[65vh] 2xlarge:h-[70vh]  relative"
        style={backgroundStyle}
      >
        <h1
          className="text-[5vw] font-bold relative top-[23vh] left-[2vh]  xsmall:top-[25vh] small:top-[30vh] medium:top-[33vh] medium:text-[3vw] large:top-[36vh] large:text-[3vw] xlarge:text-[3vw] xlarge:top-[40vh] 2xlarge:top-[42vh] 2xlarge:text-[2vw] mb-2"
          style={titleStyle}
        >
          {nowfinal.name ||
            nowfinal.title ||
            nowfinal.original_name ||
            nowfinal.original_title}
        </h1>

        <p
          className="text-sm font-semibold max-w-[60vw] mb-2 relative top-[23vh] xsmall:top-[25vh] small:top-[30vh] medium:top-[33vh] medium:w-1/2 large:text-[1.5vw] large:top-[37vh] large:w-1/2 xlarge:text-[1.3vw] xlarge:top-[40vh] xlarge:w-1/2 2xlarge:top-[43vh] 2xlarge:text-[1vw] 2xlarge:w-1/3 left-[2vh]"
          style={detailsStyle}
        >
          {width >= 1536 ? ( // 2xlarge
            <>
              {nowfinal.overview.slice(0, 180)}
              {nowfinal.overview.length > 180 && "..."}
            </>
          ) : width >= 1280 ? ( // xlarge
            <>
              {nowfinal.overview.slice(0, 200)}
              {nowfinal.overview.length > 200 && "..."}
            </>
          ) : width >= 1024 ? ( // large
            <>
              {nowfinal.overview.slice(0, 170)}
              {nowfinal.overview.length > 170 && "..."}
            </>
          ) : width >= 768 ? ( // medium
            <>
              {nowfinal.overview.slice(0, 150)}
              {nowfinal.overview.length > 150 && "..."}
            </>
          ) : (
            <>
              {nowfinal.overview.slice(0, 80)}
              {nowfinal.overview.length > 100 && "..."}
            </>
          )}
          <Link
            to={`/title/tt${nowfinal.id}`}
            className="text-blue-500 hover:underline ml-1"
            style={{ textShadow: "none" }}
          >
            more
          </Link>
        </p>

        <div className="relative top-[23vh] left-[2vh] xsmall:top-[25vh] small:top-[30vh] medium:top-[34vh] large:top-[38vh] xlarge:top-[42vh]  2xlarge:top-[44vh]">
          <p
            className="text-sm 2xlarge:text-[1vw] xlarge:text-[1.3vw] font-semibold flex gap-2 items-center"
            style={detailsStyle}
          >
            <GrAnnounce className="text-yellow-400 text-xl 2xlarge:text-[2vw] xlarge:text-[1.6vw]" />{" "}
            {nowfinal.first_air_date ||
              nowfinal.release_date ||
              "No Information"}
            <FaFire className="text-orange-500 text-xl xlarge:text-[1.6vw] 2xlarge:text-[2vw]" />
            {nowfinal.popularity || "No Information"}
          </p>
        </div>

        <div className=" relative xsmall:top-[23vh] xsmall:left-[77vw] small:top-[27vh] small:left-[77vw] medium:top-[32vh] medium:left-[84vw] large:top-[32vh] large:left-[88vw] xlarge:top-[35vh] xlarge:left-[88vw] 2xlarge:top-[40vh] 2xlarge:left-[90vw] ">
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
