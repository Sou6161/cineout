import React from 'react'
import Leftheader from './Leftheader'
import Midheader from './Midheader'
import Rightheader from './Rightheader'

const Header = () => {
  return (
    <div className=' flex justify-between p-5 text-xl font-semibold '>
    <Leftheader/>
    <Midheader/>
    <Rightheader/>
    </div>
  )
}

export default Header