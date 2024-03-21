import React, { useEffect, useState } from "react";
import { Rapidoptions } from "../constants/Rapidoptions";
import Top10data from "./Top10data";

const Thirdcontainer = () => {
  const [weekdata, setweekdata] = useState(null);

  const getweekdata = async () => {
    const response = await fetch(
      "https://imdb188.p.rapidapi.com/api/v1/getWeekTop10",
      Rapidoptions
    );
    const finalresponse = await response.json();
    const finaldata = finalresponse.data;
    // dispatchwatchseries(addwhattowatchseriesdata(finalresponse))
    setweekdata(finaldata);
  };

  useEffect(() => {
    // getweekdata()
  }, []);

//   useEffect(() => {
//     weekdata && console.log(weekdata);
//   }, [weekdata]);

  return( <div>

    <Top10data finalweekdata={weekdata}/>
  </div>)
};

export default Thirdcontainer;
