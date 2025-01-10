import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNowshowingdata } from "../Reduxstore/NowShowingslice";
import { useEffect } from "react";
import { API_OPTIONS } from "../constants/Apioptions";
import Nowshowingdata from "./Nowshowingdata";
import Upcomingdata from "./Upcomingdata";
import { addUpcomingdata } from "../Reduxstore/Upcomingslice";
import Upcomingseriesdata from "./Upcomingseriesdata";
import Secondcontainer from "./Secondcontainer";
import { addUpcomingseriesdata } from "../Reduxstore/UpcomingseriesSlice";
import Thirdcontainer from "./Thirdcontainer";
import Fourthcontainer from "./Fourthcontainer";
import Fifthcontainer from "./Fifthcontainer";
import Sixthcontainer from "./Sixthcontainer";
import SeventhContainer from "./SeventhContainer";
import EightContainer from "./EightContainer";
import Ninthcontainer from "./Ninthcontainer";
import Footer from "./Footer";
import { RapidOptionsDaimondApiDojoUpcomingMoviesTest70 } from "../constants/Rapidoptions";

const Maincontainer = () => {
  const nowshowingdispatch = useDispatch();
  const upcomingdispatch = useDispatch();
  const upcomingseriesdispatch = useDispatch();
  const [finaldata, setfinaldata] = useState(null);
  const [finalupcomingdata, setfinalupcomingdata] = useState(null);
  const [UpcomingMovies, setUpcomingMovies] = useState(null);
  const [UpcomingMoviesDetails, setUpcomingMoviesDetails] = useState();
  const [finalupcomingseries, setfinalupcomingseries] = useState(null);

  const getNowshowingdata = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/trending/all/day?language=en-US",
      API_OPTIONS
    );
    const json = await data.json();
    const finaldata = json.results;
    let jsondata = finaldata[(Math.random() * finaldata.length).toFixed()];
    setfinaldata(jsondata);
  };

  const getUpcomingdata = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1`,
      API_OPTIONS
    );
    const json = await data.json();
    const upcomingjson = json.results;
    upcomingdispatch(addUpcomingdata(upcomingjson));
    setfinalupcomingdata(upcomingjson);
  };
  useEffect(() => {
    const getUpcomingMovies = async () => {
      const response = await fetch(
        `https://imdb8.p.rapidapi.com/title/v2/get-coming-soon?comingSoonType=MOVIE&first=20&country=IN&language=en-US`,
        RapidOptionsDaimondApiDojoUpcomingMoviesTest70
      );
      const data = await response.json();
      setUpcomingMovies(
        data.data.comingSoon.edges.map((movie, index) => {
          return movie?.node?.id;
        })
      );
    };
    getUpcomingMovies();
  }, []);

  useEffect(() => {
    // UpcomingMovies && console.log(UpcomingMovies);
  }, [UpcomingMovies]);

  useEffect(() => {
    const UpcomingMoviesDetails = async () => {
      if (UpcomingMovies) {
        const BannerData = await Promise.all(
          UpcomingMovies.map(async (id) => {
            const response = await fetch(
              `https://api.themoviedb.org/3/find/${id}?external_source=imdb_id`,
              API_OPTIONS
            );
            const data = await response.json();
            return data?.movie_results;
          })
        );
        setUpcomingMoviesDetails(BannerData.flat());
      }
    };
    UpcomingMoviesDetails();
  }, [UpcomingMovies]);

  useEffect(() => {
    // UpcomingMoviesDetails && console.log(UpcomingMoviesDetails);
  }, [UpcomingMoviesDetails]);

  const getupcomingseries = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/trending/tv/day?language=en-US`,
      API_OPTIONS
    );
    const json = await data.json();
    const finaljson = json.results;
    upcomingseriesdispatch(addUpcomingseriesdata(finaljson));
    setfinalupcomingseries(finaljson);
  };

  useEffect(() => {
    !finaldata && getNowshowingdata();
    !finalupcomingdata && getUpcomingdata();
    !finalupcomingseries && getupcomingseries();
  }, []);

  useEffect(() => {
    if (finaldata) {
      // console.log(finaldata.id)
      nowshowingdispatch(addNowshowingdata(finaldata.id));
    }
  }, [finaldata]);

  return finaldata &&
    finalupcomingdata &&
    UpcomingMovies &&
    UpcomingMoviesDetails ? (
    <div className=" overflow-hidden overflow-x-hidden bg-black">
      <Nowshowingdata nowfinal={finaldata} />
      <Upcomingdata
        nowupcomingfinal={finalupcomingdata}
        nowupcomingmovies={UpcomingMovies}
        nowupcomingmoviesdetails={UpcomingMoviesDetails}
      />
      <Upcomingseriesdata nowupcomingseries={finalupcomingseries} />
      <Secondcontainer />
      <Thirdcontainer />
      <Fifthcontainer />
      <Sixthcontainer />
      <SeventhContainer />
      <EightContainer />
      <Fourthcontainer />
      <Ninthcontainer />
      <Footer />
    </div>
  ) : (
    <div className=" w-[100vw] h-[100vh] bg-[#100f0f]">
      <div class="maincard relative top-[45vh] left-10 2xlarge:left-[40vw]">
        <div class="mainloader">
          <p>Loading</p>
          <div class="words">
            <span class="word">Movies</span>
            <span class="word">Tv shows</span>
            <span class="word">Posters</span>
            <span class="word">News</span>
            <span class="word">Trailers</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maincontainer;
