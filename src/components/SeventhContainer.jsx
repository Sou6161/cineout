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

        // Format month and day
        const formatNumber = (num) => (num < 10 ? `0${num}` : `${num}`);
        const month = formatNumber(selectedDate.getMonth() + 1);
        const day = formatNumber(selectedDate.getDate());

        const response = await fetch(
          `https://imdb188.p.rapidapi.com/api/v1/getBornOn?month=${month}&day=${day}`,
          RapidoptionsCrawler
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

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

    // getBorntoday();
  }, [selectedDate]);

  useEffect(() => {
    Borntoday && console.log(Borntoday);
  }, [Borntoday]);

  return (
    <>
      <div className="min-h-[14vh] bg-red-30 -mt-[10vw] xsmall:-mt-[8vw] small:-mt-[6vw] medium:-mt-[4vw] large:-mt-[2vw] p-2 xsmall:p-4">
        <div className="flex flex-col items-start justify-between">
          <div className="flex items-center justify-between w-full mb-2">
            <h1 className=" ml-5 text-lg xsmall:text-xl small:text-2xl medium:text-xl large:text-2xl xlarge:text-[2vw] text-amber-400">
              <span className="text-purple-700 text-[4vh] xsmall:text-[5vh] small:text-[6vh] medium:text-[5vh] large:text-[6vh] xlarge:text-[6vh] glowText3">
                B
              </span>
              orn{" "}
              <span className="text-[4vh] xsmall:text-[5vh] small:text-[6vh] medium:text-[5vh] large:text-[6vh] xlarge:text-[6vh] glowText3">
                T
              </span>
              oday
            </h1>
            <div className="w-[22%] xsmall:w-auto mr-[24vw] xsmall:mr-[10vw] small:mr-[5vw] medium:mr-[5vw]">
              <DatePicker
                className="bg-white font-bold w-full xsmall:w-[32vw] small:w-[28vw] medium:w-[24vw] large:w-[20vw] xlarge:w-[16vw] rounded-md cursor-pointer p-1 xsmall:p-2 text-xs xsmall:text-sm small:text-base medium:text-lg"
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
              />
            </div>
          </div>
        </div>

        <div className="text-stone-600 ml-5 text-sm xsmall:text-base small:text-lg small:-mt-1 medium:text-[2vw] medium:-mt-3 large:text-[1.5vw] xlarge:text-[1vw] 2xlarge:text-[1.2vw] 2xlarge:mt-1  xsmall:mt-3">
          <h1>
            People born on {selectedDate.getMonth() + 1}-
            {selectedDate.getDate()}
          </h1>
        </div>
      </div>
      <div className="px-2  xsmall:px-4 mb-10">
        <div className=" bg-lime-30 py-4 2xlarge:py-6 flex h-auto ml-0 xsmall:ml-2 small:ml-5 gap-3 xsmall:gap-4 small:gap-6 medium:gap-8 large:gap-10 w-full overflow-x-auto no-scrollbar pb-4 xsmall:pb-6">
          {Borntoday && Borntoday.length > 0 ? (
            Borntoday.map((people, index) => (
              <div key={index} className="flex-shrink-0">
                <div className="w-32 ml-2 xsmall:w-40 small:w-48 medium:w-52 large:w-56 xlarge:w-68 2xlarge:w-56">
                  <img
                    className="w-full h-32 xsmall:h-40 small:h-48 medium:h-52 large:h-56 xlarge:h-68 2xlarge:h-56 object-cover hover:scale-105 p-1 rounded-full transition-all duration-300 border-2 border-blue-600 cursor-pointer filter grayscale hover:grayscale-0 hover:shadow-glow"
                    src={people?.primaryImage?.imageUrl}
                    alt="no image"
                  />
                </div>
                <div>
                  <h1 className="text-white font-semibold text-center mt-2 text-sm xsmall:text-[3.5vw]  small:text-base medium:text-lg large:text-xl xlarge:text-2xl truncate">
                    {people.nameText.text}
                  </h1>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white">No data available for this date.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SeventhContainer;
