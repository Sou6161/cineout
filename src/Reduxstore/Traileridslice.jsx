import { createSlice } from "@reduxjs/toolkit";




export const Traileridslice = createSlice({
    name: "trailerid",
    initialState: {
        finaltrailerid:[],

    },
    reducers: {
        addtrailersid:(state,actions)=>{
            state.finaltrailerid = actions.payload
    },
    }
})
export default Traileridslice.reducer;
export const {addtrailersid} = Traileridslice.actions;