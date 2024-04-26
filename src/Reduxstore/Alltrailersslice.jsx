import { createSlice } from "@reduxjs/toolkit";




export const Alltrailersslice = createSlice({
    name: "Alltrailer",
    initialState: {
        Alltrailers:[],

    },
    reducers: {
        addAlltrailers:(state,actions)=>{
            state.Alltrailers = actions.payload
    },
    }
})
export default Alltrailersslice.reducer;
export const {addAlltrailers} = Alltrailersslice.actions;