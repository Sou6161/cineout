import { createSlice } from "@reduxjs/toolkit";




export const Videodataslice = createSlice({
    name: "Videosdata",
    initialState: {
        Videosdata:[],

    },
    reducers: {
        addvideosdata:(state,actions)=>{
            state.Videosdata = actions.payload
    },
    }
})
export default Videodataslice.reducer;
export const {addvideosdata} = Videodataslice.actions;