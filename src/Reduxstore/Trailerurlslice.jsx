import { createSlice } from "@reduxjs/toolkit";




export const Trailerurlslice = createSlice({
    name: "trailerurl",
    initialState: {
        finaltrailerurl:[],

    },
    reducers: {
        addtrailersurl:(state,actions)=>{
            state.finaltrailerurl = actions.payload
    },
    }
})
export default Trailerurlslice.reducer;
export const {addtrailersurl} = Trailerurlslice.actions;