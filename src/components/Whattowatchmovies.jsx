import React from 'react'
import Header from "./Header"
import { Link } from 'react-router-dom';
import { GrAnnounce } from 'react-icons/gr';
import { FaFire } from 'react-icons/fa';

const Whattowatchmovies = ({ finalairingtoday }) => {
    return (

        <div className=' bg-black w-[100vw] h-[100vh]'>
            <Header />
            {finalairingtoday &&
                <div className=" w-[100vw] h-[60vh]" style={{
                    background: `url(https://image.tmdb.org/t/p/original/${finalairingtoday.backdrop_path})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: "no-repeat",
                    backgroundPositionY: '-20vh,0vw'
                }}>
                </div>
            }


        </div>
    )

}

export default Whattowatchmovies;