import React, { useEffect, useState } from 'react'
import { Rapidoptions } from '../constants/Rapidoptions'
import Primevideo from './Primevideo';
import { useDispatch } from 'react-redux'
import { addPrimevideodata } from '../Reduxstore/Watchprovidersslice';
import Netflixvideos from './Netflixvideos';
import Appletvvideos from './Appletvvideos';
import Huluvideos from './Huluvideos';
import Hbomaxvideos from './Hbomaxvideos';
import Peacockvideos from './Peacockvideos';
import Freeveevideos from './Freeveevideos';
import Paramountvideos from './Paramountvideos';
import Amcvideos from './Amcvideos';
import Starzvideos from './Starzvideos';
import Showtimevideos from './Showtimevideos';
import Fanfavourites from './Fanfavourites';

const Secondcontainer = () => {

    // const dispatch = useDispatch()

    const [moviesdata, setmoviesdata] = useState();
    const [fanwatch, setfanwatch] = useState()
    // const [providername, setprovidername] = useState()
    const [selectedProvider, setSelectedProvider] = useState('Prime Video');


    let watchdata = {};

    const fetchData = async () => {
        const response = await fetch(`https://imdb188.p.rapidapi.com/api/v1/getWhatsStreaming?country=US`, Rapidoptions)
        const data = await response.json();
        watchdata = data.data;
        if (watchdata) {
            setmoviesdata(watchdata);
            // setprovidername(watchdata);
            // dispatch(addPrimevideodata(watchdata))

        }


    }
    let fanwatchdata
    const fetchfanfavouritedata = async () => {
        const response = await fetch(`https://imdb188.p.rapidapi.com/api/v1/getFanFavorites?country=US`, Rapidoptions)
        const data = await response.json();
        fanwatchdata = data.data;
        if (fanwatchdata) {
            setfanwatch(fanwatchdata?.list);
            // setprovidername(watchdata);
            // dispatch(addPrimevideodata(watchdata))

        }


    }
    useEffect(() => {

        // fetchData();
        // fetchfanfavouritedata();
    }, [])


    useEffect(() => {
        if (moviesdata, fanwatch) {
            // console.log(moviesdata, "Hello moviesdata");
            // console.log(fanwatch,"hello fanfavourite data")
        }
    }, [moviesdata, fanwatch]);

    const handleProviderClick = (providerName) => {
        setSelectedProvider(providerName);

    }

    return (
        <><>
            <Fanfavourites finalfanwatch={fanwatch} />
        </><>

                <div className=' px-5 text-3xl leading-relaxed text-gray-900 dark:text-yellow-300 bg-black font-thin'>See <span className=' text-red-600 font-bold'>What</span> That <span className=' text-sky-300 font-bold'>Excites</span> You</div>
                <div className=' px-5 py-4 bg-black'>
                    <button className='text-white bg-blue-400 dark:bg-blue-500 rounded-lg text-[16px] font-bold px-3 py-2 text-center mr-3' onClick={() => handleProviderClick('Prime Video')}> <img className=' w-[1.3vw] rounded-lg justify-center inline mr-1 ' src="https://i.pinimg.com/474x/f5/de/23/f5de23352bd2620c5a1b2e193e6c8f20.jpg" alt="" />PRIME VIDEO</button>
                    <button className='text-white bg-blue-400 dark:bg-red-700 font-bold rounded-lg text-[16px] px-3 py-2 text-center mr-3' onClick={() => handleProviderClick('Netflix')}> <img className=' w-[1.2vw] rounded-xl justify-center inline-block mr-1' src="https://www.underconsideration.com/brandnew/archives/netflix_app_icon.jpg" alt="" />NETFLIX</button>
                    <button className='text-white bg-blue-400 dark:bg-yellow-500 rounded-lg text-[16px] font-bold px-3 py-2 text-center mr-3' onClick={() => handleProviderClick('Apple TV+')}> <img className='w-[1.3vw] rounded-xl justify-center inline-block mr-1' src="https://logowik.com/content/uploads/images/apple-tv1519.jpg" alt="" />APPLE TV+</button>
                    <button className='text-white bg-blue-400 dark:bg-green-500 rounded-lg text-[16px] font-bold px-3 py-2 text-center mr-3' onClick={() => handleProviderClick('Hulu')}> <img className='w-[1.3vw] rounded-xl justify-center inline-block mr-1' src="https://i.pinimg.com/474x/8c/d1/10/8cd11044810e9c8d6e2fc2597a2c68a0.jpg" alt="" />HULU</button>
                    <button className='text-white bg-blue-400 dark:bg-violet-900 rounded-lg text-[16px] font-bold px-3 py-2 text-center mr-3' onClick={() => handleProviderClick('Max')}> <img className='w-[1.6vw] rounded-xl justify-center inline-block mr-1' src="https://logos-world.net/wp-content/uploads/2022/01/HBO-Max-Logo.jpg" alt="" />MAX</button>
                    <button className='text-white bg-blue-400 dark:bg-zinc-700 rounded-lg text-[16px] font-bold px-3 py-2 text-center mr-3' onClick={() => handleProviderClick('Peacock')}> <img className='w-[1.3vw] rounded-xl justify-center inline-block mr-1' src="https://i.pinimg.com/736x/79/31/0e/79310ef5ca4e9027456695b12d0ecbe3.jpg" alt="" />PEACOCK</button>
                    <button className='text-white bg-blue-400 dark:bg-orange-700 rounded-lg text-[16px] font-bold px-3 py-2 text-center mr-3' onClick={() => handleProviderClick('Freevee')}> <img className='w-[1.3vw] rounded-xl justify-center inline-block mr-1' src="https://static.amazon.jobs/teams/610/thumbnails/freevee_social_banners_v4_543x543_%281%29.jpg?1661462055" alt="" />FREEVEE</button>
                    <button className='text-white bg-blue-400 dark:bg-purple-800 rounded-lg text-[16px] font-bold px-3 py-2 text-center mr-3' onClick={() => handleProviderClick('Paramount+')}> <img className='w-[1.6vw] h-[2.5vh] rounded-xl justify-center inline-block mr-1' src="https://cdn.mos.cms.futurecdn.net/N95U8Msuh66Drmf7kGjFAa.jpg" alt="" />PARAMOUNT+</button>
                    <button className='text-white bg-blue-400 dark:bg-rose-600 rounded-lg text-[16px] font-bold px-3 py-2 text-center mr-3' onClick={() => handleProviderClick('AMC+')}> <img className='w-[1.6vw] h-[2.5vh] rounded-xl justify-center inline-block mr-1' src="https://shop.amc.com/cdn/shop/products/AMCP-LOGO-100011-FR-RO_1445x.png?v=1650990755" alt="" />AMC+</button>
                    <button className='text-white bg-blue-400 dark:bg-cyan-600 rounded-lg text-[16px] font-bold px-3 py-2 text-center mr-3' onClick={() => handleProviderClick('STARZ')}> <img className='w-[1.3vw] h-[2vh] rounded-md justify-center inline-block mr-1' src="https://i0.wp.com/www.thewrap.com/wp-content/uploads/2017/12/StarzLogo.jpg?fit=618%2C412&ssl=1" alt="" />STARZ</button>
                    <button className='text-white bg-blue-400 dark:bg-amber-800	rounded-lg text-[16px] font-bold px-3 py-2 text-center mr-3' onClick={() => handleProviderClick('SHOWTIME')}> <img className='w-[1.6vw] h-[2.5vh] rounded-xl justify-center inline-block mr-1' src="https://www.cnet.com/a/img/resize/b5bbd7811f6980d51dd0af7983f5827d3aa5e92e/hub/2023/01/04/8922e8a7-64be-458a-9cc9-60f9086d25d2/3-10.png?auto=webp&fit=crop&height=900&width=1200" alt="" />SHOWTIME</button>
                </div>


                <div className='text-yellow-400 px-4 text-2xl font-semibold bg-black'>

                    {moviesdata && moviesdata.map((item, index) => {
                        if (item.providerName === selectedProvider) {

                            switch (index) {
                                case 0:
                                    return <Primevideo key={index} finalprimeprovidername={item.providerName} finalprimemovies={item.edges} />;
                                case 1:
                                    return <Netflixvideos key={index} finalnetflixprovidername={item.providerName} finalnetflixmovies={item.edges} />;
                                case 2:
                                    return <Appletvvideos key={index} finalappletvprovidername={item.providerName} finalappletvmovies={item.edges} />;
                                case 3:
                                    return <Huluvideos key={index} finalhuluprovidername={item.providerName} finalhulumovies={item.edges} />;
                                case 4:
                                    return <Hbomaxvideos key={index} finalhbomaxprovidername={item.providerName} finalhbomaxmovies={item.edges} />;
                                case 5:
                                    return <Peacockvideos key={index} finalpeacockprovidername={item.providerName} finalpeacockmovies={item.edges} />;
                                case 6:
                                    return <Freeveevideos key={index} finalfreeveeprovidername={item.providerName} finalfreeveemovies={item.edges} />;
                                case 7:
                                    return <Paramountvideos key={index} finalparamountprovidername={item.providerName} finalparamountmovies={item.edges} />;
                                case 8:
                                    return <Amcvideos key={index} finalamcprovidername={item.providerName} finalamcmovies={item.edges} />;
                                case 9:
                                    return <Starzvideos key={index} finalstarzprovidername={item.providerName} finalstarzmovies={item.edges} />;
                                case 10:
                                    return <Showtimevideos key={index} finalshowtimeprovidername={item.providerName} finalshowtimemovies={item.edges} />;
                                default:
                                    return null;
                            }
                        }

                    })}

                </div>

            </></>

    )
}

export default Secondcontainer;