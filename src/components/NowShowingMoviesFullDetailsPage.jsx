import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Headerfordetails from "./Headerfordetails";
import { API_OPTIONS } from "../constants/Apioptions";
import {
  RapidOptionsDetailsNowShowingMoviesDaimond,
  RapidOptionsDetailsNowShowingMoviesDaimondApidojo,
  RapidOptionsDetailsNowShowingMoviesDaimondTest13ApiDojo,
} from "../constants/RapidOptionsForDetails";
import { PiDotOutlineBold } from "react-icons/pi";
import { FaPlus } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import { IoStarOutline } from "react-icons/io5";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";
import { IoMdStar } from "react-icons/io";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { BiPlayCircle } from "react-icons/bi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper/modules";

const trimTextTo500Words = (text) => {
  const words = text.split(" ");
  if (words.length > 180) {
    return words.slice(0, 180).join(" ") + `...`;
  }
  return text;
};

const NumberFormatter = ({ number }) => {
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    } else {
      return num;
    }
  };

  return <span>{formatNumber(number)}</span>;
};

const convertDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const NowShowingMoviesFullDetailsPage = () => {
  const { id } = useParams();
  let movieId = id;
  if (id.startsWith("nm")) {
    movieId = id.substring(2);
  }
  console.log(movieId, "TMDB ID");

  const [NowShowingTrailerYTKEY, setNowShowingTrailerYTKEY] = useState(null);
  const [NowShowingIMDBID, setNowShowingIMDBID] = useState(null);
  const [NowShowingMoviesDetails, setNowShowingMoviesDetails] = useState(null);
  const [NowShowingImages, setNowShowingImages] = useState(null);
  const [NowShowingVideoGallery, setNowShowingVideoGallery] = useState(null);

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

  useEffect(() => {
    const getNowShowingPhotos = async () => {
      try {
        const response = await fetch(
          `https://imdb8.p.rapidapi.com/title/v2/get-images?tconst=${NowShowingIMDBID}&first=100`,
          RapidOptionsDetailsNowShowingMoviesDaimondApidojo
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const text = await response.text();
        if (text) {
          const data = JSON.parse(text);
          setNowShowingImages(data?.data?.title);
        }
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };
    getNowShowingPhotos();
  }, [NowShowingIMDBID]);

  useEffect(() => {
    NowShowingImages && console.log(NowShowingImages);
  }, [NowShowingImages, NowShowingIMDBID]);

  useEffect(() => {
    const getNowShowingVideos = async () => {
      try {
        const response = await fetch(
          `https://imdb8.p.rapidapi.com/title/get-videos?tconst=${NowShowingIMDBID}&limit=100&region=US`,
          RapidOptionsDetailsNowShowingMoviesDaimondTest13ApiDojo
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const text = await response.text();
        if (text) {
          const data = JSON.parse(text);
          setNowShowingVideoGallery(data?.resource);
        }
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };
    getNowShowingVideos();
  }, [NowShowingIMDBID]);

  useEffect(() => {
    NowShowingVideoGallery && console.log(NowShowingVideoGallery);
  }, [NowShowingVideoGallery]);

  const [isTrimmed, setIsTrimmed] = useState(true);
  const toggleTrim = () => {
    setIsTrimmed(false);
  };

  return (
    <div className=" w-[100vw] h-[1000vh] bg-[#030C16] text-red-600 ">
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
        <div className=" flex gap-10 bg-red-30 absolute left-[70vw] top-5">
          <h1 className=" whitespace-nowrap font-bold">CINEOUT RATING</h1>
          <span className=" absolute top-10 left-2 text-[1.5vw] text-yellow-400">
            <FaStar />{" "}
            <span className=" inline-bloc relative left-9 bottom-10 text-red-600  ">
              {NowShowingMoviesDetails?.ratingsSummary?.aggregateRating}/10
            </span>
            <span className=" relative right-8 text-white bottom-4 text-[0.9vw]">
              (
              <NumberFormatter
                number={NowShowingMoviesDetails?.ratingsSummary?.voteCount}
              />
              )
            </span>
          </span>
          <h1 className=" whitespace-nowrap font-bold">YOUR RATING</h1>
          <span className=" absolute top-8 left-[11vw] text-[1.5vw] text-yellow-400">
            <IoStarOutline />
          </span>
          <h1 className="absolute top-7 hover:underline cursor-pointer left-[12.8vw] text-[1.3vw] font-semibold">
            RATE
          </h1>

          <h1 className="font-bold">POPULARITY</h1>
          <span className="absolute left-[19vw] top-8 text-[2vw] border-2 border-lime-400 rounded-full p-[0.1vw]">
            {NowShowingMoviesDetails?.meterRanking?.currentRank > 5 ? (
              <FaArrowTrendDown />
            ) : (
              <FaArrowTrendUp />
            )}
          </span>
          <span className="absolute left-[22vw] top-8 text-[1.3vw] font-bold">
            {NowShowingMoviesDetails?.meterRanking?.currentRank}
          </span>
        </div>
        <div className=" absolute left-[78vw] top-[10vw] ">
          <div class="btn-donate h-[9vh] relative bottom-3">
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
          <div className=" flex cursor-pointer">
            <h1 className=" font-semibold text-yellow-400">
              {NowShowingMoviesDetails?.reviews?.total}{" "}
              <span className=" font-normal text-white mr-5 hover:underline">
                User reviews
              </span>{" "}
            </h1>{" "}
            <h1 className=" font-semibold text-yellow-400">
              {NowShowingMoviesDetails?.criticReviewsTotal?.total}{" "}
              <span className="font-normal text-white hover:underline">
                Critics reviews
              </span>
            </h1>
          </div>
          <div>
            <h1 className=" font-semibold text-yellow-400 cursor-pointer  ">
              <span className=" mr-3 inline-block">
                {NowShowingMoviesDetails?.metacritic?.metascore?.score}{" "}
              </span>
              <span className="font-normal text-white hover:underline">
                Metascore
              </span>
            </h1>
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
        <div className="absolute top-[132vw] bg-red-30 left-[25vw] text-[1.4vw]">
          <h1 className="font-bold">More Titles Like This</h1>
          <div className="absolute -mx-[2vw] w-[70vw] h-[65vh] mt-10 border-l-2 my-2 border-r-2 border-blue-600 flex flex-nowrap overflow-x-auto overflow-y-hidden no-scrollbar gap-10">
            {NowShowingMoviesDetails?.moreLikeThisTitles?.edges.map((data) => (
              <div className="flex flex-col min-w-[14vw] mx-5 h-[60vh] my-5  rounded-lg bg-black glow6 ">
                <img
                  className="min-w-[14vw] h-[40vh] object-center px-2 py-2 rounded-2xl"
                  src={data?.node?.primaryImage?.url}
                  alt="no image available"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://www.prokerala.com/movies/assets/img/no-poster-available.jpg";
                  }}
                />
                <h1 className="mx-5 text-[1.2vw] overflow-hidden whitespace-nowrap truncate">
                  {data?.node?.originalTitleText?.text}
                </h1>
                <span className=" mx-5 text-[1.2vw]">
                  ({data?.node?.releaseYear?.year})
                </span>

                <span className=" mx-5 text-yellow-400 inline-block flex ">
                  <IoMdStar className=" relative top-1 mr-2" />
                  {data?.node?.ratingsSummary?.aggregateRating}
                </span>
                <span className=" mx-5 text-[1.2vw] white-space-nowrap  truncate  ">
                  {data?.node?.titleGenres?.genres.map((movie) => {
                    return movie?.genre?.text;
                  })}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className=" inline-block relative top-[150vw] left-[25vw] text-[1.4vw] font-bold">
          <h1>User Reviews</h1>
        </div>
        <div
          className="relative top-[152vw] left-[25vw] w-[50vw] rounded-lg px-5 py-4"
          style={{
            backgroundColor: "black",
            height: isTrimmed ? "52vh" : "auto",
          }}
        >
          <h1 className=" review w-[10vw]">FEATURED REVIEW</h1>
          <div>
            {NowShowingMoviesDetails?.featuredReviews?.edges.map((data) => {
              const fullText = data?.node?.text?.originalText?.plainText;
              const trimmedText = trimTextTo500Words(fullText);

              return (
                <>
                  <div className=" mt-5">
                    <h1 className=" text-[1.4vw] font-bold text-lime-500">
                      "{data?.node?.summary?.originalText}"
                    </h1>
                  </div>
                  <p className="mt-7 text-[1vw] leading-7 font-normal overflow-y-scroll no-scrollbar">
                    {isTrimmed ? trimmedText : fullText}
                    {isTrimmed && (
                      <span
                        className="absolute top-[23vw] left-[48vw] cursor-pointer"
                        onClick={toggleTrim}
                      >
                        <IoMdArrowDropdownCircle />
                      </span>
                    )}
                  </p>
                </>
              );
            })}
          </div>
        </div>

        <div className=" absolute top-[215vw] left-[25vw] inline-block  ">
          <h1 className=" text-[1.4vw] font-bold ">Box Office</h1>
        </div>
        <div className=" absolute top-[219vw] left-[25vw]">
          <h1 className=" text-[1.2vw] font-semibold whitespace-nowrap mb-3">
            Budget
          </h1>
          <h1 className=" text-white text-[1vw] mb-5">
            ${NowShowingMoviesDetails?.productionBudget?.budget?.amount}
            (estimated)
          </h1>
          <h1 className=" whitespace-nowrap font-semibold mb-3 text-[1.2vw]">
            Opening weekend US & Canada
          </h1>
          <h1 className="text-white text-[1vw]">
            $
            {NowShowingMoviesDetails?.openingWeekendGross?.gross?.total?.amount}{" "}
          </h1>
          <div className=" absolute left-[25vw] top-1">
            <h1 className=" whitespace-nowrap mb-3 text-[1.2vw]">
              Gross US & Canada
            </h1>
            <h1 className=" text-white text-[1vw] mb-4">
              ${NowShowingMoviesDetails?.lifetimeGross?.total?.amount}
            </h1>
            <h1 className=" mb-3 text-[1.2vw]">Gross worldwide</h1>
            <h1 className="text-white text-[1vw]">
              ${NowShowingMoviesDetails?.worldwideGross?.total?.amount}
            </h1>
          </div>
        </div>
        <div className=" absolute top-[235vw] left-[25vw]  inline-block ">
          <h1 className="text-[1.4vw] font-bold mb-5">Technical Specs</h1>
          <h1 className=" text-[1.2vw] font-semibold mb-3 text-yellow-400">
            Runtime
            <span className=" ml-10 text-white">
              {" "}
              {
                NowShowingMoviesDetails?.runtime?.displayableProperty?.value
                  ?.plainText
              }
            </span>
          </h1>
          <h1 className="text-[1.2vw] font-semibold mb-3 text-yellow-400">
            Color
            <span className=" ml-10 text-blue-400">
              {NowShowingMoviesDetails?.technicalSpecifications?.colorations?.items.map(
                (data) => {
                  return data?.text;
                }
              )}
            </span>
          </h1>
          <h1 className="text-[1.2vw] font-semibold mb-3 text-yellow-400">
            Sound mix
            <span className=" ml-10 text-blue-400">
              {NowShowingMoviesDetails?.technicalSpecifications?.soundMixes?.items.map(
                (data) => {
                  return data?.text;
                }
              )}
            </span>
          </h1>
          <h1 className=" text-[1.2vw] font-semibold text-yellow-400">
            Aspect ratio
            <span className=" ml-10 text-white">
              {NowShowingMoviesDetails?.technicalSpecifications?.aspectRatios?.items.map(
                (data) => {
                  return data?.aspectRatio;
                }
              )}
            </span>
          </h1>
        </div>
        <div className=" absolute top-[255vw] left-[25vw]">
          <h1 className="text-[1.4vw] font-bold photogallery">Photo Gallery</h1>
        </div>
        <div className="w-[75vw] h-[30vh] bg-red-20 absolute top-[260vw] left-[22vw]">
          <div className="flex">
            <Swiper
              slidesPerView={3}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper"
            >
              {NowShowingImages?.images?.edges
                .slice(0, 12)
                .map((data, index) => (
                  <SwiperSlide key={index} className=" overflow-hidden">
                    <img
                      className=" hover:rounded-lg transition duration-300 ease-in-out hover:scale-110 mx-9 w-[20vw]  h-[30vh] object-top object-cover rounded-lg"
                      src={data?.node?.url}
                      alt=""
                    />
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
        <div className=" inline-block absolute top-[282vw] left-[25vw]">
          <h1 className="text-[1.4vw] font-bold videogallery">Video Gallery</h1>
        </div>
        <div className=" w-[73vw] h-[27vh] absolute top-[286vw] left-[22vw]">
          <div className="flex">
            <Swiper
              slidesPerView={3}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper"
            >
              {NowShowingVideoGallery?.videos.map((data2, index) => (
                <SwiperSlide key={index} className=" overflow-hidden hover:underline hover:text-yellow-400">
                  <div className=" hover:text-yellow-400 cursor-pointer">
                  <img
                    className=" mx-9 w-[20vw]  h-[27vh] mb-5  object-top object-center    rounded-lg"
                    src={data2?.image?.url}
                    alt=""
                  />

                  <BiPlayCircle className=" absolute bottom-[5vw] text-white font-bold text-[1.8vw] left-[3vw]" />
                  <h1 className=" text-[1.3vw] absolute left-[5vw] bottom-[5vw] font-semibold text-white ">
                    Trailer {convertDuration(data2?.durationInSeconds)}
                  </h1>

                  <h1 className=" mx-10 text-[1.2vw] font-semibold">
                    Watch {data2?.title}
                  </h1>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NowShowingMoviesFullDetailsPage;
