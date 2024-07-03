import { useEffect, useState } from "react";
import { RapidoptionsCrawler } from "../constants/Rapidoptions";
import { FaEllipsisVertical } from "react-icons/fa6";
import { TiArrowRightOutline } from "react-icons/ti";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SeventhContainer = () => {
  const [Borntoday, setBorntoday] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const getBorntoday = async () => {
      try {
        // Clear local storage to ensure fresh data
        localStorage.removeItem("Borntoday");

        const response = await fetch(
          `https://imdb188.p.rapidapi.com/api/v1/getBornOn?month=0${
            selectedDate.getMonth() + 1
          }&day=0${selectedDate.getDate()}`,
          RapidoptionsCrawler
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // console.log("API Response:", data); // Log the entire response

        if (data?.data?.list && Array.isArray(data.data.list)) {
          setBorntoday(data.data.list);
          localStorage.setItem("Borntoday", JSON.stringify(data.data.list));
        } else {
          console.error("Unexpected data structure:", data);
        }
      } catch (error) {
        console.error("Error fetching born today data:", error);
      }
    };

    getBorntoday();
  }, [selectedDate]);

  useEffect(() => {
    // Borntoday && console.log(Borntoday);
  }, [Borntoday]);

  return (
    <>
      <div className=" mb-5 h-[14vh] -mt-20">
        <div className=" text-[2vw] text-red-600 inline-block relative top-16 ml-3">
          <FaEllipsisVertical />
        </div>
        <div className="flex group">
          <h1 className=" text-[2vw] text-amber-400 ml-10 inline-block relative top-2">
            <span className=" text-purple-700 text-[5vh] glowText4 ">B</span>orn{" "}
            <span className=" text-[5vh] glowText4">T</span>oday
          </h1>
          <div className="inline-block relative top-7 ml-[3vw]">
            <DatePicker
              className=" bg-white font-bold w-[5.5vw] rounded-md cursor-pointer"
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
            />
          </div>
        </div>

        <div className=" text-slate-700 ml-10">
          <h1>
            People born on {selectedDate.getMonth() + 1}-
            {selectedDate.getDate()}
          </h1>
        </div>
      </div>
      <div className="">
        <div className="flex h-[30vh] ml-10 gap-10  w-[96vw]  mb-10 overflow-x-auto no-scrollbar">
          {Borntoday && Borntoday.length > 0 ? (
            Borntoday.map((people, index) => (
              <div
                key={index}
                className="flex flex-col items-center ml-5  bg-red-30 py-5 mr-5"
              >
                <img
                  className="min-w-[10.5vw] object-cover hover:scale-105 p-1 h-[22vh] rounded-full transition-all duration-300 border-2 border-blue-600 cursor-pointer filter grayscale hover:grayscale-0 hover:shadow-glow"
                  src={people?.primaryImage?.imageUrl}
                  alt="no image"
                />
                <h1 className="text-white">{people.nameText.text}</h1>
              </div>
            ))
          ) : (
            <p>No data available for this date.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SeventhContainer;
