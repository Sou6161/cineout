import React from 'react'
import { Link } from 'react-router-dom'
import { RiMenuFoldLine } from "react-icons/ri";



const Rightheader = () => {


    return (

        <div className='  flex items-center justify-around '>

            <div className="links flex gap-10  mr-[100px] font-['Ubuntu-Medium'] ">
                {["LANG", "SIGN UP", "PRO VERSION"].map((item, index) =>{ return(<Link key={index}>{item}</Link>)})}

            </div>

            <div className=' mr-10 text-3xl cursor-pointer'>
                <RiMenuFoldLine />

            </div>


        </div>

    )
}

export default Rightheader