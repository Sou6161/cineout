import React from 'react'
import { Link } from 'react-router-dom'



const Rightheader = () => {


    return (

        <div className=' ml-[3vw]  flex items-center justify-around '>

            <div className="links flex gap-10  mr-[100px] font-['Ubuntu-Medium'] text-red-600 ">
                {["LANG", "SIGN UP", "PRO VERSION"].map((item, index) =>{ return(<Link key={index}>{item}</Link>)})}

            </div>

            

        </div>

    )
}

export default Rightheader