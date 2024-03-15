import React, { useEffect, useState } from 'react'
import { API_OPTIONS } from '../constants/Apioptions';
import { useDispatch } from 'react-redux';
import { addairingtodaydata, addwhattowatchmoviesdata, addwhattowatchseriesdata } from '../Reduxstore/Watchprovidersslice';
import Whattowatchmovies from './Whattowatchmovies';
import Whattowatchseries from './Whattowatchseries';
import Discovermoviesfan from './Discovermoviesfan';


const Whattowatch = () => {

  const [whattowatchmovies, setwhattowatchmovies] = useState(null)
  const [whattowatchseries, setwhattowatchseries] = useState(null)
  const [airingtoday, setairingtoday] = useState(null)
  const [topratedmovies, settopratedmovies] = useState(null)
  const [topratedseries, settopratedseries] = useState(null)
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
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=2&sort_by=popularity.desc",
      API_OPTIONS
    );
    const jsonairingtoday = await data.json()
    const finalairingdata = jsonairingtoday.results
    // dispatchairingtoday(addairingtodaydata(finalairingdata))
    let airingdata = finalairingdata[(Math.random() * finalairingdata.length).toFixed()];
    setairingtoday(airingdata)

  }


  const gettopratedmoviedata = async()=>{
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      API_OPTIONS
    );
    const jsontoprated = await data.json()
    const finaltoprateddata = jsontoprated.results
    // dispatchairingtoday(addairingtodaydata(finalairingdata))
    settopratedmovies(finaltoprateddata)

  }
  const gettopratedseriesdata = async()=>{
    const data = await fetch(
      "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1",
      API_OPTIONS
    );
    const jsontoprated = await data.json()
    const finaltoprateddata = jsontoprated.results
    // dispatchairingtoday(addairingtodaydata(finalairingdata))
    settopratedseries(finaltoprateddata)

  }


  useEffect(() => {
    !whattowatchmovies && getwhattowatchmovies();
    !whattowatchseries && getwhattowatchseries();
    !airingtoday && getairingtodaydata();
    !topratedmovies && gettopratedmoviedata();
    !topratedseries && gettopratedseriesdata();
  }, [])

  useEffect(() => {
    topratedmovies && console.log(topratedmovies);
    topratedseries && console.log(topratedseries);

  }, [topratedmovies,topratedseries]);




  return whattowatchmovies && whattowatchseries && airingtoday ? (
    <div>
      <Discovermoviesfan finalairingtoday={airingtoday}/>
      <Whattowatchmovies finalwatchmovies={whattowatchmovies}  />
      <Whattowatchseries finalwatchseries={whattowatchseries} />
    </div>
  ) : <h1 className=' text-white'>loading</h1>
}

export default Whattowatch;