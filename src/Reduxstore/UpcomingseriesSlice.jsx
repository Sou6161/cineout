import { createSlice } from "@reduxjs/toolkit";




export const UpcomingseriesSlice = createSlice({
    name: "upcomingseriesSlice",
    initialState: {
        upcomingseriesshowit: null,

    },
    reducers: {
        addUpcomingseriesdata: (state, actions) => {
            state.upcomingseriesshowit = actions.payload;
        }
    }
})
export default UpcomingseriesSlice.reducer;
export const { addUpcomingseriesdata } = UpcomingseriesSlice.actions;