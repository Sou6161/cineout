import React from 'react'
import Header from "./Header"


const Discovermoviesfan = ({finalairingtoday}) => {
  return (
    <div className=' bg-blue-300  h-[67vh] w-[100vw] scrollbar-hide overflow-auto '>
            <Header />
            {finalairingtoday &&
                <div className="  w-[100vw] h-[60vh]" style={{
                    background: `url(https://image.tmdb.org/t/p/original/${finalairingtoday.backdrop_path})`,
                    backgroundPosition: 'center',
                    backgroundSize: '80em',
                    backgroundRepeat: "no-repeat",
                    backgroundPositionY: '-vh,0vw',
                    
                }}>
                </div>
            }


        </div>
  )
}

export default Discovermoviesfan