import React, { useEffect, useState } from 'react'
import { API_OPTIONS } from '../constants/Apioptions';
import { useDispatch } from 'react-redux';
import { addairingtodaydata, addwhattowatchmoviesdata, addwhattowatchseriesdata } from '../Reduxstore/Watchprovidersslice';
import Whattowatchmovies from './Whattowatchmovies';
import Whattowatchseries from './Whattowatchseries';


const Whattowatch = () => {

  const [whattowatchmovies, setwhattowatchmovies] = useState(null)
  const [whattowatchseries, setwhattowatchseries] = useState(null)
  const [airingtoday, setairingtoday] = useState(null)
  const dispatchwatchmovies = useDispatch()
  const dispatchwatchseries = useDispatch()
  // const dispatchairingtoday = useDispatch()

  const getwhattowatchmovies = async () => {

    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      API_OPTIONS
    );
    const jsonmovies = await data.json()
    const finaldatamovies = jsonmovies.results
    dispatchwatchmovies(addwhattowatchmoviesdata(finaldatamovies))
    setwhattowatchmovies(finaldatamovies)

  }

  const getwhattowatchseries = async () => {

    const data = await fetch(
      "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
      API_OPTIONS
    );
    const jsonseries = await data.json()
    const finaldataseries = jsonseries.results
    dispatchwatchseries(addwhattowatchseriesdata(finaldataseries))
    setwhattowatchseries(finaldataseries)


  }

  const getairingtodaydata = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1",
      API_OPTIONS
    );
    const jsonairingtoday = await data.json()
    const finalairingdata = jsonairingtoday.results
    // dispatchairingtoday(addairingtodaydata(finalairingdata))
    let airingdata = finalairingdata[(Math.random() * finalairingdata.length).toFixed()];
    setairingtoday(airingdata)
  
  }


  useEffect(() => {
    !whattowatchmovies && getwhattowatchmovies();
    !whattowatchseries && getwhattowatchseries();
    !airingtoday && getairingtodaydata();
  }, [])

  useEffect(() => {
     airingtoday && console.log(airingtoday);
  }, [airingtoday]);
  
  


  return whattowatchmovies && whattowatchseries && airingtoday ? (
    <div>
      <Whattowatchmovies finalwatchmovies={whattowatchmovies} finalairingtoday={airingtoday} />
      <Whattowatchseries finalwatchseries={whattowatchseries} />
    </div>
  ) : <h1 className=' text-white'>loading</h1>
}

export default Whattowatch;