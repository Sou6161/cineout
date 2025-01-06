import { useEffect, useState } from "react";
import { RapidoptionsCrawler } from "../constants/Rapidoptions";
import { Calendar, Sparkles, Cake, Star } from "lucide-react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SeventhContainer = () => {
  const [Borntoday, setBorntoday] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const getBorntoday = async () => {
      try {
        localStorage.removeItem("Borntoday");
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

    getBorntoday();
  }, [selectedDate]);

  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-black py-10 px-4">
      <div className="max-w-8xl mx-5">
        {/* Header Section */}
        <div className="relative flex flex-col xsmall:flex-row items-start xsmall:items-center justify-between mb-8 space-y-4 xsmall:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Cake className="w-8 h-8 text-purple-500 animate-pulse" />
              <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
              Born Today
            </h1>
          </div>

          <div className="relative">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              className="w-full xsmall:w-[32vw] small:w-[28vw] medium:w-[24vw] large:w-[20vw] xlarge:w-[16vw] 
                       bg-gray-800 text-white border-2 border-purple-500/30 rounded-xl p-3
                       focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20
                       transition-all duration-300 cursor-pointer"
            />
            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-400 w-5 h-5" />
          </div>
        </div>

        <div className="text-gray-400 mb-6 text-sm xsmall:text-base small:text-lg medium:text-[1.5vw] large:text-[1.2vw] xlarge:text-[1vw]">
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4 text-yellow-400" />
            <h2>Celebrating Birthdays on {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</h2>
          </div>
        </div>

        {/* Celebrity Grid */}
        <div className="relative">
          <div className="overflow-x-auto no-scrollbar">
            <div className="flex gap-6 pb-8">
              {Borntoday && Borntoday.length > 0 ? (
                Borntoday.map((people, index) => (
                  <div
                    key={index}
                    className="group relative flex-shrink-0"
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                  >
                    <div className="w-32 xsmall:w-40 small:w-48 medium:w-52 large:w-56 xlarge:w-68 2xlarge:w-56
                                  perspective-1000">
                      <div className="relative transform transition-all duration-500 group-hover:scale-105">
                        {/* Image Container */}
                        <div className="relative overflow-hidden rounded-full">
                          <img
                            className="w-full h-32 xsmall:h-40 small:h-48 medium:h-52 large:h-56 xlarge:h-68 2xlarge:h-56 
                                     object-cover transition-all duration-500
                                     filter grayscale group-hover:grayscale-0
                                     transform group-hover:scale-110"
                            src={people?.primaryImage?.imageUrl}
                            alt="celebrity"
                          />
                          {/* Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-purple-900/40 to-transparent 
                                      opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-4 left-0 right-0 text-center">
                              <Sparkles className="w-5 h-5 text-yellow-400 mx-auto mb-2" />
                            </div>
                          </div>
                        </div>
                        
                        {/* Border Glow Effect */}
                        <div className="absolute -inset-0.5 bg-gradien-to-r from-purple-600 to-pink-600 rounded-full opacity-0 
                                    group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm"></div>
                      </div>

                      {/* Name Card */}
                      <div className="mt-4 text-center transform transition-all duration-300">
                        <h2 className="text-sm xsmall:text-base medium:text-lg large:text-xl xlarge:text-2xl
                                   font-bold bg-gradient-to-r from-white via-purple-200 to-white text-transparent bg-clip-text
                                   group-hover:from-purple-400 group-hover:via-pink-400 group-hover:to-red-400
                                   truncate px-2">
                          {people.nameText.text}
                        </h2>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center w-full py-12">
                  <p className="text-gray-400 text-lg">No birthdays found for this date.</p>
                </div>
              )}
            </div>
          </div>

          {/* Gradient Fade Edges */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-900 to-transparent"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-900 to-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default SeventhContainer;