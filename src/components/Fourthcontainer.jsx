import React, { useEffect, useState } from "react";
import Intheaters from "./Intheaters";

const Fourthcontainer = () => {
  const [theatredata, settheatredata] = useState(null);
  const [maptheaterdata, setmaptheaterdata] = useState(null);
  const [lasttheaterdata, setlasttheaterdata] = useState(null);

  const gettheatredata = async () => {
    const response = await fetch(
      "https://www.myapifilms.com/imdb/inTheaters?token=9cf67054-cbe4-4aa6-92f3-13ea80b06125&format=json&language=hi"
    );
    const finalresponse = await response.json();
    const finaldata = finalresponse.data.inTheaters;
    // dispatchwatchseries(addwhattowatchseriesdata(finalresponse))
    settheatredata(finaldata);
  };

  useEffect(() => {
    // gettheatredata();
  }, []);

  useEffect(() => {
    if (theatredata) {
      const mapped = theatredata.map((item) => item.idIMDB);
      setmaptheaterdata(mapped);
    }
  }, [theatredata]);

    // useEffect(() => {
    //   maptheaterdata && console.log(maptheaterdata);
    // }, [maptheaterdata]);


  const gettheatrefinaldata = async () => {
    if (maptheaterdata) {
      const responses = await Promise.all(
        maptheaterdata.map(async (id) => {
          const response = await fetch(
            "http://www.omdbapi.com/?i=" + id + "&apikey=8c7000d3"
          );
          return response.json();
        })
      );
      setlasttheaterdata(responses);
    //   console.log(responses);
    }
  };

  useEffect(() => {
      // gettheatrefinaldata()
  }, [maptheaterdata]);

    // useEffect(() => {
    //   lasttheaterdata && console.log(lasttheaterdata);
    // }, [lasttheaterdata]);
  return (
    <div>
      <Intheaters finallasttheaterdata={lasttheaterdata} />
    </div>
  );
};

export default Fourthcontainer;
