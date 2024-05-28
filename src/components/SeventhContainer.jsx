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
      const savedData = localStorage.getItem("Borntoday");
      if (savedData) {
        const data = JSON.parse(savedData);
        setBorntoday(data);
      } else {
        const response = await fetch(
          `https://imdb188.p.rapidapi.com/api/v1/getBornOn?month=${selectedDate.getMonth() + 1}&day=${selectedDate.getDate()}`,
          RapidoptionsCrawler
        );
        const data = await response.json();
        const Borntoday = data?.data?.list;
        localStorage.setItem("Borntoday", JSON.stringify(Borntoday));
        setBorntoday(Borntoday);
      }
    };

    // getBorntoday();
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
           <span className=" text-purple-700 text-[5vh] ">B</span>orn <span className=" text-blue-600">T</span>oday
          </h1>
          <div className="inline-block relative top-9 ml-[3vw]">
            <DatePicker className=" bg-purple-400 font-bold w-[5.5vw] rounded-md cursor-pointer" selected={selectedDate} onChange={(date) => setSelectedDate(date)} />
          </div>
        </div>

        <div className=" text-slate-800 ml-10">
          <h1>People born on {selectedDate.getMonth() + 1}-{selectedDate.getDate()}</h1>
        </div>
      </div>
      <div className="">
        <div className="flex h-[30vh] ml-10 gap-10 mb-10 overflow-x-auto no-scrollbar">
          {Borntoday &&
            Borntoday.map((people, index) => {
              return (
                <div className="flex flex-col items-center">
                  <img
                    className=" min-w-[10vw] h-[22vh] rounded-full transition-all duration-300 border-2 border-red-600 cursor-pointer filter grayscale hover:grayscale-0"
                    src={people?.primaryImage?.imageUrl}
                    alt=" no image"
                  />
                  <h1 className=" text-white">{people.nameText.text}</h1>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default SeventhContainer;
