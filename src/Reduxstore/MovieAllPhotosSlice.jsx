import { createSlice } from "@reduxjs/toolkit";




export const MovieAllPhotosSlice = createSlice({
    name: "AllPhotos",
    initialState: {
        AllPhotos:[],

    },
    reducers: {
        addAllPhotos:(state,actions)=>{
            state.AllPhotos = actions.payload
    },
    }
})
export default MovieAllPhotosSlice.reducer;
export const {addAllPhotos} = MovieAllPhotosSlice.actions;