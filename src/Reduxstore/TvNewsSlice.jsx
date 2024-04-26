import { createSlice } from "@reduxjs/toolkit";

export const TvNewsSlice = createSlice({
  name: "tvnewsslice",
  initialState: {
    TvNewsSlice: [],
  },
  reducers: {
    addTvNewsSlice: (state, actions) => {
      state.TvNewsSlice = actions.payload;
      // console.log("Payload received of date:", actions.payload);
    },
  },
});
export default TvNewsSlice.reducer;
export const { addTvNewsSlice } = TvNewsSlice.actions; // Corrected here
