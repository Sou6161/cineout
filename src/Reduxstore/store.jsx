import { configureStore } from "@reduxjs/toolkit";
import Upcomingslice from "./Upcomingslice";
import  NowShowingslice  from "./NowShowingslice";
import UpcomingseriesSlice from "./UpcomingseriesSlice";
import { Watchprovidersslice } from "./Watchprovidersslice";



export const store = configureStore({
    reducer:{
         nowshowingit: NowShowingslice,
         upcomingshowingit:Upcomingslice,
         upcomingseriesshowingit:UpcomingseriesSlice,
         primevideoshowingit:Watchprovidersslice,

    }
})