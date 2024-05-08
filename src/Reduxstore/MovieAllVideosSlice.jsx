import { createSlice } from "@reduxjs/toolkit";




export const MovieAllVideosSlice = createSlice({
    name: "AllVideos",
    initialState: {
        AllVideos:[],

    },
    reducers: {
        addAllVideos:(state,actions)=>{
            state.AllVideos = actions.payload
    },
    }
})
export default MovieAllVideosSlice.reducer;
export const {addAllVideos} = MovieAllVideosSlice.actions;