import React, { useEffect, useState } from "react";
import { API_OPTIONS } from "../constants/Apioptions";
import { useDispatch } from "react-redux";
import {
  adddiscovermoviesdata,
  addtopratedmoviesdata,
  addtopratedseriesdata,
  addwhattowatchmoviesdata,
  addwhattowatchseriesdata,
} from "../Reduxstore/Watchprovidersslice";
import Whattowatchmovies from "./Whattowatchmovies";
import Whattowatchseries from "./Whattowatchseries";
import { Rapidpostoptions } from "../constants/Rapidoptions";
import axios from "axios";
import Topratedmovies from "./Topratedmovies";
import Topratedseries from "./Topratedseries";
import Discovermoviesfan from "./Discovermoviesfan";
import "../index.css";
import Header from "./Header";

const Whattowatch = () => {
  const [whattowatchmovies, setwhattowatchmovies] = useState(null);
  const [whattowatchseries, setwhattowatchseries] = useState(null);
  const [discovermovies, setdiscovermovies] = useState(null);
  const [topratedmovies, settopratedmovies] = useState(null);
  const [topratedseries, settopratedseries] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentComponent, setCurrentComponent] = useState(null);
  const [activeButton, setActiveButton] = useState("MOST POPULAR MOVIES");

  // const dispatchdiscovermovies = useDispatch()
  // const dispatchwatchmovies = useDispatch();
  // const dispatchwatchseries = useDispatch();
  // const dispatchtopratedmovies = useDispatch()
  // const dispatchtopratedseries = useDispatch()

  const getDiscovermoviesfan = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=2&sort_by=popularity.desc",
      API_OPTIONS
    );
    const jsonDiscovermovies = await data.json();
    const finalDiscovermovies = jsonDiscovermovies.results;
    // dispatchdiscovermovies(adddiscovermoviesdata(finalDiscovermovies))
    let Discovermoviesdata =
      finalDiscovermovies[
        (Math.random() * finalDiscovermovies.length).toFixed()
      ];
    setdiscovermovies(Discovermoviesdata);
  };

  const getwhattowatchmovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      API_OPTIONS
    );
    const jsonmovies = await data.json();
    const finaldatamovies = jsonmovies.results;
    // dispatchwatchmovies(addwhattowatchmoviesdata(finaldatamovies));
    if (finaldatamovies) {
      setwhattowatchmovies(finaldatamovies);
      setCurrentComponent(
        <Whattowatchmovies finalwatchmovies={finaldatamovies} />
      );
    }
    setLoading(false);
  };
  // fetchData();
  // }, []);

  const getwhattowatchseries = async () => {
    const response = await axios.request(Rapidpostoptions);
    const finalresponse = response.data.data.list;
    // dispatchwatchseries(addwhattowatchseriesdata(finalresponse))
    setwhattowatchseries(finalresponse);
  };

  const gettopratedmoviedata = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      API_OPTIONS
    );
    const jsontoprated = await data.json();
    const finaltoprateddata = jsontoprated.results;
    // dispatchtopratedmovies(addtopratedmoviesdata(finaltoprateddata))
    settopratedmovies(finaltoprateddata);
  };

  const gettopratedseriesdata = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1",
      API_OPTIONS
    );
    const jsontoprated = await data.json();
    const finaltoprateddata = jsontoprated.results;
    // dispatchtopratedseries(addtopratedseriesdata(finaltoprateddata))
    settopratedseries(finaltoprateddata);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        API_OPTIONS
      );
      const jsonmovies = await data.json();
      const finaldatamovies = jsonmovies.results;
      if (finaldatamovies) {
        setwhattowatchmovies(finaldatamovies);
        setCurrentComponent(
          <Whattowatchmovies finalwatchmovies={finaldatamovies} />
        );
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    !discovermovies && getDiscovermoviesfan();
    !whattowatchmovies && getwhattowatchmovies();
    getwhattowatchseries();
    !topratedmovies && gettopratedmoviedata();
    !topratedseries && gettopratedseriesdata();
  }, []);

  const handleClick = (item) => {
    setActiveButton(item);
    switch (item) {
      case "MOST POPULAR MOVIES":
        setCurrentComponent(
          <Whattowatchmovies finalwatchmovies={whattowatchmovies} />
        );
        break;
      case "MOST POPULAR SERIES":
        setCurrentComponent(
          <Whattowatchseries finalwatchseries={whattowatchseries} />
        );
        break;
      case "TOP RATED MOVIES":
        setCurrentComponent(
          <Topratedmovies finaltopratedmovies={topratedmovies} />
        );
        break;
      case "TOP RATED SERIES":
        setCurrentComponent(
          <Topratedseries finaltopratedseries={topratedseries} />
        );
        break;
      default:
        setCurrentComponent(null);
    }
  };

  return (
    <>
      <div className=" absolute bg-black  w-[100vw] h-[8vh]">
        <Header />
      </div>
      <div className=" bg-red-300">
        <Discovermoviesfan finaldiscovermovies={discovermovies} />
      </div>

      <div className=" flex  relative top-[15vh]  ml-[18vw]">
        <h1 className=" text-[5vw] font-semibold text-yellow-400">WHAT</h1>
        <span className=" inline-block text-[5vw] font-semibold text-red-600 ml-2">
          TO
        </span>
        <h1 className=" text-[5vw] text-blue-600 font-semibold ml-2">
          WATCH -
        </h1>{" "}
        <span className=" text-[5vw] font-semibold text-purple-600 ">
          CINEOUT
        </span>
      </div>

      <div className="mt-[30vw] bg-yellow-300 w-[vw]">
        <div
          className=" flex   absolute ml-5
                  top-[80vw]
                  xsmall:top-[48vw]
                  small:top-[46vw]
                  medium:top-[44vw]
                  large:top-[42vw]
                  xlarge:top-[40vw]
                  2xlarge:top-[38vw]
                  left-1/2 transform -translate-x-1/2"
        >
          <button
            className={` -ml-[3vw] w-[40vw] top-[18vw] relative rounded group overflow-hidden font-medium bg-white glow text-red-600
                  text-[3vw]
                  xsmall:text-[2.3vw]
                  small:text-[2.1vw]
                  medium:text-[1.9vw]
                  large:text-[1.7vw]
                  xlarge:text-[1.5vw]
                  2xlarge:text-[1.3vw]
                  ${
                    activeButton === "MOST POPULAR MOVIES"
                      ? "underline-black"
                      : ""
                  }`}
            onClick={() => handleClick("MOST POPULAR MOVIES")}
          >
            <span className="absolute left-0 flex h- mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-purple-600 group-hover:h-full opacity-90"></span>
            <span className="relative group-hover:text-white">
              MOST POPULAR MOVIES
            </span>
          </button>

          <button
            className={` relative w-[32vw] rounded group overflow-hidden font-medium bg-white glow3 text-red-600
                  text-[2.5vw]
                  top-[18vw]
                  xsmall:text-[2.3vw]
                  small:text-[2.1vw]
                  medium:text-[1.9vw]
                  large:text-[1.7vw]
                  xlarge:text-[1.5vw]
                  2xlarge:text-[1.3vw]
                  ${
                    activeButton === "MOST POPULAR SERIES"
                      ? "underline-black"
                      : ""
                  }`}
            onClick={() => handleClick("MOST POPULAR SERIES")}
          >
            <span className="absolute top-0  flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-purple-600 group-hover:h-full opacity-90"></span>
            <span className="relative group-hover:text-white">
              MOST POPULAR SERIES
            </span>
          </button>

          <button
            className={` left-4 relative w-[31vw] rounded group overflow-hidden font-medium bg-white glow2 text-red-600
                  text-[2.5vw]
                  top-[18vw]
                  xsmall:text-[2.3vw]
                  small:text-[2.1vw]
                  medium:text-[1.9vw]
                  large:text-[1.7vw]
                  xlarge:text-[1.5vw]
                  2xlarge:text-[1.3vw]
                  ${
                    activeButton === "TOP RATED MOVIES" ? "underline-black" : ""
                  }`}
            onClick={() => handleClick("TOP RATED MOVIES")}
          >
            <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-purple-600 group-hover:h-full opacity-90"></span>
            <span className="relative group-hover:text-white">
              TOP RATED MOVIES
            </span>
          </button>

          <button
            className={`px-5 py-2.5 left-7 relative rounded group overflow-hidden font-medium bg-white glow5 text-red-600
                  text-[2.5vw]
                  xsmall:text-[2.3vw]
                  small:text-[2.1vw]
                  medium:text-[1.9vw]
                  large:text-[1.7vw]
                  xlarge:text-[1.5vw]
                  2xlarge:text-[1.3vw]
                  ${
                    activeButton === "TOP RATED SERIES" ? "underline-black" : ""
                  }`}
            onClick={() => handleClick("TOP RATED SERIES")}
          >
            <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-purple-600 group-hover:h-full opacity-90"></span>
            <span className="relative group-hover:text-white">
              TOP RATED SERIES
            </span>
          </button>
        </div>
      </div>
      <div className="relative top-10">{currentComponent}</div>
    </>
  );
};

export default Whattowatch;
