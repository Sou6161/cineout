import { configureStore } from "@reduxjs/toolkit";
import Upcomingslice from "./Upcomingslice";
import NowShowingslice from "./NowShowingslice";
import UpcomingseriesSlice from "./UpcomingseriesSlice";
import { Watchprovidersslice } from "./Watchprovidersslice";
import Comingsoonslice from "./Comingsoonslice";
import Comingsoondate from "./Comingsoondate";
import Traileridslice from "./Traileridslice";
import Comingsoonpageslice from "./Comingsoonpageslice";
import NewsSlice from "./NewsSlice";
import MovieNewsSlice from "./MovieNewsSlice";
import TvNewsSlice from "./TvNewsSlice";
import CelebrityNewsSlice from "./CelebrityNewsSlice";
export const store = configureStore({
  reducer: {
    nowshowingit: NowShowingslice,
    upcomingshowingit: Upcomingslice,
    upcomingseriesshowingit: UpcomingseriesSlice,
    primevideoshowit: Watchprovidersslice,
    comingsoondateshowingit: Comingsoondate,
    comingsoonpagenumber: Comingsoonpageslice,
    finalsoonshowingit: Comingsoonslice,
    finaltrailersID: Traileridslice,
    finalTopNews: NewsSlice,
    MovieNewsSlice:MovieNewsSlice,
    TvNewsSlice:TvNewsSlice,
    CelebrityNewsSlice:CelebrityNewsSlice,
  },
});
