import React from 'react'
import Leftheader from './Leftheader'
import Midheader from './Midheader'
import Rightheader from './Rightheader'

const Header = () => {
  return (
    <div className=' flex items-center justify-between z-50 text-xl font-semibold bg-slate-700   overflow-hidden '>
    <Leftheader/>
    <Midheader/>
    <Rightheader/>
    </div>
  )
}

export default Header;