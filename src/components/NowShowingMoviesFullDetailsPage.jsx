import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Headerfordetails from "./Headerfordetails";
import { API_OPTIONS } from "../constants/Apioptions";
import { RapidOptionsDetailsNowShowingMoviesDaimond } from "../constants/RapidOptionsForDetails";
import { PiDotOutlineBold } from "react-icons/pi";
import { FaPlus } from "react-icons/fa6";

const NowShowingMoviesFullDetailsPage = () => {
  const { id } = useParams();
  let movieId = id;
  if (id.startsWith("tt")) {
    movieId = id.substring(2);
  }
  console.log(movieId, "TMDB ID");

  const [NowShowingTrailerYTKEY, setNowShowingTrailerYTKEY] = useState(null);
  const [NowShowingIMDBID, setNowShowingIMDBID] = useState(null);
  const [NowShowingMoviesDetails, setNowShowingMoviesDetails] = useState(null);

  useEffect(() => {
    const NowShowingTrailerYTKEY = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        API_OPTIONS
      );
      const data = await response.json();
      if (data?.results) {
        const trailerVideos = data.results.filter(
          (movie) => movie.type === "Trailer"
        );
        if (trailerVideos.length > 0) {
          const randomTrailer =
            trailerVideos[Math.floor(Math.random() * trailerVideos.length)];
          setNowShowingTrailerYTKEY(randomTrailer.key);
        } else {
          console.log("No trailer videos found in the data");
        }
      } else {
        console.log("No results found in the data");
      }
    };

    NowShowingTrailerYTKEY();
  }, [id]);

  useEffect(() => {
    NowShowingTrailerYTKEY &&
      console.log(NowShowingTrailerYTKEY, " MOVIE YT KEY");
  }, [NowShowingTrailerYTKEY]);

  useEffect(() => {
    const getNowShowingIMDBID = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/external_ids`,
        API_OPTIONS
      );
      const data = await response.json();
      setNowShowingIMDBID(data?.imdb_id);
    };
    getNowShowingIMDBID();
  }, []);

  useEffect(() => {
    NowShowingIMDBID && console.log(NowShowingIMDBID, "IMDB ID");
  }, [NowShowingIMDBID]);

  useEffect(() => {
    const NowShowingMoviesDetails = async () => {
      if (NowShowingIMDBID) {
        // Check if NowShowingIMDBID is available
        const response = await fetch(
          `https://imdb146.p.rapidapi.com/v1/title/?id=${NowShowingIMDBID}`,
          RapidOptionsDetailsNowShowingMoviesDaimond
        );
        const data = await response.json();
        setNowShowingMoviesDetails(data);
      } else {
        console.log("NowShowingIMDBID is not available");
      }
    };
    NowShowingMoviesDetails();
  }, [NowShowingIMDBID]);

  useEffect(() => {
    NowShowingMoviesDetails && console.log(NowShowingMoviesDetails);
  }, [NowShowingMoviesDetails]);

  return (
    <div className=" w-[100vw] h-[700vh] bg-[#030C16] text-red-600">
      <div className="">
        <Headerfordetails />
      </div>
      <div className=" w-[98vw] mx-auto mt-5 h-[76.5vh] border-2 border-lime-400 glow5 rounded-lg  ">
        {NowShowingTrailerYTKEY ? (
          <iframe
            className=" w-[97vw] mx-auto h-[75vh] relative top-1 rounded-lg"
            src={`https://www.youtube.com/embed/${NowShowingTrailerYTKEY}?si=HxKbpBA7t2t3ulUK`}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        ) : (
          <div></div>
        )}
      </div>

      <div className=" w-[100vw] h-[100vh] absolute bg-red-20 mt-10 border-t-[1px] border-gray-700">
        <div className="">
          <div>
            <h1 className=" relative top-[3vw] left-[10vw] text-[3vw] text-purple-500 font-semibold ">
              {NowShowingMoviesDetails?.titleText?.text}
            </h1>
            <h1 className=" flex relative left-[10.2vw] top-12">
              <span className=" mr-2">
                {NowShowingMoviesDetails?.releaseDate?.year}
              </span>
              <PiDotOutlineBold className=" relative top-[0.3vw] right-1" />

              <span className=" mr-2">
                {" "}
                {NowShowingMoviesDetails?.certificate?.rating}
              </span>
              <PiDotOutlineBold className=" relative top-[0.3vw] right-1" />
              <span>
                {
                  NowShowingMoviesDetails?.runtime?.displayableProperty?.value
                    ?.plainText
                }
              </span>
            </h1>
          </div>
          <div>
            <img
              className=" w-[12.5vw] h-[38vh] glow4   relative left-[10vw] top-[5vw] rounded-lg object-cover"
              src={NowShowingMoviesDetails?.primaryImage.url}
              alt=""
            />
          </div>
        </div>
        <div className=" relative left-[27vw] ">
          <div className=" absolute bottom-[5vw] ">
            <span className=" text-white relative top-[9vw] text-[1.3vw]  ">
              Director
            </span>
            <h1 className=" relative top-[7vw] text-[1.3vw] left-[7vw] ">
              {NowShowingMoviesDetails?.directorsPageTitle.map((data) => {
                return data?.credits.map((director) => {
                  return director?.name?.nameText?.text;
                });
              })}
            </h1>
            <span className=" text-white relative top-[9.5vw] text-[1.3vw]">
              Writers
            </span>
            <h1 className=" relative top-[7.6vw] text-[1.3vw] left-[7vw]">
              {NowShowingMoviesDetails?.writers.map((data) => {
                return data?.credits.map((writers) => {
                  return writers?.name?.nameText?.text;
                });
              })}
            </h1>
            <span className=" text-white relative top-[10vw] text-[1.3vw]">
              Stars
            </span>
            <h1 className=" relative top-[8vw] left-[7vw] text-[1.3vw]">
              {NowShowingMoviesDetails?.castPageTitle?.edges.map((data) => {
                return data?.node?.name?.nameText?.text;
              })}
            </h1>
            <span className=" text-white relative top-[10vw] text-[1.3vw]">
              Genre
            </span>
            <h1 className=" relative top-[8.1vw] left-[7vw] text-[1.3vw]">
              {NowShowingMoviesDetails?.genres.genres.map((data) => {
                return data?.text;
              })}
            </h1>
          </div>
        </div>
        <div className=" absolute left-[80vw] top-[10vw] ">
          <div class="btn-donate h-[8vh] relative bottom-3">
            <span className=" relative bottom-5 left-3">
              {" "}
              <span className=" relative top-5 right-4 ">
                <FaPlus className="" />
              </span>
              Add to Watchlist
            </span>
            <h1 className=" relative bottom-4 text-black  ">
              {
                NowShowingMoviesDetails?.engagementStatistics
                  ?.watchlistStatistics?.displayableCount?.text
              }
            </h1>
          </div>
          <div>
            <h1>kgigiig</h1>
          </div>
        </div>

        <div className=" bg-red-30 absolute left-[25vw] top-[33vw]">
          <h1 className=" text-[1.4vw] font-bold">STORYLINE</h1>
          <p className=" w-[60vw] text-[1.1vw] mt-5">
            {NowShowingMoviesDetails?.plot?.plotText?.plainText}
          </p>
        </div>

        <div className=" absolute top-[45vw] left-[25vw] text-[1.4vw] font-bold">
          <h1>TOP CAST</h1>
          <div className="flex justify-between mt-10">
            <div>
              {NowShowingMoviesDetails?.cast?.edges.slice(0, 8).map((data) => (
                <div>
                  <img
                    className=" w-[6vw] h-[12vh] rounded-full object-cover blur-[3px] hover:blur-0 border-2 border-cyan-400 hover:border-purple-500 "
                    src={
                      data?.node?.name?.primaryImage?.url
                        ? data?.node?.name?.primaryImage?.url
                        : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
                    }
                    alt="no image available"
                  />
                  <div className=" relative bottom-[5vw] left-[8vw]">
                    <h1 className=" font-normal text-white">
                      {data?.node?.name?.nameText?.text}
                    </h1>
                    <h1 className=" font-normal">
                      {data?.node?.characters.map((data) => {
                        return data?.name;
                      })}
                    </h1>
                  </div>
                </div>
              ))}
            </div>
            <div>
              {NowShowingMoviesDetails?.cast?.edges.slice(8, 16).map((data) => (
                <div className=" relative left-[12vw]">
                  <img
                    className=" w-[6vw] h-[12vh] rounded-full object-cover blur-[3px] hover:blur-0 border-2 border-cyan-400 hover:border-purple-500 "
                    src={
                      data?.node?.name?.primaryImage?.url
                        ? data?.node?.name?.primaryImage?.url
                        : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
                    }
                    alt="no image available"
                  />
                  <div className=" relative bottom-[5vw] left-[8vw]">
                    <h1 className=" font-normal text-white">
                      {data?.node?.name?.nameText?.text}
                    </h1>
                    <h1 className=" font-normal">
                      {data?.node?.characters.map((data) => {
                        return data?.name;
                      })}
                    </h1>
                  </div>
                </div>
              ))}
            </div>
            <div>
              {NowShowingMoviesDetails?.cast?.edges.slice(16).map((data) => (
                <div className=" relative left-[22vw]">
                  <img
                    className=" w-[6vw] h-[12vh] rounded-full object-cover blur-[3px] hover:blur-0 border-2 border-cyan-400 hover:border-purple-500 "
                    src={
                      data?.node?.name?.primaryImage?.url
                        ? data?.node?.name?.primaryImage?.url
                        : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
                    }
                    alt="no image available"
                  />
                  <div className=" relative bottom-[5vw] left-[8vw]">
                    <h1 className=" font-normal text-white">
                      {data?.node?.name?.nameText?.text}
                    </h1>
                    <h1 className=" font-normal">
                      {data?.node?.characters.map((data) => {
                        return data?.name;
                      })}
                    </h1>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NowShowingMoviesFullDetailsPage;
