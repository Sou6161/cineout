import { createSlice } from "@reduxjs/toolkit";




export const Watchprovidersslice = createSlice({
    name: "Watchprovidersslice",
    initialState: {
        primevideoshowit: [],
        netflixshowit: [],
        appletvsliceshowit: [],
        Hulushowit: [],
        maxshowit: [],
        peacockshowit: [],
        freeveeshowit: [],
        paramountshowit: [],
        amcsliceshowit: [],
        starzsliceshowit: [],
        showtimeshowit: [],
        addwhattowatchmoviesdata:[],
        addwhattowatchseriesdata:[],
        addNowshowingdata:[],
    },
    reducers: {
        addPrimevideodata: (state, actions) => {
            state.primevideoshowit = actions.payload;
        },
        addnetflixdata: (state, actions) => {
            state.netflixshowit = actions.payload
        },
        addappletvdata: (state, actions) => {
            state.appletvshowit = actions.payload
        },
        addhuludata: (state, actions) => {
            state.Hulushowit = actions.payload
        },
        addmaxdata: (state, actions) => {
            state.maxshowit = actions.payload
        },
        addpeacockdata: (state, actions) => {
            state.peacockshowit = actions.payload
        },
        addfreeveedata: (state, actions) => {
            state.freeveeshowit = actions.payload
        },
        addparamountdata: (state, actions) => {
            state.paramountshowit = actions.payload
        },
        addamcdata: (state, actions) => {
            state.amcshowit = actions.payload
        },
        addstarzdata: (state, actions) => {
            state.starzshowit = actions.payload
        },
        addshowtimedata: (state, actions) => {
            state.showtimeshowit = actions.payload
        },
        addwhattowatchmoviesdata: (state, actions) => {
            state.whattowatchmovieswshowit = actions.payload
        },
        addwhattowatchseriesdata: (state, actions) => {
            state.whattowatchseriesshowit = actions.payload
        },
        addairingtodaydata:(state, actions) => {
            state.airingtodayshowit = actions.payload
        },
    }
})
export default Watchprovidersslice.reducer;
export const { addPrimevideodata, addnetflixdata, addappletvdata, addhuludata, addmaxdata, addpeacockdata, addfreeveedata, addparamountdata, addamcdata, addstarzdata, addshowtimedata,addwhattowatchmoviesdata,addwhattowatchseriesdata,addairingtodaydata } = Watchprovidersslice.actions;