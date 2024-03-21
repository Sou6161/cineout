import React from 'react'
import Leftheader from './Leftheader'
import Midheader from './Midheader'
import Rightheader from './Rightheader'

const Header = () => {
  return (
    <div className=' flex items-center justify-between z-50 text-xl font-semibold overflow-hidden  bg-transparent fixed w-full '>
    <Leftheader/>
    <Midheader/>
    <Rightheader/>
    </div>
  )
}

export default Header;