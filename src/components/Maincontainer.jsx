import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { addNowshowingdata } from "../Reduxstore/NowShowingslice"
import { useEffect } from "react"
import { API_OPTIONS } from "../constants/Apioptions"
import Nowshowingdata from './Nowshowingdata'
import Upcomingdata from './Upcomingdata'
import { addUpcomingdata } from '../Reduxstore/Upcomingslice'
import Upcomingseriesdata from './Upcomingseriesdata'
import Secondcontainer from './Secondcontainer'
import { addUpcomingseriesdata } from '../Reduxstore/UpcomingseriesSlice'
import Thirdcontainer from './Thirdcontainer'
import Fourthcontainer from './Fourthcontainer'




const Maincontainer = () => {

    const nowshowingdispatch = useDispatch()
    const upcomingdispatch = useDispatch()
    const upcomingseriesdispatch = useDispatch()
    const [finaldata, setfinaldata] = useState(null)
    const [finalupcomingdata, setfinalupcomingdata] = useState(null)
    const [finalupcomingseries, setfinalupcomingseries] = useState(null)




    const getNowshowingdata = async () => {

        const data = await fetch(
            "https://api.themoviedb.org/3/trending/all/day?language=en-US",
            API_OPTIONS
        );
        const json = await data.json()
        const finaldata = json.results
        nowshowingdispatch(addNowshowingdata(finaldata))
        let jsondata = finaldata[(Math.random() * finaldata.length).toFixed()];
        setfinaldata(jsondata)

    }

    const getUpcomingdata = async () => {
        const data = await fetch(`https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1`, API_OPTIONS)
        const json = await data.json();
        const upcomingjson = json.results
        upcomingdispatch(addUpcomingdata(upcomingjson))
        setfinalupcomingdata(upcomingjson)
        

    }

    const getupcomingseries = async () => {
        const data = await fetch(`https://api.themoviedb.org/3/trending/tv/day?language=en-US`, API_OPTIONS)
        const json = await data.json();
        const finaljson = json.results
        upcomingseriesdispatch(addUpcomingseriesdata(finaljson))
        setfinalupcomingseries(finaljson)
        



    }


    useEffect(() => {
        !finaldata && getNowshowingdata()
        !finalupcomingdata && getUpcomingdata()
        !finalupcomingseries && getupcomingseries()
    }, []);


   

    return finaldata && finalupcomingdata ? (
        <div className=' overflow-hidden overflow-x-hidden bg-black'>

            <Nowshowingdata nowfinal={finaldata} />
            <Upcomingdata nowupcomingfinal={finalupcomingdata} />
            <Upcomingseriesdata nowupcomingseries={finalupcomingseries} />
            <Secondcontainer />
            <Thirdcontainer/>
            <Fourthcontainer/>



        </div>

    ) : <h1>loading</h1>
}

export default Maincontainer;