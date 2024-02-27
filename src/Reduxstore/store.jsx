import { configureStore } from "@reduxjs/toolkit";
import Upcomingslice from "./Upcomingslice";
import  NowShowingslice  from "./NowShowingslice";



export const store = configureStore({
    reducer:{
         nowshowingit: NowShowingslice,
         upcomingshowingit:Upcomingslice,

    }
})