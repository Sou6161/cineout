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
          }&day=${selectedDate.getDate()}`,
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
    Borntoday && console.log(Borntoday);
  }, [Borntoday]);

  return (
    <>
      <div className=" mb-5 h-[14vh] bg-red-30 -mt-20">
        <div className=" text-2xl text-red-600 inline-block relative top-[12vw] ml-3">
          <FaEllipsisVertical />
        </div>
        <div className="flex group">
          <h1 className=" text-xl text-amber-400 ml-10 inline-block relative top-2">
            <span className=" text-purple-700 text-[5vh] glowText3 ">B</span>orn{" "}
            <span className=" text-[5vh] glowText3">T</span>oday
          </h1>
          <div className="inline-block relative top-3 ml-[8vw]">
            <DatePicker
              className=" bg-white font-bold w-[32vw] rounded-md cursor-pointer"
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
            />
          </div>
        </div>

        <div className=" text-slate-400 text-[3vw] ml-10">
          <h1>
            People born on {selectedDate.getMonth() + 1}-
            {selectedDate.getDate()}
          </h1>
        </div>
      </div>
      <div className="">
        <div className="flex h-[30vh] ml-5 gap-10  w-[96vw]  mb-10 bg-lime-20 overflow-x-auto no-scrollbar">
          {Borntoday && Borntoday.length > 0 ? (
            Borntoday.map((people, index) => (
              <div
                key={index}
                className=" w-[100vw] bg-red-300 flex flex-col ml-2 items-center  py-5  "
              >
                <img
                  className="w-[40vw] h-[18vh] hover:scale-105 p-1  rounded-full transition-all duration-300 border-2 border-blue-600 cursor-pointer filter grayscale hover:grayscale-0 hover:shadow-glow"
                  src={people?.primaryImage?.imageUrl}
                  alt="no image"
                />
                <h1 className="text-white ml-2 mt-2 whitespace-nowrap">{people.nameText.text}</h1>
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
