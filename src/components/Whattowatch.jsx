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
import Headerfordetails from "./Headerfordetails";

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

  

  

  // const getwhattowatchmovies = async () => {
  //   const data = await fetch(
  //     "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
  //     API_OPTIONS
  //   );
  //   const jsonmovies = await data.json();
  //   const finaldatamovies = jsonmovies.results;
  //   // dispatchwatchmovies(addwhattowatchmoviesdata(finaldatamovies));
  //   if(finaldatamovies) {
  //       setwhattowatchmovies(finaldatamovies);
  //       setCurrentComponent(<Whattowatchmovies finalwatchmovies={finaldatamovies} />);
  //     }
  //     setLoading(false);
  //   };
  //   fetchData();
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
      if(finaldatamovies) {
        setwhattowatchmovies(finaldatamovies);
        setCurrentComponent(<Whattowatchmovies finalwatchmovies={finaldatamovies} />);
      }
      setLoading(false);
    };
    fetchData();
  }, []); 
  
  

  useEffect(() => {
    !discovermovies && getDiscovermoviesfan();
    // !whattowatchmovies && getwhattowatchmovies();
    // getwhattowatchseries();
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
      <div className=" relative bg-black px-10 py-5 h-[8vh] w-[100vw]">
        <Headerfordetails />
      </div>
      <div className="w=[100vw] ">
        <Discovermoviesfan finaldiscovermovies={discovermovies} />
      </div>
      <div className=" flex w-[100vw] bg-black ">
        <div className=" flex mx-[70vh] mb-[15vh] mt-[2vh]">
          <h1 className=" text-[5vh] text-yellow-400">WHAT</h1>
          <span className=" inline-block text-[5vh] text-red-600 ml-4">TO</span>
          <h1 className=" text-[5vh] text-blue-600 ml-4">WATCH -</h1>{" "}
          <span className=" text-[5vh] text-purple-600 ">CINEOUT</span>
        </div>
      </div>

      <div className=" bg-yellow-300 w-[100vw] ">
        <div className="  space-x-2 mb-10 inline-block absolute bottom-[3vh] mx-[50vh]">
          <button
            className={` px-5 py-2.5 relative rounded group overflow-hidden font-medium bg-yellow-200 text-red-600 ${
              activeButton === "MOST POPULAR MOVIES" ? "underline-black" : ""
            }`}
            onClick={() => handleClick("MOST POPULAR MOVIES")}
          >
            <span class="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-purple-600 group-hover:h-full opacity-90"></span>
            <span class="relative group-hover:text-white">
              MOST POPULAR MOVIES
            </span>
          </button>

          <button
            className={`px-5 py-2.5 relative rounded group overflow-hidden font-medium bg-purple-50 text-red-600 ${
              activeButton === "MOST POPULAR SERIES" ? "underline-black" : ""
            }`}
            onClick={() => handleClick("MOST POPULAR SERIES")}
          >
            <span class="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-purple-600 group-hover:h-full opacity-90"></span>
            <span class="relative group-hover:text-white">
              MOST POPULAR SERIES
            </span>
          </button>

          <button
            className={`  px-5 py-2.5 relative rounded group overflow-hidden font-medium bg-lime-300 text-red-600 ${
              activeButton === "TOP RATED MOVIES" ? "underline-black" : ""
            }`}
            onClick={() => handleClick("TOP RATED MOVIES")}
          >
            <span class="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-purple-600 group-hover:h-full opacity-90"></span>
            <span class="relative group-hover:text-white">
              TOP RATED MOVIES
            </span>
          </button>

          <button
            className={`  px-5 py-2.5 relative rounded group overflow-hidden font-medium bg-purple-50 text-red-600 ${
              activeButton === "TOP RATED SERIES" ? "underline-black" : ""
            }`}
            onClick={() => handleClick("TOP RATED SERIES")}
          >
            <span class="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-purple-600 group-hover:h-full opacity-90"></span>
            <span class="relative group-hover:text-white">
              TOP RATED SERIES
            </span>
          </button>
        </div>
      </div>

      {currentComponent}
    </>
  );
};

export default Whattowatch;
