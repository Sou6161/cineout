// Routes.jsx
import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Header from "./Header" 
import Maincontainer from "./Maincontainer"   
import Fanfavourites from './Fanfavourites';
import Secondcontainer from './Secondcontainer';
import Whattowatch from './Whattowatch';
import Insideintheater from './Insideintheater';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />}  />
      <Route path="/signup" element={<Signup />} />
      <Route path="/fan-favourites" element={<Whattowatch/>}/>
      <Route path="/In-theaters" element={<Insideintheater/>}/>
      <Route path="/" element={
        <>
          {/* <Header/> */}
          <Maincontainer/>
          
        </>
      } />
    </Routes>
  )
}   

export default AppRoutes;
