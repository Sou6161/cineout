import { createSlice } from "@reduxjs/toolkit";




export const Comingsoonslice = createSlice({
    name: "comingsoon",
    initialState: {
        finalcomingsoonmovies:[],

    },
    reducers: {
        addfinalcomingsoonmovies:(state,actions)=>{
            // console.log("addfinalcomingsoonmovies called with payload:", actions.payload);

            state.finalcomingsoonmovies = actions.payload
    },
    }
})
export default Comingsoonslice.reducer;
export const {addfinalcomingsoonmovies} = Comingsoonslice.actions;