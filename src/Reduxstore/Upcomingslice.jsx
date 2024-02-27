import { createSlice } from "@reduxjs/toolkit";




export const Upcomingslice = createSlice({
    name: "upcomingslice",
    initialState: {
        upcomingshowit: null,

    },
    reducers: {
        addUpcomingdata: (state, actions) => {
            state.upcomingshowit = actions.payload;
        }
    }
})
export default Upcomingslice.reducer;
export const { addUpcomingdata } = Upcomingslice.actions;