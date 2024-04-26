import { createSlice } from "@reduxjs/toolkit";

export const CelebrityNewsSlice = createSlice({
  name: "celebritynewsslice",
  initialState: {
    CelebrityNewsSlice: [],
  },
  reducers: {
    addCelebrityNewsSlice: (state, actions) => {
      state.CelebrityNewsSlice = actions.payload;
      // console.log("Payload received of date:", actions.payload);
    },
  },
});
export default CelebrityNewsSlice.reducer;
export const { addCelebrityNewsSlice } = CelebrityNewsSlice.actions; // Corrected here
