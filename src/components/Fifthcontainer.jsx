import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addfinalcomingsoonmovies } from "../Reduxstore/Comingsoonslice";
import { addcomingsoondate } from "../Reduxstore/Comingsoondate";
import ComingSoontheaters from "./ComingSoontheaters";
import { API_OPTIONS } from "../constants/Apioptions";

const Fifthcontainer = () => {
  const [comingsoontheaters, setcomingsoontheaters] = useState(null);
  const dispatchcomingsoon = useDispatch();
  const dispatchfinalcomingsoonmovies = useDispatch();



  const getcomingsoon = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=2`,
      API_OPTIONS
    );
    const finalresponse = await response.json();
    const finaldata = finalresponse.results;
    dispatchcomingsoon(addcomingsoondate(finaldata));
    setcomingsoontheaters(finaldata);
    // console.log(finaldata);
  };
  useEffect(() => {
    getcomingsoon();
  }, []);

  useEffect(() => {
    // comingsoontheaters && console.log(comingsoontheaters)
  }, [comingsoontheaters]);

  return (
    <>
      <ComingSoontheaters finalcomingsoonmoviestheaters={comingsoontheaters} />
    </>
  );
};

export default Fifthcontainer;
