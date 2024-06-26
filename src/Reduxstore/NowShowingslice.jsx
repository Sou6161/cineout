import { createSlice } from "@reduxjs/toolkit";




export const NowShowingslice = createSlice({
    name: "nowshowingdata",
    initialState: {
        nowshowit: null,

    },
    reducers: {
        addNowshowingdata: (state, actions) => {    
            state.nowshowit = actions.payload;
        }
    }
})
export default NowShowingslice.reducer;
export const { addNowshowingdata } = NowShowingslice.actions;